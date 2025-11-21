# BaseStack

A comprehensive, production-ready base stack for building modern web and mobile applications with Next.js 14. Fully equipped with authentication, payments, internationalization, testing, and more.

## Features

### Core Stack
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library (unmodified components)

### State Management & Data Fetching
- **TanStack Query (React Query)** - Powerful data fetching and caching
  - Smart caching strategies
  - Automatic refetching
  - React Query DevTools
  - Optimistic updates
- **Zustand** - Lightweight state management
  - User state management
  - UI state (sidebar, theme, mobile)
  - Persistent storage with localStorage

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- Fully integrated with shadcn/ui form components

### Internationalization (i18n)
- **next-intl** - Next.js internationalization
- **3 languages supported**: English, French, Spanish
- Easy locale switching
- Translation files in JSON format
- Type-safe translations

### Testing
- **Playwright** - End-to-end testing
  - Desktop testing (Chrome, Firefox, Safari)
  - Mobile testing (iOS, Android)
  - Visual regression testing
  - CI/CD ready
- **Storybook** - Component development and testing
  - Interactive component documentation
  - Visual testing
  - Accessibility checks

### Code Quality
- **Prettier** - Code formatting
  - Tailwind CSS class sorting
  - Auto-format on save
  - Pre-configured rules
- **ESLint** - Code linting with Next.js and Prettier configs

### Authentication & User Management
- **Supabase Auth** - Complete authentication solution
  - Email/password authentication
  - OAuth providers (Google, etc.)
  - Email verification
  - Password reset
  - Session management with middleware

### UI Components (shadcn/ui)
- ✅ Login form (login-05)
- ✅ Signup form (signup-05)
- ✅ OTP verification (otp-05)
- ✅ Calendar component (calendar-01)
- ✅ Dashboard layout (based on shadcn dashboard example)
- ✅ Mobile navigation with Sheet component
- All components are used as-is from shadcn/ui without modifications

### Mobile Support
- **Fully responsive design** - Works on all devices
- **Mobile-first approach** - Optimized for touch interfaces
- **Mobile detection utilities** - Device and platform detection
- **Responsive hooks** - `useMediaQuery`, `useMobile`, `useIsMobile`
- **Mobile navigation** - Slide-out drawer for mobile devices
- **Touch-friendly UI** - All components optimized for touch
- **PWA ready** - Manifest and service worker support

### Integrations

#### Resend - Email Service
- Welcome emails
- Password reset emails
- Verification emails
- Custom email templates
- API endpoint: `/api/send-email`

#### Cloudflare R2 - File Storage
- File uploads with presigned URLs
- Secure file downloads
- CDN-ready public URLs
- Image and document storage
- API endpoint: `/api/upload`

#### Twilio - SMS Service
- OTP verification
- SMS notifications
- Phone number verification
- Custom SMS templates

#### Stripe - Payments
- Customer management
- One-time payments
- Subscription management
- **Stripe Connect** support for marketplaces
- Webhook handling
- Secure payment processing

### Dashboard
- User profile management
- File management interface
- Calendar integration
- Billing management
- Settings page
- Responsive navigation
- Mobile-friendly sidebar

### SEO Tools
- Quick SEO adaptation script (`npm run seo:adapt`)
- Automatic sitemap generation
- robots.txt configuration
- Open Graph meta tags
- Twitter Card support
- PWA manifest

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- Supabase account
- Resend account
- Cloudflare R2 account
- Twilio account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd baseStack
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your API keys and credentials

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality
```bash
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Testing
```bash
npm run test         # Run Playwright tests
npm run test:ui      # Run tests with UI mode
npm run test:headed  # Run tests in headed mode
```

### Storybook
```bash
npm run storybook         # Start Storybook dev server
npm run build-storybook   # Build Storybook for production
```

### SEO
```bash
npm run seo:adapt    # Run SEO adaptation script
```

## Project Structure

```
baseStack/
├── app/
│   ├── api/                    # API routes
│   │   ├── upload/            # File upload endpoint
│   │   ├── send-email/        # Email sending endpoint
│   │   ├── send-sms/          # SMS sending endpoint
│   │   └── webhooks/          # Webhook handlers
│   ├── auth/                   # Authentication pages
│   │   ├── login/             # Login page (login-05)
│   │   ├── signup/            # Signup page (signup-05)
│   │   ├── verify-otp/        # OTP verification (otp-05)
│   │   └── callback/          # OAuth callback
│   ├── dashboard/              # Dashboard pages
│   │   ├── layout.tsx         # Dashboard layout
│   │   └── page.tsx           # Dashboard home
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── dashboard/             # Dashboard components
│   ├── mobile-nav.tsx         # Mobile navigation
│   ├── locale-switcher.tsx    # Language switcher
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-media-query.ts # Responsive hooks
│   │   └── use-toast.ts       # Toast notifications
│   ├── providers/             # React providers
│   │   └── query-provider.tsx # TanStack Query provider
│   ├── queries/               # TanStack Query queries
│   │   └── user-queries.ts    # User-related queries
│   ├── stores/                # Zustand stores
│   │   ├── user-store.ts      # User state
│   │   └── ui-store.ts        # UI state
│   ├── supabase/              # Supabase utilities
│   ├── utils/                 # Utility functions
│   │   └── mobile.ts          # Mobile detection
│   ├── resend.ts              # Resend email utilities
│   ├── r2.ts                  # Cloudflare R2 utilities
│   ├── twilio.ts              # Twilio SMS utilities
│   ├── stripe.ts              # Stripe payment utilities
│   └── utils.ts               # General utilities
├── i18n/
│   ├── messages/              # Translation files
│   │   ├── en.json           # English
│   │   ├── fr.json           # French
│   │   └── es.json           # Spanish
│   ├── config.ts             # i18n configuration
│   └── request.ts            # Next-intl request config
├── tests/                     # Playwright tests
├── .storybook/               # Storybook configuration
├── scripts/
│   └── seo-adapt.js          # SEO adaptation script
└── package.json
```

## Usage Examples

### TanStack Query

```typescript
import { useCurrentUser, useUpdateProfile } from '@/lib/queries/user-queries'

function ProfileComponent() {
  const { data: user, isLoading } = useCurrentUser()
  const updateProfile = useUpdateProfile()

  const handleUpdate = () => {
    updateProfile.mutate({ first_name: "John" })
  }

  return <div>{user?.email}</div>
}
```

### Zustand Store

```typescript
import { useUserStore } from '@/lib/stores/user-store'
import { useUIStore } from '@/lib/stores/ui-store'

function Component() {
  const { user, setUser } = useUserStore()
  const { sidebarOpen, toggleSidebar } = useUIStore()

  return <div>User: {user?.email}</div>
}
```

### Internationalization

```typescript
import { useTranslations } from 'next-intl'

function Component() {
  const t = useTranslations('common')

  return <h1>{t('welcome')}</h1>
}
```

### Mobile Detection

```typescript
import { useMobile } from '@/hooks/use-mobile'
import { useIsMobile } from '@/lib/hooks/use-media-query'

function ResponsiveComponent() {
  const { isMobile, isTouch } = useMobile()
  const isSmallScreen = useIsMobile()

  return isMobile ? <MobileView /> : <DesktopView />
}
```

### Form with Validation

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  })

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>
}
```

## Internationalization

The app supports 3 languages out of the box:

- **English (en)** - Default
- **French (fr)**
- **Spanish (es)**

### Adding a New Language

1. Create a new translation file: `i18n/messages/de.json`
2. Add the locale to `i18n/config.ts`:
```typescript
export const locales = ["en", "fr", "es", "de"] as const
```
3. Add the locale name:
```typescript
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
}
```

## Testing

### Unit & Integration Tests

```bash
# Run all tests
npm run test

# Run tests in UI mode
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed
```

### Mobile Testing

Playwright is configured to test on multiple devices:
- Desktop (Chrome, Firefox, Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

### Component Testing with Storybook

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## Mobile Optimization

### Responsive Design
- All components are mobile-first and fully responsive
- Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

### Mobile Navigation
- Slide-out drawer navigation for mobile devices
- Touch-friendly tap targets (minimum 44x44px)
- Swipe gestures supported

### Performance
- Optimized images with Next.js Image component
- Lazy loading for off-screen components
- Code splitting for faster initial loads
- PWA support for offline functionality

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

- Netlify
- Railway
- Render
- AWS Amplify
- Self-hosted with Docker

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
NEXT_PUBLIC_R2_PUBLIC_URL=

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Format code with Prettier
6. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
