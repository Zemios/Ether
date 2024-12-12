CREATE TABLE comments (
    id integer NOT NULL,
    post_id integer,
    user_id integer,
    content text NOT NULL,
    creation_date timestamp with time zone DEFAULT now()
);
CREATE TABLE courses (
    id integer NOT NULL,
    title text NOT NULL,
    content json NOT NULL,
    creation_date timestamp with time zone DEFAULT now()
);
CREATE TABLE lessons (
    id integer NOT NULL,
    module_id integer,
    title text NOT NULL,
    content text,
    exercise text,
    lesson_order integer NOT NULL
);
CREATE TABLE likes (
    id integer NOT NULL,
    user_id integer,
    post_id integer,
    news_id integer
);
CREATE TABLE modules (
    id integer NOT NULL,
    course_id integer,
    title text NOT NULL,
    description text,
    module_order integer NOT NULL
);
CREATE TABLE news (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    publication_date timestamp with time zone DEFAULT now(),
    category text,
    image text,
    author_id integer
);
CREATE TABLE posts (
    id integer NOT NULL,
    user_id integer,
    title text NOT NULL,
    content text NOT NULL,
    creation_date timestamp with time zone DEFAULT now()
);
CREATE TABLE project_collaborators (
    id integer NOT NULL,
    project_id integer,
    user_id integer
);
CREATE TABLE projects (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    start_date timestamp with time zone DEFAULT now(),
    end_date timestamp with time zone,
    image text,
    technologies text[],
    github_link text,
    website_link text,
    subtitle text
);
CREATE TABLE user_progress (
    id integer NOT NULL,
    user_id integer,
    course_id integer,
    module_id integer,
    lesson_id integer,
    completed boolean DEFAULT false,
    completed_at timestamp with time zone
);
CREATE TABLE user_projects (
    id integer NOT NULL,
    user_id integer,
    project_id integer,
    contribution text
);
CREATE TABLE users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    registration_date timestamp with time zone DEFAULT now(),
    password text NOT NULL,
    about_me text,
    role text
);
ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);

ALTER TABLE ONLY courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);

ALTER TABLE ONLY lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);

ALTER TABLE ONLY likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);

ALTER TABLE ONLY modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (id);

ALTER TABLE ONLY news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);

ALTER TABLE ONLY posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY project_collaborators
    ADD CONSTRAINT project_collaborators_pkey PRIMARY KEY (id);

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);

ALTER TABLE ONLY user_progress
    ADD CONSTRAINT user_progress_pkey PRIMARY KEY (id);

ALTER TABLE ONLY user_projects
    ADD CONSTRAINT user_projects_pkey PRIMARY KEY (id);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id);

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE ONLY lessons
    ADD CONSTRAINT lessons_module_id_fkey FOREIGN KEY (module_id) REFERENCES modules(id);

ALTER TABLE ONLY likes
    ADD CONSTRAINT likes_news_id_fkey FOREIGN KEY (news_id) REFERENCES news(id);

ALTER TABLE ONLY likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id);

ALTER TABLE ONLY likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE ONLY modules
    ADD CONSTRAINT modules_course_id_fkey FOREIGN KEY (course_id) REFERENCES courses(id);

ALTER TABLE ONLY news
    ADD CONSTRAINT news_author_id_fkey FOREIGN KEY (author_id) REFERENCES users(id);

ALTER TABLE ONLY posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE ONLY project_collaborators
    ADD CONSTRAINT project_collaborators_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id);

ALTER TABLE ONLY project_collaborators
    ADD CONSTRAINT project_collaborators_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE ONLY user_progress
    ADD CONSTRAINT user_progress_course_id_fkey FOREIGN KEY (course_id) REFERENCES courses(id);

ALTER TABLE ONLY user_progress
    ADD CONSTRAINT user_progress_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES lessons(id);

ALTER TABLE ONLY user_progress
    ADD CONSTRAINT user_progress_module_id_fkey FOREIGN KEY (module_id) REFERENCES modules(id);

ALTER TABLE ONLY user_progress
    ADD CONSTRAINT user_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE ONLY user_projects
    ADD CONSTRAINT user_projects_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id);

ALTER TABLE ONLY user_projects
    ADD CONSTRAINT user_projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
