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
