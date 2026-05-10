import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleWebhookEvent } from '@/lib/stripe';
import { sendPaymentConfirmationEmail } from '@/lib/email';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    // Verify webhook signature
    const event = handleWebhookEvent(payload, signature);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const userId = session.metadata.userId;
        const tier = session.metadata.tier;

        // Create or update subscription
        await prisma.subscription.upsert({
          where: {
            id: session.subscription,
          },
          update: {
            status: 'active',
            currentPeriodStart: new Date(session.created * 1000),
            currentPeriodEnd: new Date((session.created + 2592000) * 1000), // 30 days
          },
          create: {
            id: session.subscription,
            userId,
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            tier,
            status: 'active',
            currentPeriodStart: new Date(session.created * 1000),
            currentPeriodEnd: new Date((session.created + 2592000) * 1000),
          },
        });

        // Get user info for email
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (user) {
          // Send payment confirmation email
          const tierConfig = SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS];
          await sendPaymentConfirmationEmail(
            user.email,
            user.fullName,
            tierConfig.price,
            tierConfig.name
          );
        }

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as any;
        
        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
        });

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        
        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: 'canceled',
            canceledAt: new Date(),
          },
        });

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as any;
        
        // Record payment
        await prisma.payment.create({
          data: {
            userId: '', // Will be linked via subscription
            amount: invoice.amount_paid,
            currency: invoice.currency,
            stripePaymentIntentId: invoice.payment_intent,
            stripeInvoiceId: invoice.id,
            status: 'succeeded',
            description: `Invoice ${invoice.number}`,
          },
        });

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any;
        
        // Update subscription status
        await prisma.subscription.updateMany({
          where: { stripeCustomerId: invoice.customer },
          data: {
            status: 'past_due',
          },
        });

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
