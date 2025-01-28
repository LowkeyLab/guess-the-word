alter table "public"."games" add column "player_one_guesses" text[] not null default '{}'::text[];

alter table "public"."games" add column "player_two_guesses" text[] not null default '{}'::text[];


