-- KaarYab Afghanistan — RLS hardening (Phase 6)
-- Run this once in the Supabase SQL Editor, AFTER schema.sql, auth.sql, and
-- status_column.sql.

-- ============================================================
-- 1. Helper function: is the CURRENTLY AUTHENTICATED user an admin?
-- ============================================================
-- SECURITY DEFINER means this function runs with the permissions of
-- whoever created it (not the caller), so it can read `profiles` even
-- though a normal user's own SELECT policy only lets them see their own row.
-- This is what lets RLS policies below check admin status without opening
-- up the whole `profiles` table for everyone to read.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (select is_admin from profiles where id = auth.uid()),
    false
  );
$$;

-- ============================================================
-- 2. Fix a real privilege-escalation gap in profiles
-- ============================================================
-- The original "Users can update own profile" policy (from auth.sql) has
-- no restriction on WHICH columns can be changed. In practice this means
-- any signed-in user could run, straight from their browser's dev console:
--   supabase.from('profiles').update({ is_admin: true }).eq('id', their_own_id)
-- and make themselves an admin. Nothing in the app UI does this today, but
-- the database was never actually stopping it. Since no feature currently
-- needs users to edit their own profile, the safest fix is to remove this
-- policy entirely rather than try to carve out an exception per column.
drop policy if exists "Users can update own profile" on profiles;

-- ============================================================
-- 3. Replace the fully-public opportunities policies with real checks
-- ============================================================
drop policy if exists "Public read access" on opportunities;
drop policy if exists "Public insert access" on opportunities;
drop policy if exists "Public update access" on opportunities;
drop policy if exists "Public delete access" on opportunities;

-- Anyone can read approved opportunities (the public site); admins can also
-- read pending ones (needed for the Dashboard's approval queue).
create policy "Read approved, or all if admin"
  on opportunities for select
  using (status = 'approved' or public.is_admin());

-- Anyone (including anonymous visitors) can submit a new opportunity, but
-- the database itself now refuses to accept anything except 'pending' —
-- so even a direct API call that tries to insert status: 'approved' is
-- rejected at the database level, not just by application code.
create policy "Anyone can submit as pending"
  on opportunities for insert
  with check (status = 'pending');

-- Only admins can edit or delete opportunities.
create policy "Only admins can update"
  on opportunities for update
  using (public.is_admin());

create policy "Only admins can delete"
  on opportunities for delete
  using (public.is_admin());
