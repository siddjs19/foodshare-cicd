import './globals.css'

export const metadata = {
  title: 'FoodShare — Reduce Waste. Feed Lives.',
  description: 'A platform connecting food donors with NGOs to eliminate food waste and hunger.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
}
