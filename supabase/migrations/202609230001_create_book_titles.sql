create table if not exists public.book_titles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  isbn text,
  section text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint book_titles_title_not_blank
    check (btrim(title) <> ''),

  constraint book_titles_author_not_blank
    check (btrim(author) <> ''),

  constraint book_titles_section_not_blank
    check (btrim(section) <> ''),

  constraint book_titles_isbn_not_blank
    check (isbn is null or btrim(isbn) <> '')
);

create unique index if not exists book_titles_isbn_unique
  on public.book_titles (isbn)
  where isbn is not null;

create index if not exists book_titles_title_search
  on public.book_titles (lower(title));

create index if not exists book_titles_author_search
  on public.book_titles (lower(author));

create index if not exists book_titles_section_filter
  on public.book_titles (section);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_book_titles_updated_at
  on public.book_titles;

create trigger set_book_titles_updated_at
before update on public.book_titles
for each row
execute function public.set_updated_at();

alter table public.book_titles enable row level security;

revoke all on table public.book_titles from anon, authenticated;
grant select, insert, update, delete
  on table public.book_titles
  to service_role;

comment on table public.book_titles is
  'Shared catalogue information for new and second-hand books.';