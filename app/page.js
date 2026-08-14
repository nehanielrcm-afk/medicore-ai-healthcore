import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ padding: 40, maxWidth: 700, margin: '80px auto', textAlign: 'center' }}>
      <h1>Medicore Healthcore</h1>
      <p style={{ color: '#555' }}>Claims management for your practice.</p>
      <Link
        href="/medicore/claims"
        style={{
          display: 'inline-block',
          marginTop: 20,
          padding: '10px 18px',
          background: '#0070f3',
          color: 'white',
          borderRadius: 6,
          textDecoration: 'none',
        }}
      >
        Go to Claims Dashboard
      </Link>
    </div>
  )
}
