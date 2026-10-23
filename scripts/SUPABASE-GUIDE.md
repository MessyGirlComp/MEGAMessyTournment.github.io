# Supabase voting: guide (v2)

## How voting works

- On a group page, each voter picks **2 different girls** (the Vote buttons turn into "Selected"), then presses **Submit my 2 votes**.
- One submission per browser per group. After that the buttons lock and the girls they picked show "Your vote".
- **Votes and counts are hidden from the public.** The site cannot read them at all. Only you can see results, in Supabase.
- The rules are enforced by the database, not just the page: exactly 2 votes, 2 different girls, one submission per voter per group.

## Setup

1. Supabase: **SQL Editor > New query**, paste all of `supabase-setup.sql`, **Run**. Safe to run again. It upgrades the older one-vote version and removes the public results function.
2. `scripts/supabase-config.js`: paste your Project URL and the anon/publishable key.
3. Upload to your site, overwriting old copies:
   - `scripts/`: `supabase-config.js`, `votes.js`, `group.js`, `profile.js`, `girls-data.js`
   - `qualifying/groups/`: `group.html`
4. Hard refresh (Ctrl+Shift+R) and test.

## Viewing results (SQL Editor)

Votes store the girl's ID (like `004`), which matches her ID in `girls-data.js`.

**One group, most votes first** (change 7 to your group):

```sql
select girl_id, count(*) as votes
from public.votes
where group_number = 7
group by girl_id
order by votes desc, girl_id;
```

**Every group at once, with places** (place 1 and 2 qualify, 3 is the wildcard):

```sql
select group_number, girl_id, votes, place
from (
    select group_number, girl_id,
           count(*) as votes,
           rank() over (
               partition by group_number
               order by count(*) desc
           ) as place
    from public.votes
    group by group_number, girl_id
) results
order by group_number, place, girl_id;
```

**How many people voted in each group:**

```sql
select group_number, count(distinct voter_id) as voters
from public.votes
group by group_number
order by group_number;
```

You can also look at the raw rows in **Table Editor > votes**.

Ties show the same place number (two girls both on place 2, for example), so check for them before choosing the wildcard.

## Clearing votes

```sql
delete from public.votes where group_number = 7;  -- one group
delete from public.votes;                         -- everything (after testing)
```

Browsers that voted still remember it. To test again, use a fresh private window.

## Honest limits

- The one-submission limit follows the browser. Clearing site data, a private window or another device lets someone vote again. For stricter control the next step is requiring a sign-in.
- Because votes are tied to a random browser ID, you can't tell who a voter is, only that it's one browser.
- The number of votes per voter (2) is set in `votes.js` (`VOTES_PER_GROUP`) and in the `cast_votes` function in the SQL. Change both together if you ever want a different number.
- The free Supabase plan pauses projects after about a week of no activity.
