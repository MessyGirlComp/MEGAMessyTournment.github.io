-- =========================================================
-- MEGA MESSY TOURNAMENT: SUPABASE VOTING SETUP
-- Paste this whole file into Supabase > SQL Editor > Run.
-- Safe to run more than once.
-- =========================================================

-- 1. The votes table: one row per vote ------------------------------

create table if not exists public.votes (
    id            bigint generated always as identity primary key,
    group_number  int  not null check (group_number between 1 and 42),
    girl_id       text not null check (girl_id ~ '^[0-9]{3}$'),
    voter_id      uuid not null,
    created_at    timestamptz not null default now(),

    -- one vote per voter per qualifying group
    unique (group_number, voter_id)
);

-- 2. Row Level Security ---------------------------------------------
-- The website uses the public "anon" key, so RLS decides what
-- visitors can do. Visitors may ADD a vote. There is deliberately
-- no SELECT / UPDATE / DELETE policy, so nobody can read, change or
-- remove votes from the browser.

alter table public.votes enable row level security;

drop policy if exists "Anyone can cast a vote" on public.votes;

create policy "Anyone can cast a vote"
    on public.votes
    for insert
    to anon, authenticated
    with check (true);

-- 3. Results: counts only, never who voted ---------------------------

create or replace function public.get_group_results(p_group int)
returns table (girl_id text, vote_count bigint)
language sql
stable
security definer
set search_path = public
as $$
    select v.girl_id, count(*) as vote_count
    from public.votes v
    where v.group_number = p_group
    group by v.girl_id;
$$;

revoke all on function public.get_group_results(int) from public;
grant execute on function public.get_group_results(int) to anon, authenticated;

-- =========================================================
-- Handy queries for YOU (run in the SQL Editor, not on the site)
--
--   Totals per girl in a group:
--     select girl_id, count(*) from votes
--     where group_number = 7 group by girl_id order by count(*) desc;
--
--   Start a group's voting over:
--     delete from votes where group_number = 7;
-- =========================================================
