alter table "public"."games" alter column "players" set data type jsonb[] using "players"::jsonb[];


