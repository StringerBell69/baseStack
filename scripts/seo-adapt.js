#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('🚀 SEO Adaptation Script for BaseStack\n');
  console.log('This script will help you quickly adapt SEO settings for your application.\n');

  // Get user inputs
  const appName = await question('Enter your application name (default: BaseStack): ') || 'BaseStack';
  const appDescription = await question('Enter your application description: ') || 'A comprehensive base stack with authentication, payments, and more';
  const appUrl = await question('Enter your application URL (e.g., https://example.com): ') || 'http://localhost:3000';
  const twitterHandle = await question('Enter your Twitter handle (without @, optional): ') || '';
  const ogImageUrl = await question('Enter Open Graph image URL (optional): ') || '';

  console.log('\n📝 Updating files...\n');

  // Update app/layout.tsx metadata
  const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
  if (fs.existsSync(layoutPath)) {
    let layoutContent = fs.readFileSync(layoutPath, 'utf8');

    const newMetadata = `export const metadata: Metadata = {
  title: "${appName}",
  description: "${appDescription}",
  metadataBase: new URL("${appUrl}"),
  keywords: ["authentication", "saas", "stripe", "nextjs", "supabase"],
  authors: [{ name: "${appName}" }],
  creator: "${appName}",
  publisher: "${appName}",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "${appUrl}",
    title: "${appName}",
    description: "${appDescription}",
    siteName: "${appName}",${ogImageUrl ? `
    images: [
      {
        url: "${ogImageUrl}",
        width: 1200,
        height: 630,
        alt: "${appName}",
      },
    ],` : ''}
  },
  twitter: {
    card: "summary_large_image",
    title: "${appName}",
    description: "${appDescription}",${twitterHandle ? `
    creator: "@${twitterHandle}",` : ''}${ogImageUrl ? `
    images: ["${ogImageUrl}"],` : ''}
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}`;

    layoutContent = layoutContent.replace(
      /export const metadata: Metadata = \{[^}]*\}/s,
      newMetadata
    );

    fs.writeFileSync(layoutPath, layoutContent);
    console.log('✅ Updated app/layout.tsx');
  }

  // Update .env.example
  const envExamplePath = path.join(process.cwd(), '.env.example');
  if (fs.existsSync(envExamplePath)) {
    let envContent = fs.readFileSync(envExamplePath, 'utf8');

    envContent = envContent.replace(
      /NEXT_PUBLIC_APP_URL=.*/,
      `NEXT_PUBLIC_APP_URL=${appUrl}`
    );
    envContent = envContent.replace(
      /NEXT_PUBLIC_APP_NAME=.*/,
      `NEXT_PUBLIC_APP_NAME=${appName}`
    );

    fs.writeFileSync(envExamplePath, envContent);
    console.log('✅ Updated .env.example');
  }

  // Create/update robots.txt
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  const robotsDir = path.dirname(robotsPath);

  if (!fs.existsSync(robotsDir)) {
    fs.mkdirSync(robotsDir, { recursive: true });
  }

  const robotsContent = `# *
User-agent: *
Allow: /

# Disallow specific paths
Disallow: /api/
Disallow: /dashboard/

# Sitemap
Sitemap: ${appUrl}/sitemap.xml
`;

  fs.writeFileSync(robotsPath, robotsContent);
  console.log('✅ Created/updated public/robots.txt');

  // Create sitemap template
  const sitemapPath = path.join(process.cwd(), 'app', 'sitemap.ts');
  const sitemapContent = `import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: '${appUrl}',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: '${appUrl}/auth/login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: '${appUrl}/auth/signup',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
`;

  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log('✅ Created app/sitemap.ts');

  // Create manifest.json
  const manifestPath = path.join(process.cwd(), 'app', 'manifest.ts');
  const manifestContent = `import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '${appName}',
    short_name: '${appName}',
    description: '${appDescription}',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
`;

  fs.writeFileSync(manifestPath, manifestContent);
  console.log('✅ Created app/manifest.ts');

  console.log('\n✨ SEO adaptation complete!\n');
  console.log('📋 Next steps:');
  console.log('1. Update your .env file with the new values');
  console.log('2. Add your favicon and icons to the public directory');
  console.log('3. Customize the sitemap with your actual pages');
  console.log('4. Add structured data (JSON-LD) for better SEO');
  console.log('5. Set up Google Search Console and verify your site\n');

  rl.close();
}

main().catch(console.error);
