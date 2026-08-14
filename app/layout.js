export const metadata = {
  title: 'Medicore Healthcore',
  description: 'Claims dashboard for Medicore Healthcore',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f7f8fa' }}>
        {children}
      </body>
    </html>
  )
}