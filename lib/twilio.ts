import twilio from "twilio"

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function sendSMS(to: string, message: string) {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to,
    })
    return { success: true, data: result }
  } catch (error) {
    console.error("Error sending SMS:", error)
    return { success: false, error }
  }
}

export async function sendVerificationCode(phoneNumber: string, code: string) {
  return sendSMS(
    phoneNumber,
    `Your verification code is: ${code}. This code will expire in 10 minutes.`
  )
}

export async function sendOTP(phoneNumber: string, otp: string) {
  return sendSMS(
    phoneNumber,
    `Your one-time password is: ${otp}. Do not share this code with anyone.`
  )
}

export function generateOTP(length: number = 6): string {
  const digits = "0123456789"
  let otp = ""
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)]
  }
  return otp
}
