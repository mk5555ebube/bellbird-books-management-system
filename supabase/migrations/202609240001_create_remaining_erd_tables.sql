-- Complete the Bellbird Books database schema.
-- book_titles was created by the previous migration.

create extension if not exists pgcrypto;

-- Reusable updated_at trigger function.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- NEW BOOK STOCK
-- One stock record per book title.


create table public.new_book_stock (
  id uuid primary key default gen_random_uuid(),
  book_title_id uuid not null unique
    references public.book_titles(id) on delete cascade,
  selling_price numeric(10, 2) not null
    check (selling_price >= 0),
  quantity integer not null default 0
    check (quantity >= 0),
  minimum_stock_level integer not null default 0
    check (minimum_stock_level >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index new_book_stock_book_title_id_idx
  on public.new_book_stock(book_title_id);

create index new_book_stock_quantity_idx
  on public.new_book_stock(quantity);

create trigger set_new_book_stock_updated_at
before update on public.new_book_stock
for each row
execute function public.set_updated_at();


-- SECOND-HAND COPIES
-- Multiple independent copies may belong to one book title.


create table public.second_hand_copies (
  id uuid primary key default gen_random_uuid(),
  book_title_id uuid not null
    references public.book_titles(id) on delete cascade,
  condition text not null
    check (btrim(condition) <> ''),
  purchase_cost numeric(10, 2) not null
    check (purchase_cost >= 0),
  selling_price numeric(10, 2) not null
    check (selling_price >= 0),
  shelf_location text,
  availability text not null default 'Available'
    check (btrim(availability) <> ''),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index second_hand_copies_book_title_id_idx
  on public.second_hand_copies(book_title_id);

create index second_hand_copies_availability_idx
  on public.second_hand_copies(availability);

create trigger set_second_hand_copies_updated_at
before update on public.second_hand_copies
for each row
execute function public.set_updated_at();


-- CUSTOMERS
-- At least one contact method must be recorded.

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null
    check (btrim(name) <> ''),
  phone text,
  email text,
  preferred_contact text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint customers_contact_required
    check (
      nullif(btrim(phone), '') is not null
      or nullif(btrim(email), '') is not null
    ),

  constraint customers_preferred_contact_check
    check (
      preferred_contact is null
      or lower(preferred_contact) in ('phone', 'email')
    )
);

create index customers_name_idx
  on public.customers(name);

create index customers_email_idx
  on public.customers(email);

create trigger set_customers_updated_at
before update on public.customers
for each row
execute function public.set_updated_at();

-- CUSTOMER ORDERS
-- One customer may have multiple orders.

create table public.customer_orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null
    references public.customers(id) on delete restrict,
  status text not null default 'Pending'
    check (btrim(status) <> ''),
  notes text,
  status_updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index customer_orders_customer_id_idx
  on public.customer_orders(customer_id);

create index customer_orders_status_idx
  on public.customer_orders(status);

create trigger set_customer_orders_updated_at
before update on public.customer_orders
for each row
execute function public.set_updated_at();

-- Keep status_updated_at accurate when the status changes.
create or replace function public.set_order_status_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.status is distinct from old.status then
    new.status_updated_at = now();
  end if;

  return new;
end;
$$;

create trigger set_customer_orders_status_updated_at
before update of status on public.customer_orders
for each row
execute function public.set_order_status_updated_at();

-- ORDER ITEMS
-- New-book items use quantity.
-- Second-hand copies are sold individually.

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null
    references public.customer_orders(id) on delete cascade,
  book_title_id uuid not null
    references public.book_titles(id) on delete restrict,
  second_hand_copy_id uuid
    references public.second_hand_copies(id) on delete restrict,
  stock_type text not null
    check (stock_type in ('new', 'second_hand')),
  quantity integer not null
    check (quantity > 0),
  created_at timestamptz not null default now(),

  constraint order_items_stock_reference_check
    check (
      (
        stock_type = 'new'
        and second_hand_copy_id is null
      )
      or
      (
        stock_type = 'second_hand'
        and second_hand_copy_id is not null
        and quantity = 1
      )
    ),

  constraint order_items_second_hand_copy_unique
    unique (second_hand_copy_id)
);

create index order_items_order_id_idx
  on public.order_items(order_id);

create index order_items_book_title_id_idx
  on public.order_items(book_title_id);

create index order_items_stock_type_idx
  on public.order_items(stock_type);

-- =========================================================
-- SECURITY
-- Access remains server-side through the service-role client.
-- =========================================================

alter table public.new_book_stock enable row level security;
alter table public.second_hand_copies enable row level security;
alter table public.customers enable row level security;
alter table public.customer_orders enable row level security;
alter table public.order_items enable row level security;

revoke all on public.new_book_stock from anon, authenticated;
revoke all on public.second_hand_copies from anon, authenticated;
revoke all on public.customers from anon, authenticated;
revoke all on public.customer_orders from anon, authenticated;
revoke all on public.order_items from anon, authenticated;

grant all on public.new_book_stock to service_role;
grant all on public.second_hand_copies to service_role;
grant all on public.customers to service_role;
grant all on public.customer_orders to service_role;
grant all on public.order_items to service_role;