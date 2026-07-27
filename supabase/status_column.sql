alter table opportunities
  add column if not exists status text not null default 'approved';

alter table opportunities
  drop constraint if exists opportunities_status_check;
alter table opportunities
  add constraint opportunities_status_check check (status in ('pending', 'approved'));
