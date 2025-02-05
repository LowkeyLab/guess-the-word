create type "public"."game_state" as enum ('waiting', 'started', 'ended');

create table "public"."games" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "state" game_state not null default 'waiting'::game_state
);


alter table "public"."games" enable row level security;

create table "public"."guesses" (
    "id" bigint generated by default as identity not null,
    "game_id" bigint,
    "user_id" uuid not null default gen_random_uuid(),
    "guess" text[] not null default '{}'::text[]
);


alter table "public"."guesses" enable row level security;

CREATE UNIQUE INDEX game_players_pkey ON public.guesses USING btree (id);

CREATE UNIQUE INDEX games_pkey ON public.games USING btree (id);

alter table "public"."games" add constraint "games_pkey" PRIMARY KEY using index "games_pkey";

alter table "public"."guesses" add constraint "game_players_pkey" PRIMARY KEY using index "game_players_pkey";

alter table "public"."guesses" add constraint "game_players_game_id_fkey" FOREIGN KEY (game_id) REFERENCES games(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."guesses" validate constraint "game_players_game_id_fkey";

alter table "public"."guesses" add constraint "game_players_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."guesses" validate constraint "game_players_user_id_fkey";

grant delete on table "public"."games" to "anon";

grant insert on table "public"."games" to "anon";

grant references on table "public"."games" to "anon";

grant select on table "public"."games" to "anon";

grant trigger on table "public"."games" to "anon";

grant truncate on table "public"."games" to "anon";

grant update on table "public"."games" to "anon";

grant delete on table "public"."games" to "authenticated";

grant insert on table "public"."games" to "authenticated";

grant references on table "public"."games" to "authenticated";

grant select on table "public"."games" to "authenticated";

grant trigger on table "public"."games" to "authenticated";

grant truncate on table "public"."games" to "authenticated";

grant update on table "public"."games" to "authenticated";

grant delete on table "public"."games" to "service_role";

grant insert on table "public"."games" to "service_role";

grant references on table "public"."games" to "service_role";

grant select on table "public"."games" to "service_role";

grant trigger on table "public"."games" to "service_role";

grant truncate on table "public"."games" to "service_role";

grant update on table "public"."games" to "service_role";

grant delete on table "public"."guesses" to "anon";

grant insert on table "public"."guesses" to "anon";

grant references on table "public"."guesses" to "anon";

grant select on table "public"."guesses" to "anon";

grant trigger on table "public"."guesses" to "anon";

grant truncate on table "public"."guesses" to "anon";

grant update on table "public"."guesses" to "anon";

grant delete on table "public"."guesses" to "authenticated";

grant insert on table "public"."guesses" to "authenticated";

grant references on table "public"."guesses" to "authenticated";

grant select on table "public"."guesses" to "authenticated";

grant trigger on table "public"."guesses" to "authenticated";

grant truncate on table "public"."guesses" to "authenticated";

grant update on table "public"."guesses" to "authenticated";

grant delete on table "public"."guesses" to "service_role";

grant insert on table "public"."guesses" to "service_role";

grant references on table "public"."guesses" to "service_role";

grant select on table "public"."guesses" to "service_role";

grant trigger on table "public"."guesses" to "service_role";

grant truncate on table "public"."guesses" to "service_role";

grant update on table "public"."guesses" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."games"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."games"
as permissive
for select
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."guesses"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."guesses"
as permissive
for select
to public
using (true);



