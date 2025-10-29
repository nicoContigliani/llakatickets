// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({
//   subsets: ["latin"],
//   display: 'swap',
// });

// export const metadata: Metadata = {
//   title: "TicketElegance",
//   description: "Plataforma de tickets premium",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="es" suppressHydrationWarning>
//       <body className={inter.className} suppressHydrationWarning>
//         {children}
//       </body>
//     </html>
//   );
// }



// src/app/layout.tsx
'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <ClerkProvider>
      <html lang="es" suppressHydrationWarning>
        <head>
          <title>MiApp Elegante</title>
          <meta name="description" content="Aplicación elegante con autenticación Clerk" />
        </head>
        <body 
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
          suppressHydrationWarning
        >
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}