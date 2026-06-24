create table if not exists public.user_snapshots (
  user_id uuid not null references auth.users(id) on delete cascade,
  slot_key text not null default 'primary',
  payload_version integer not null default 1,
  payload jsonb not null,
  client_updated_at timestamptz,
  server_updated_at timestamptz not null default now(),
  revision bigint not null default 1,
  primary key (user_id, slot_key)
);

alter table public.user_snapshots enable row level security;

drop policy if exists "select own snapshots" on public.user_snapshots;
create policy "select own snapshots"
on public.user_snapshots for select
to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

drop policy if exists "insert own snapshots" on public.user_snapshots;
create policy "insert own snapshots"
on public.user_snapshots for insert
to authenticated
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

drop policy if exists "update own snapshots" on public.user_snapshots;
create policy "update own snapshots"
on public.user_snapshots for update
to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

drop policy if exists "delete own snapshots" on public.user_snapshots;
create policy "delete own snapshots"
on public.user_snapshots for delete
to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create or replace function public.touch_user_snapshot()
returns trigger
language plpgsql
as $$
begin
  new.server_updated_at = now();
  new.revision = old.revision + 1;
  return new;
end;
$$;

drop trigger if exists user_snapshots_touch on public.user_snapshots;
create trigger user_snapshots_touch
before update on public.user_snapshots
for each row execute function public.touch_user_snapshot();
