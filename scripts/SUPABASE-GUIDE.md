# Supabase voting: setup guide

## What Supabase is (in plain words)

Your site is just files (HTML + JavaScript), so it can't remember anything between visitors. Supabase is a free online database. Your site sends each vote to it, and asks it for the totals.

- **Project URL + anon key**: the address and a public "key" that lets your site talk to *your* database. Safe to put in the site.
- **Table (`votes`)**: a spreadsheet in the database. One row per vote: group, girl, voter, time.
- **Row Level Security (RLS)**: rules that say what the public key may do. Ours says: visitors can only *add* a vote. They can't read, edit or delete votes.
- **Function (`get_group_results`)**: lets the site ask for vote *counts* without ever seeing who voted.

## Setup (about 10 minutes)

1. Go to supabase.com, sign up (free), and click **New project**. Pick a name, a database password (save it somewhere), and the region nearest your visitors. Wait about a minute for it to start.
2. In the left menu open **SQL Editor** > **New query**. Paste in everything from `supabase-setup.sql` and click **Run**. You should see "Success". This creates the table, the rules and the results function.
3. Open **Project Settings > API**. Copy the **Project URL** and the **anon / publishable** key.
4. Open `scripts/supabase-config.js` and paste them over `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY`.
5. Upload the files to your site (see "Where each file goes").
6. Open a group page, vote, and check the **Table Editor > votes** in Supabase: your vote should be there.

**Never** put the `service_role` / secret key in the site. Only the anon / publishable key.

## Where each file goes

| File | Location on your site |
|---|---|
| `supabase-config.js` (new) | `scripts/` |
| `votes.js` (new) | `scripts/` |
| `group.js` (changed) | `scripts/` |
| `profile.js` (changed) | `scripts/` |
| `girls-data.js` (changed) | `scripts/` |
| `group.html` (changed) | `qualifying/groups/` |
| `supabase-setup.sql` | not uploaded, only pasted into Supabase |

## How voting works now

- Every girl's card on a group page has a **Vote** button.
- Each browser gets a random ID (stored in the browser). The database allows **one vote per ID per group**.
- After voting, the buttons lock and each card shows its vote count.
- A girl's profile page "Vote" button now takes people to her group page.
- The old `groupVoteLinks` / Microsoft Forms voting code is gone.

## Reading your results

In Supabase, **SQL Editor**, run:

```sql
select girl_id, count(*) as votes
from votes
where group_number = 7
group by girl_id
order by votes desc;
```

Change `7` to the group you want. The top two are your qualifiers and third is the wildcard, matching `QUALIFY_COUNT` and `WILDCARD_COUNT` in `group.js`.

To restart a group's voting: `delete from votes where group_number = 7;` (then people who voted before can vote again only if they also clear their browser data, see below).

## Honest limits

- **It's not cheat-proof.** The one-vote limit follows the browser. Someone who clears site data, uses a private window or another device can vote again. That's normal for a public no-login poll. If it matters later, the upgrade is Supabase's anonymous sign-in or requiring a login, and I can add it.
- **Vote counts are visible to everyone who has voted** (they come from the public results function). If you'd rather hide counts until a group closes, I can switch it off.
- The free plan pauses a project after about a week of no activity, so open the dashboard now and then during quiet periods.
