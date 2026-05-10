import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export default stripe;

// Subscription tiers configuration
export const SUBSCRIPTION_TIERS = {
  starter: {
    name: 'Starter',
    price: 4900, // $49 in cents
    priceId: process.env.STRIPE_PRICE_STARTER,
    features: [
      'Access to Foundation & Intermediate courses',
      '1 personalized learning path',
      'Basic AI course recommendations',
      'Community forum access',
      'Email support (48h response)',
      'Certificate of completion',
    ],
  },
  professional: {
    name: 'Professional',
    price: 9900, // $99 in cents
    priceId: process.env.STRIPE_PRICE_PROFESSIONAL,
    features: [
      'Access to ALL courses (Foundation to Advanced)',
      'Unlimited personalized learning paths',
      'Advanced AI curriculum generator',
      'Priority support (24h response)',
      '1-on-1 monthly mentorship call (30 min)',
      'Project reviews by industry experts',
      'Resume & LinkedIn optimization',
      'Job placement assistance',
    ],
    popular: true,
  },
  enterprise: {
    name: 'Enterprise',
    price: 29900, // $299 in cents
    priceId: process.env.STRIPE_PRICE_ENTERPRISE,
    features: [
      'Everything in Professional',
      'Expert & Master level courses',
      'Weekly 1-on-1 mentorship calls (60 min)',
      'Custom enterprise training programs',
      'Dedicated account manager',
      'Team collaboration tools (up to 10 users)',
      'White-label certificates',
      'API access for integrations',
      'Quarterly strategy sessions',
    ],
  },
};

// Create checkout session
export async function createCheckoutSession({
  userId,
  email,
  tier,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  email: string;
  tier: keyof typeof SUBSCRIPTION_TIERS;
  successUrl: string;
  cancelUrl: string;
}) {
  const tierConfig = SUBSCRIPTION_TIERS[tier];
  
  if (!tierConfig.priceId) {
    throw new Error(`Stripe price ID not configured for tier: ${tier}`);
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: email,
    line_items: [
      {
        price: tierConfig.priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      tier,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: {
        userId,
        tier,
      },
    },
  });

  return session;
}

// Create customer portal session
export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return portalSession.url;
}

// Handle webhook events
export async function handleWebhookEvent(payload: string, signature: string) {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!endpointSecret) {
    throw new Error('Stripe webhook secret not configured');
  }

  const event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);

  return event;
}

// Get subscription details
export async function getSubscription(subscriptionId: string) {
  return await stripe.subscriptions.retrieve(subscriptionId);
}

// Cancel subscription
export async function cancelSubscription(subscriptionId: string) {
  return await stripe.subscriptions.cancel(subscriptionId);
}

// Update subscription tier
export async function updateSubscriptionTier(subscriptionId: string, newPriceId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  return await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: 'create_prorations',
  });
}

// Get invoice history
export async function getInvoiceHistory(customerId: string, limit: number = 10) {
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit,
  });

  return invoices.data;
}
