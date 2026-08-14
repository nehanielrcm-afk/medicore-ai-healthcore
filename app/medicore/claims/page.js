'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSupabaseClient } from '../../lib/supabaseClient'

export default function ClaimsDashboard() {
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from('claims')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setClaims(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchClaims()
  }, [])

  if (loading) return <div style={{ padding: 40 }}>Loading claims...</div>

  return (
    <div style={{ padding: 40, maxWidth: 1000, margin: '0 auto' }}>
      <h1>All Claims Dashboard</h1>
      <Link
        href="/medicore/claims/new"
        style={{
          padding: '8px 12px',
          background: '#0070f3',
          color: 'white',
          borderRadius: 6,
          textDecoration: 'none',
        }}
      >
        + New Claim
      </Link>

      {error && (
        <p style={{ color: '#c00', marginTop: 16 }}>
          Couldn't load claims: {error}
        </p>
      )}

      <table style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: 10 }}>Patient</th>
            <th style={{ padding: 10 }}>Diagnosis</th>
            <th style={{ padding: 10 }}>Insurance</th>
            <th style={{ padding: 10 }}>AI Status</th>
            <th style={{ padding: 10 }}>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 10 }}>{c.patient_name}</td>
              <td style={{ padding: 10 }}>{c.diagnosis}</td>
              <td style={{ padding: 10 }}>{c.insurance_provider}</td>
              <td style={{ padding: 10 }}>{c.ai_status}</td>
              <td style={{ padding: 10 }}>{c.ai_confidence}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      {claims.length === 0 && !error && <p>No claims yet. Go create one!</p>}
    </div>
  )
}
