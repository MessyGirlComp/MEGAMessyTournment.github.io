-- =========================================================
-- MEGA MESSY TOURNAMENT: SUPABASE VOTING SETUP (v2)
-- Paste this whole file into Supabase > SQL Editor > Run.
-- Safe to run more than once, and it upgrades the first
-- version (one vote per group) to this one (two votes).
--
-- Rules:
--   * each voter picks exactly 2 DIFFERENT girls per group
--   * a voter can only vote once per group
--   * the public can NOT read votes or counts
--   * results are only visible to you, in the SQL Editor
-- =========================================================

-- 1. The votes table: one row per girl a voter picked ---------------

create table if not exists public.votes (
    id            bigint generated always as identity primary key,
    group_number  int  not null check (group_number between 1 and 42),
    girl_id       text not null check (girl_id ~ '^[0-9]{3}$'),
    voter_id      uuid not null,
    created_at    timestamptz not null default now()
);

-- Old version allowed one row per voter per group. Remove that rule...
alter table public.votes
    drop constraint if exists votes_group_number_voter_id_key;

-- ...and replace it: a voter can't pick the same girl twice in a group.
do $$
begin
    if not exists (
        select 1 from pg_constraint
        where conname = 'votes_one_per_girl'
          and conrelid = 'public.votes'::regclass
    ) then
        alter table public.votes
            add constraint votes_one_per_girl
            unique (group_number, voter_id, girl_id);
    end if;
end $$;

-- 2. Lock the table down ---------------------------------------------
-- Row Level Security on with NO policies = the public key can't read,
-- add, change or delete anything directly. Votes can only be added
-- through the cast_votes function below.

alter table public.votes enable row level security;

drop policy if exists "Anyone can cast a vote" on public.votes;

-- 3. The only way to vote --------------------------------------------

create or replace function public.cast_votes(
    p_group int,
    p_voter uuid,
    p_girls text[]
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
    picks text[];
begin
    if p_group is null or p_group < 1 or p_group > 42
       or p_voter is null or p_girls is null then
        return 'invalid';
    end if;

    -- exactly 2 picks, and they must be different girls
    select array_agg(distinct g) into picks from unnest(p_girls) as g;

    if coalesce(array_length(p_girls, 1), 0) <> 2
       or coalesce(array_length(picks, 1), 0) <> 2 then
        return 'invalid';
    end if;

    if exists (
        select 1 from public.votes
        where group_number = p_group and voter_id = p_voter
    ) then
        return 'already_voted';
    end if;

    insert into public.votes (group_number, girl_id, voter_id)
    select p_group, g, p_voter from unnest(picks) as g;

    return 'ok';

exception
    when unique_violation then
        return 'already_voted';
    when check_violation then
        return 'invalid';
end;
$$;

revoke all on function public.cast_votes(int, uuid, text[]) from public;
grant execute on function public.cast_votes(int, uuid, text[]) to anon, authenticated;

-- 4. Results are hidden from the public ------------------------------
-- (the old public results function from version 1 is removed)

drop function if exists public.get_group_results(int);

-- =========================================================
-- VIEWING RESULTS (run these yourself in the SQL Editor)
--
-- A) One group, most votes first:
--
--   select girl_id, count(*) as votes
--   from public.votes
--   where group_number = 7
--   group by girl_id
--   order by votes desc, girl_id;
--
-- B) Every group, with each girl's place (1 and 2 qualify, 3 = wildcard):
--
--   select group_number, girl_id, votes, place
--   from (
--       select group_number, girl_id,
--              count(*) as votes,
--              rank() over (
--                  partition by group_number
--                  order by count(*) desc
--              ) as place
--       from public.votes
--       group by group_number, girl_id
--   ) results
--   order by group_number, place, girl_id;
--
-- C) How many people have voted in each group:
--
--   select group_number, count(distinct voter_id) as voters
--   from public.votes
--   group by group_number
--   order by group_number;
--
-- D) Clear one group (voting starts over):
--
--   delete from public.votes where group_number = 7;
--
-- E) Clear everything (e.g. after testing):
--
--   delete from public.votes;
-- =========================================================
