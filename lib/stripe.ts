import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
})

// Customer management
export async function createCustomer(email: string, name?: string) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    })
    return { success: true, customer }
  } catch (error) {
    console.error("Error creating Stripe customer:", error)
    return { success: false, error }
  }
}

export async function getCustomer(customerId: string) {
  try {
    const customer = await stripe.customers.retrieve(customerId)
    return { success: true, customer }
  } catch (error) {
    console.error("Error retrieving Stripe customer:", error)
    return { success: false, error }
  }
}

// Payment Intents
export async function createPaymentIntent(
  amount: number,
  currency: string = "usd",
  customerId?: string
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    })
    return { success: true, paymentIntent }
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return { success: false, error }
  }
}

// Subscriptions
export async function createSubscription(
  customerId: string,
  priceId: string
) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    })
    return { success: true, subscription }
  } catch (error) {
    console.error("Error creating subscription:", error)
    return { success: false, error }
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    return { success: true, subscription }
  } catch (error) {
    console.error("Error canceling subscription:", error)
    return { success: false, error }
  }
}

// Checkout Sessions
export async function createCheckoutSession(
  priceId: string,
  customerId?: string,
  successUrl?: string,
  cancelUrl?: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
    })
    return { success: true, session }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return { success: false, error }
  }
}

// Stripe Connect (for marketplace/platform features)
export async function createConnectAccount(email: string, country: string = "US") {
  try {
    const account = await stripe.accounts.create({
      type: "express",
      email,
      country,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    })
    return { success: true, account }
  } catch (error) {
    console.error("Error creating Connect account:", error)
    return { success: false, error }
  }
}

export async function createAccountLink(accountId: string) {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/connect/refresh`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/connect/return`,
      type: "account_onboarding",
    })
    return { success: true, accountLink }
  } catch (error) {
    console.error("Error creating account link:", error)
    return { success: false, error }
  }
}

export async function createTransfer(
  amount: number,
  destinationAccountId: string,
  currency: string = "usd"
) {
  try {
    const transfer = await stripe.transfers.create({
      amount: Math.round(amount * 100),
      currency,
      destination: destinationAccountId,
    })
    return { success: true, transfer }
  } catch (error) {
    console.error("Error creating transfer:", error)
    return { success: false, error }
  }
}

// Webhook verification
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
) {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    return { success: true, event }
  } catch (error) {
    console.error("Error verifying webhook signature:", error)
    return { success: false, error }
  }
}
