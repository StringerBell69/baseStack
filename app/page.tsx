import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold">BaseStack</h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl">
            A comprehensive base stack with Supabase Auth, Stripe, Resend, R2, Twilio, and more.
          </p>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button size="lg">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="lg" variant="outline">Sign Up</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary">Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
