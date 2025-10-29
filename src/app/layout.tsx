
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <header>
        <h1>Ticket Checker</h1>
      </header>
      <body>{children}</body>
    </html>
  )
}