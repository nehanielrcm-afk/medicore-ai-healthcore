-- Run this in the Supabase SQL editor (or via `supabase db push`) to set up
-- the table the Medicore Healthcore claims dashboard expects.

create table if not exists public.claims (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  diagnosis text not null,
  insurance_provider text not null,
  ai_status text default 'Pending Review',
  ai_confidence numeric,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security. Adjust the policy below once you add auth;
-- this permissive policy is only meant to get local development working.
alter table public.claims enable row level security;

create policy "Allow all access to claims (dev only)"
  on public.claims
  for all
  using (true)
  with check (true);
