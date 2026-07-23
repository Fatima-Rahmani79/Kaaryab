-- KaarYab Afghanistan — Supabase schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query)
-- before running the seed migration script.

create table if not exists opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text not null,
  category text not null,
  location text not null,
  type text not null,
  deadline date not null,
  description text not null,
  requirements text[] not null default '{}',
  apply_link text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  featured boolean default false
);

-- Row Level Security must be explicitly enabled, then explicitly opened up.
-- This project has no authentication yet, so every visitor is treated the
-- same way the old file-based mock API treated them: free to read, add,
-- edit, and delete listings. Tighten these once auth is added (see the
-- "Future Improvements" section of the README).
alter table opportunities enable row level security;

create policy "Public read access"
  on opportunities for select
  using (true);

create policy "Public insert access"
  on opportunities for insert
  with check (true);

create policy "Public update access"
  on opportunities for update
  using (true);

create policy "Public delete access"
  on opportunities for delete
  using (true);
