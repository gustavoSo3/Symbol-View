import Link from "next/link";
import './globals.css';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Link href="/">Go Back to List</Link>
      <body>{children}</body>
    </html >
  )
}