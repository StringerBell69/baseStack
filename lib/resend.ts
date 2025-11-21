import { Resend } from "resend"

export const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[]
  subject: string
  html: string
}) {
  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to,
      subject,
      html,
    })
    return { success: true, data }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(email: string, name?: string) {
  return sendEmail({
    to: email,
    subject: "Welcome to BaseStack!",
    html: `
      <h1>Welcome ${name || ""}!</h1>
      <p>Thank you for signing up for BaseStack.</p>
      <p>We're excited to have you on board.</p>
    `,
  })
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  return sendEmail({
    to: email,
    subject: "Reset your password",
    html: `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  })
}

export async function sendVerificationEmail(email: string, verificationLink: string) {
  return sendEmail({
    to: email,
    subject: "Verify your email",
    html: `
      <h1>Email Verification</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
  })
}
