CREATE TABLE account(
  user_id serial PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  job_role VARCHAR(55) NOT NULL,
  department VARCHAR(255),
  address VARCHAR(255)
);

CREATE TABLE categories(
  category_id serial PRIMARY KEY,
  category_name VARCHAR(50),
	UNIQUE(category_name)

);

CREATE TABLE articles(
  article_id serial PRIMARY KEY,
  author_id integer NOT NULL REFERENCES account("user_id"),
  article_title TEXT NOT NULL,
  article TEXT NOT NULL,
  created_on TIMESTAMP NOT NULL,
  category VARCHAR(50) REFERENCES categories(category_name)
);

CREATE TABLE gifs(
  gif_id serial PRIMARY KEY,
  author_id integer NOT NULL,
  gif_title TEXT,
  image_url VARCHAR(255) NOT NULL,
  created_on TIMESTAMP,
  category VARCHAR(50),
  FOREIGN KEY("category") REFERENCES "categories" ("category_name"),
  FOREIGN KEY("author_id") REFERENCES "account" ("user_id")


);

CREATE TABLE comments(
  comment_id serial PRIMARY KEY,
  created_on TIMESTAMP NOT NULL,
  comment VARCHAR(255) NOT NULL,
  author_id integer NOT NULL,
  gif_id integer,
  article_id integer,
	FOREIGN KEY("gif_id") REFERENCES "gifs" ("gif_id"),
  	FOREIGN KEY("article_id") REFERENCES "articles" ("article_id"),
  FOREIGN KEY("author_id") REFERENCES "account" ("user_id")
)
