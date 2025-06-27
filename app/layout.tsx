import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Windows 95 Portfolio – Ranjan Sharma',
  description:
    'Step into a nostalgic journey with Ranjan Sharma’s Windows 95-inspired developer portfolio. Experience retro design with modern web magic.',
  generator: '95.ranjansharma.info.np',
  keywords: [
    'Windows 95 Portfolio',
    'Ranjan Sharma',
    'Retro Web Design',
    'Developer Portfolio',
    'Web Developer',
    'React Portfolio',
    'Next.js Portfolio'
  ],
  authors: [
    { name: 'Ranjan Sharma', url: 'https://95.ranjansharma.info.np' }
  ],
  creator: 'Ranjan Sharma',
  publisher: 'Ranjan Sharma',
  metadataBase: new URL('https://95.ranjansharma.info.np'),
  openGraph: {
    title: 'Windows 95 Portfolio – Ranjan Sharma',
    description:
      'Explore a retro-themed portfolio with the charm of Windows 95 and the power of modern frontend development.',
    url: 'https://95.ranjansharma.info.np',
    siteName: 'Windows 95 Portfolio',
    images: [
      {
        url: 'https://95.ranjansharma.info.np/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Windows 95 Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Windows 95 Portfolio – Ranjan Sharma',
    description:
      'A unique, nostalgic portfolio experience styled like Windows 95.',
    creator: '@ranjan95dev',
    images: ['https://95.ranjansharma.info.np/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
