'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '../../../../lib/supabaseClient'

const emptyForm = {
  patient_name: '',
  diagnosis: '',
  insurance_provider: '',
  ai_status: 'Pending Review',
  ai_confidence: '',
}

export default function NewClaim() {
  const router = useRouter()
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from('claims').insert([
        {
          patient_name: form.patient_name,
          diagnosis: form.diagnosis,
          insurance_provider: form.insurance_provider,
          ai_status: form.ai_status,
          ai_confidence: form.ai_confidence ? Number(form.ai_confidence) : null,
        },
      ])
      if (error) throw error
      router.push('/medicore/claims')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: '0 auto' }}>
      <h1>New Claim</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14, marginTop: 20 }}>
        <label>
          Patient name
          <input
            required
            value={form.patient_name}
            onChange={handleChange('patient_name')}
            style={inputStyle}
          />
        </label>
        <label>
          Diagnosis
          <input
            required
            value={form.diagnosis}
            onChange={handleChange('diagnosis')}
            style={inputStyle}
          />
        </label>
        <label>
          Insurance provider
          <input
            required
            value={form.insurance_provider}
            onChange={handleChange('insurance_provider')}
            style={inputStyle}
          />
        </label>
        <label>
          AI status
          <select value={form.ai_status} onChange={handleChange('ai_status')} style={inputStyle}>
            <option>Pending Review</option>
            <option>Coded</option>
            <option>Flagged</option>
            <option>Submitted</option>
          </select>
        </label>
        <label>
          AI confidence (%)
          <input
            type="number"
            min="0"
            max="100"
            value={form.ai_confidence}
            onChange={handleChange('ai_confidence')}
            style={inputStyle}
          />
        </label>

        {error && <p style={{ color: '#c00' }}>{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '10px 16px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: submitting ? 'default' : 'pointer',
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? 'Saving...' : 'Save Claim'}
        </button>
      </form>
    </div>
  )
}

const inputStyle = {
  display: 'block',
  width: '100%',
  marginTop: 6,
  padding: '8px 10px',
  border: '1px solid #ccc',
  borderRadius: 6,
  boxSizing: 'border-box',
}
