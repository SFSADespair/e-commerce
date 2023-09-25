import GlobalState from '@/context'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Oompie-Store',
  description: 'Discover trendy and affordable clothing at Oompie-Store. Shop a wide range of stylish apparel for men, women, and kids. Find your fashion favorites today!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main className='flex min-h-screen flex-col mt-[75px]'>{children}</main>
          <Footer />
        </GlobalState>
      </body>
    </html>
  )
}
