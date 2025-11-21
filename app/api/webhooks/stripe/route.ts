import { NextRequest, NextResponse } from "next/server"
import { constructWebhookEvent } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    const result = constructWebhookEvent(body, signature)

    if (!result.success) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = result.event!

    // Handle different event types
    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("PaymentIntent succeeded:", event.data.object)
        // Handle successful payment
        break

      case "payment_intent.payment_failed":
        console.log("PaymentIntent failed:", event.data.object)
        // Handle failed payment
        break

      case "customer.subscription.created":
        console.log("Subscription created:", event.data.object)
        // Handle new subscription
        break

      case "customer.subscription.updated":
        console.log("Subscription updated:", event.data.object)
        // Handle subscription update
        break

      case "customer.subscription.deleted":
        console.log("Subscription canceled:", event.data.object)
        // Handle subscription cancellation
        break

      case "account.updated":
        console.log("Connect account updated:", event.data.object)
        // Handle Connect account update
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
