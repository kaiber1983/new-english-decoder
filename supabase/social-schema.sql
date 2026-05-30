create table if not exists public.social_words (
  id text primary key,
  word text not null,
  meaning text not null,
  likes integer not null default 0,
  comments text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists social_words_created_at_idx
  on public.social_words (created_at desc);

create index if not exists social_words_likes_idx
  on public.social_words (likes desc);
