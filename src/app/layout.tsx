import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MelodyLearn - Fun Music Learning for Kids',
  description: 'An interactive music learning platform for children aged 7-9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold text-primary">
                MelodyLearn 🎵
              </a>
              <div className="space-x-4">
                <a href="/learn" className="text-gray-600 hover:text-primary">Learn</a>
                <a href="/games" className="text-gray-600 hover:text-primary">Games</a>
                <a href="/challenges" className="text-gray-600 hover:text-primary">Challenges</a>
                <a href="/videos" className="text-gray-600 hover:text-primary">Videos</a>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-100 mt-12">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-600">
              © 2024 MelodyLearn. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
} 