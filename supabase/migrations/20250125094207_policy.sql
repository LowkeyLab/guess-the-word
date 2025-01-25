alter table "public"."games" enable row level security;

create policy "Enable insert for authenticated users only"
on "public"."games"
as permissive
for insert
to authenticated
with check (true);



