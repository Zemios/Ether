-- Habilitar extensión para UUID (PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de usuarios
DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    registrated_at TIMESTAMPTZ DEFAULT now(),
    password TEXT NOT NULL,
    about_me TEXT,
    role TEXT
);

-- Tabla de proyectos
DROP TABLE IF EXISTS project;
CREATE TABLE project (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Tabla de posts
DROP TABLE IF EXISTS post;
CREATE TABLE post (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES "user"(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT now()
);

-- Tabla de noticias
DROP TABLE IF EXISTS news;
CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    publication_date TIMESTAMPTZ DEFAULT now(),
    category TEXT,
    image TEXT,
    author_id UUID REFERENCES "user"(id)
);

-- Tabla de comentarios
DROP TABLE IF EXISTS comment;
CREATE TABLE comment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES post(id),
    user_id UUID REFERENCES "user"(id),
    content TEXT NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT now()
);

-- Tabla de "me gusta" de usuario
DROP TABLE IF EXISTS user_like;
CREATE TABLE user_like (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES "user"(id),
    post_id UUID REFERENCES post(id),
    news_id UUID REFERENCES news(id)
);

-- Tabla de colaboradores de proyecto
DROP TABLE IF EXISTS project_collaborator;
CREATE TABLE project_collaborator (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES project(id),
    user_id UUID REFERENCES "user"(id)
);

-- Tabla de proyectos de usuario
DROP TABLE IF EXISTS user_project;
CREATE TABLE user_project (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES "user"(id),
    project_id UUID REFERENCES project(id),
    contribution TEXT
);
