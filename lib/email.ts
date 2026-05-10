import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY || '',
  },
});

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@guidesoft-training.com';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'GUIDESOFT TRAINING';

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject,
      html,
      text,
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}

// Email templates
export const emailTemplates = {
  welcome: (name: string, verificationUrl: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #6366f1; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to GUIDESOFT TRAINING!</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>Thank you for joining GUIDESOFT TRAINING - your AI-powered learning platform.</p>
          <p>Please verify your email address to get started:</p>
          <a href="${verificationUrl}" class="button">Verify Email Address</a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p>${verificationUrl}</p>
          <p>Best regards,<br>The GUIDESOFT TRAINING Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2026 GUIDESOFT TRAINING. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  passwordReset: (name: string, resetUrl: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #6366f1; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .warning { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <a href="${resetUrl}" class="button">Reset Password</a>
          <div class="warning">
            <p><strong>Important:</strong> This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
          </div>
          <p>Best regards,<br>The GUIDESOFT TRAINING Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2026 GUIDESOFT TRAINING. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  paymentConfirmation: (name: string, amount: number, tier: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .receipt { background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Payment Confirmed! 🎉</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>Your subscription has been successfully activated.</p>
          <div class="receipt">
            <p><strong>Plan:</strong> ${tier}</p>
            <p><strong>Amount:</strong> $${(amount / 100).toFixed(2)}</p>
            <p><strong>Status:</strong> Active</p>
          </div>
          <p>You now have full access to all features in your plan. Start learning today!</p>
          <p>Best regards,<br>The GUIDESOFT TRAINING Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2026 GUIDESOFT TRAINING. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  certificate: (name: string, courseName: string, certificateUrl: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #f59e0b; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Congratulations! 🎓</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>You've successfully completed <strong>${courseName}</strong>!</p>
          <p>Your certificate is ready. Download it now:</p>
          <a href="${certificateUrl}" class="button">Download Certificate</a>
          <p>Share your achievement on LinkedIn and showcase your new skills!</p>
          <p>Best regards,<br>The GUIDESOFT TRAINING Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2026 GUIDESOFT TRAINING. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,
};

// Helper functions for specific email types
export async function sendWelcomeEmail(email: string, name: string, verificationUrl: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to GUIDESOFT TRAINING! Verify Your Email',
    html: emailTemplates.welcome(name, verificationUrl),
  });
}

export async function sendPasswordResetEmail(email: string, name: string, resetUrl: string) {
  return sendEmail({
    to: email,
    subject: 'Reset Your Password - GUIDESOFT TRAINING',
    html: emailTemplates.passwordReset(name, resetUrl),
  });
}

export async function sendPaymentConfirmationEmail(email: string, name: string, amount: number, tier: string) {
  return sendEmail({
    to: email,
    subject: 'Payment Confirmed - GUIDESOFT TRAINING',
    html: emailTemplates.paymentConfirmation(name, amount, tier),
  });
}

export async function sendCertificateEmail(email: string, name: string, courseName: string, certificateUrl: string) {
  return sendEmail({
    to: email,
    subject: `Certificate Earned: ${courseName}`,
    html: emailTemplates.certificate(name, courseName, certificateUrl),
  });
}
