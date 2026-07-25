-- KaarYab Afghanistan — Auth & roles (Phase 1 & 2)
-- Run this once in the Supabase SQL Editor, after supabase/schema.sql.

-- Supabase's built-in `auth.users` table is managed by Supabase itself and
-- can't have custom columns added directly. The standard pattern is a
-- separate `profiles` table, one row per user, linked by the same id.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  is_admin boolean not null default false
);

alter table profiles enable row level security;

-- Each user can read (and update) only their own profile row.
create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Whenever a new user signs up in Supabase Auth, automatically create a
-- matching row in `profiles` (with is_admin defaulting to false). This runs
-- as a trigger directly in Postgres, so it fires even for users created
-- from the Supabase dashboard, not just ones created via app code.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- After running this file and signing up for an account at /login,
-- run this query (with your own email) to make that account an admin:
--
--   update profiles set is_admin = true where email = 'your-email@example.com';
-- ============================================================
