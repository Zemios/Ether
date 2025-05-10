-- 1) Tablas sobrevivientes (sin cursos)
CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES post(id),
    user_id INTEGER REFERENCES user(id),
    content TEXT NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_like (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user(id),
    post_id INTEGER REFERENCES post(id),
    news_id INTEGER REFERENCES news(id)
);

CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    publication_date TIMESTAMPTZ DEFAULT now(),
    category TEXT,
    image TEXT,
    author_id INTEGER REFERENCES user(id)
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE project_collaborator (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES project(id),
    user_id INTEGER REFERENCES user(id)
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    start_date TIMESTAMPTZ DEFAULT now(),
    end_date TIMESTAMPTZ,
    image TEXT,
    technologies TEXT[],
    github_link TEXT,
    website_link TEXT,
    subtitle TEXT
);

CREATE TABLE user_project (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user(id),
    project_id INTEGER REFERENCES project(id),
    contribution TEXT
);

CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    registrated_at TIMESTAMPTZ DEFAULT now(),
    password TEXT NOT NULL,
    about_me TEXT,
    role TEXT
);