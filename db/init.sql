--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Debian 12.17-1.pgdg120+1)
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: schema_name; Type: SCHEMA; Schema: -; Owner: root
--

CREATE SCHEMA schema_name;


ALTER SCHEMA schema_name OWNER TO root;

--
-- Name: songee_schema; Type: SCHEMA; Schema: -; Owner: root
--

CREATE SCHEMA songee_schema;


ALTER SCHEMA songee_schema OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: genres; Type: TABLE; Schema: songee_schema; Owner: root
--

CREATE TABLE songee_schema.genres (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE songee_schema.genres OWNER TO root;

--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: songee_schema; Owner: root
--

CREATE SEQUENCE songee_schema.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE songee_schema.genres_id_seq OWNER TO root;

--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: songee_schema; Owner: root
--

ALTER SEQUENCE songee_schema.genres_id_seq OWNED BY songee_schema.genres.id;


--
-- Name: likes; Type: TABLE; Schema: songee_schema; Owner: root
--

CREATE TABLE songee_schema.likes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    liked_id integer NOT NULL,
    value integer
);


ALTER TABLE songee_schema.likes OWNER TO root;

--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: songee_schema; Owner: root
--

CREATE SEQUENCE songee_schema.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE songee_schema.likes_id_seq OWNER TO root;

--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: songee_schema; Owner: root
--

ALTER SEQUENCE songee_schema.likes_id_seq OWNED BY songee_schema.likes.id;


--
-- Name: messages; Type: TABLE; Schema: songee_schema; Owner: root
--

CREATE TABLE songee_schema.messages (
    id integer NOT NULL,
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    message character varying(1024) NOT NULL
);


ALTER TABLE songee_schema.messages OWNER TO root;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: songee_schema; Owner: root
--

CREATE SEQUENCE songee_schema.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE songee_schema.messages_id_seq OWNER TO root;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: songee_schema; Owner: root
--

ALTER SEQUENCE songee_schema.messages_id_seq OWNED BY songee_schema.messages.id;


--
-- Name: pairs; Type: TABLE; Schema: songee_schema; Owner: root
--

CREATE TABLE songee_schema.pairs (
    id integer NOT NULL,
    user_id_1 integer NOT NULL,
    user_id_2 integer NOT NULL
);


ALTER TABLE songee_schema.pairs OWNER TO root;

--
-- Name: pairs_id_seq; Type: SEQUENCE; Schema: songee_schema; Owner: root
--

CREATE SEQUENCE songee_schema.pairs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE songee_schema.pairs_id_seq OWNER TO root;

--
-- Name: pairs_id_seq; Type: SEQUENCE OWNED BY; Schema: songee_schema; Owner: root
--

ALTER SEQUENCE songee_schema.pairs_id_seq OWNED BY songee_schema.pairs.id;


--
-- Name: user_profiles; Type: TABLE; Schema: songee_schema; Owner: root
--

CREATE TABLE songee_schema.user_profiles (
    id integer NOT NULL,
    user_id integer NOT NULL,
    location character varying(250),
    avatar character varying(250),
    first_name character varying(250),
    last_name character varying(250),
    gender character(1),
    age integer,
    favourite_song_title character varying(100),
    favourite_artist character varying(250),
    description character varying(1024),
    favourite_song_artist character varying(100)
);


ALTER TABLE songee_schema.user_profiles OWNER TO root;

--
-- Name: user_profiles_id_seq; Type: SEQUENCE; Schema: songee_schema; Owner: root
--

CREATE SEQUENCE songee_schema.user_profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE songee_schema.user_profiles_id_seq OWNER TO root;

--
-- Name: user_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: songee_schema; Owner: root
--

ALTER SEQUENCE songee_schema.user_profiles_id_seq OWNED BY songee_schema.user_profiles.id;


--
-- Name: users; Type: TABLE; Schema: songee_schema; Owner: root
--

CREATE TABLE songee_schema.users (
    id integer NOT NULL,
    username character varying(64) NOT NULL,
    password character varying(64) NOT NULL,
    mail character varying(64) NOT NULL,
    permissions integer DEFAULT 1 NOT NULL
);


ALTER TABLE songee_schema.users OWNER TO root;

--
-- Name: users_genres; Type: TABLE; Schema: songee_schema; Owner: root
--

CREATE TABLE songee_schema.users_genres (
    id integer NOT NULL,
    user_id integer NOT NULL,
    genres_id integer NOT NULL
);


ALTER TABLE songee_schema.users_genres OWNER TO root;

--
-- Name: users_genres_id_seq; Type: SEQUENCE; Schema: songee_schema; Owner: root
--

CREATE SEQUENCE songee_schema.users_genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE songee_schema.users_genres_id_seq OWNER TO root;

--
-- Name: users_genres_id_seq; Type: SEQUENCE OWNED BY; Schema: songee_schema; Owner: root
--

ALTER SEQUENCE songee_schema.users_genres_id_seq OWNED BY songee_schema.users_genres.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: songee_schema; Owner: root
--

CREATE SEQUENCE songee_schema.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE songee_schema.users_id_seq OWNER TO root;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: songee_schema; Owner: root
--

ALTER SEQUENCE songee_schema.users_id_seq OWNED BY songee_schema.users.id;


--
-- Name: genres id; Type: DEFAULT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.genres ALTER COLUMN id SET DEFAULT nextval('songee_schema.genres_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.likes ALTER COLUMN id SET DEFAULT nextval('songee_schema.likes_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.messages ALTER COLUMN id SET DEFAULT nextval('songee_schema.messages_id_seq'::regclass);


--
-- Name: pairs id; Type: DEFAULT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.pairs ALTER COLUMN id SET DEFAULT nextval('songee_schema.pairs_id_seq'::regclass);


--
-- Name: user_profiles id; Type: DEFAULT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.user_profiles ALTER COLUMN id SET DEFAULT nextval('songee_schema.user_profiles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.users ALTER COLUMN id SET DEFAULT nextval('songee_schema.users_id_seq'::regclass);


--
-- Name: users_genres id; Type: DEFAULT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.users_genres ALTER COLUMN id SET DEFAULT nextval('songee_schema.users_genres_id_seq'::regclass);


--
-- Data for Name: genres; Type: TABLE DATA; Schema: songee_schema; Owner: root
--

COPY songee_schema.genres (id, name) FROM stdin;
1	rock
2	hip-hop
3	pop
4	trap
5	techno
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: songee_schema; Owner: root
--

COPY songee_schema.likes (id, user_id, liked_id, value) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: songee_schema; Owner: root
--

COPY songee_schema.messages (id, sender_id, receiver_id, message) FROM stdin;
\.


--
-- Data for Name: pairs; Type: TABLE DATA; Schema: songee_schema; Owner: root
--

COPY songee_schema.pairs (id, user_id_1, user_id_2) FROM stdin;
\.


--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: songee_schema; Owner: root
--

COPY songee_schema.user_profiles (id, user_id, location, avatar, first_name, last_name, gender, age, favourite_song_title, favourite_artist, description, favourite_song_artist) FROM stdin;
6	9	Kraków	kasia123_avatar.png	Kasia	Lodówa	f	20	Kyoto	Szpaku	Lubie pingwiny	Marcysia
5	8	Kraków	stanny2_avatar.png	Stanisław	Greń	m	22	xd	xd	Lorem Ipsum 2 	xd
7	10	Krakow	staszek_avatar.png	Maciek	Mackowski	m	23	xd	xd	xd	xd
8	11	Kraków	ola123_avatar.png	Ola	Kowalska	f	19	HUMBLE.	Nas	Hej jestem Ola	Kendrick Lamar
9	12	Kraków	marta123_avatar.png	Marta	Martowsk	f	25	Kolońska i Szlugi	Wersow	Hejka jestem Marta	sanah
10	13	\N	kacper123_avatar.png	\N	\N	\N	\N	\N	\N	\N	\N
4	7	Kraków	stanny_avatar.png	Staszek	Greń	m	23	The Baddest	Kendrick Lamar	Lorem ipsum	Joey Badass
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: songee_schema; Owner: root
--

COPY songee_schema.users (id, username, password, mail, permissions) FROM stdin;
11	ola123	6ecb4a0c7a1dcd80ad0e709ffaebb986	stanny@vp.pl	1
10	staszek	6ecb4a0c7a1dcd80ad0e709ffaebb986	stanny@vp.pl	1
8	stanny2	6ecb4a0c7a1dcd80ad0e709ffaebb986	stanny@vp.pl	1
9	kasia123	6ecb4a0c7a1dcd80ad0e709ffaebb986	stanny@vp.pl	1
7	stanny	6ecb4a0c7a1dcd80ad0e709ffaebb986	stanny@vp.pl	1
12	marta123	6ecb4a0c7a1dcd80ad0e709ffaebb986	stanny@vp.pl	5
13	kacper123	6ecb4a0c7a1dcd80ad0e709ffaebb986	stanny@vp.pl	1
\.


--
-- Data for Name: users_genres; Type: TABLE DATA; Schema: songee_schema; Owner: root
--

COPY songee_schema.users_genres (id, user_id, genres_id) FROM stdin;
10	8	2
72	7	2
73	7	3
74	7	4
75	7	5
76	9	2
77	9	5
78	10	1
79	11	2
81	12	3
\.


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: songee_schema; Owner: root
--

SELECT pg_catalog.setval('songee_schema.genres_id_seq', 5, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: songee_schema; Owner: root
--

SELECT pg_catalog.setval('songee_schema.likes_id_seq', 68, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: songee_schema; Owner: root
--

SELECT pg_catalog.setval('songee_schema.messages_id_seq', 1, false);


--
-- Name: pairs_id_seq; Type: SEQUENCE SET; Schema: songee_schema; Owner: root
--

SELECT pg_catalog.setval('songee_schema.pairs_id_seq', 13, true);


--
-- Name: user_profiles_id_seq; Type: SEQUENCE SET; Schema: songee_schema; Owner: root
--

SELECT pg_catalog.setval('songee_schema.user_profiles_id_seq', 10, true);


--
-- Name: users_genres_id_seq; Type: SEQUENCE SET; Schema: songee_schema; Owner: root
--

SELECT pg_catalog.setval('songee_schema.users_genres_id_seq', 81, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: songee_schema; Owner: root
--

SELECT pg_catalog.setval('songee_schema.users_id_seq', 13, true);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: pairs pairs_pkey; Type: CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.pairs
    ADD CONSTRAINT pairs_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- Name: users_genres users_genres_pkey; Type: CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.users_genres
    ADD CONSTRAINT users_genres_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: likes likes_liked_id_fkey; Type: FK CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.likes
    ADD CONSTRAINT likes_liked_id_fkey FOREIGN KEY (liked_id) REFERENCES songee_schema.users(id);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES songee_schema.users(id);


--
-- Name: messages messages_receiver_id_fkey; Type: FK CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.messages
    ADD CONSTRAINT messages_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES songee_schema.users(id);


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES songee_schema.users(id);


--
-- Name: pairs pairs_user_id_1_fkey; Type: FK CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.pairs
    ADD CONSTRAINT pairs_user_id_1_fkey FOREIGN KEY (user_id_1) REFERENCES songee_schema.users(id);


--
-- Name: pairs pairs_user_id_2_fkey; Type: FK CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.pairs
    ADD CONSTRAINT pairs_user_id_2_fkey FOREIGN KEY (user_id_2) REFERENCES songee_schema.users(id);


--
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES songee_schema.users(id);


--
-- Name: users_genres users_genres_genres_id_fkey; Type: FK CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.users_genres
    ADD CONSTRAINT users_genres_genres_id_fkey FOREIGN KEY (genres_id) REFERENCES songee_schema.genres(id);


--
-- Name: users_genres users_genres_user_id_fkey; Type: FK CONSTRAINT; Schema: songee_schema; Owner: root
--

ALTER TABLE ONLY songee_schema.users_genres
    ADD CONSTRAINT users_genres_user_id_fkey FOREIGN KEY (user_id) REFERENCES songee_schema.users(id);


--
-- PostgreSQL database dump complete
--

