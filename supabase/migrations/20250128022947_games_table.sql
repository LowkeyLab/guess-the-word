alter table "public"."games" drop column "guesses";

alter table "public"."games" drop column "players";

alter table "public"."games" add column "player_one_name" text;

alter table "public"."games" add column "player_two_name" text;


