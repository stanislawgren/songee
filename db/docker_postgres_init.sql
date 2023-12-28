--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
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
-- Name: songee; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA songee;


ALTER SCHEMA songee OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: songee; Owner: postgres
--

CREATE TABLE songee.users (
    id integer NOT NULL
);


ALTER TABLE songee.users OWNER TO postgres;

--
-- Data for Name: users; Type: TABLE DATA; Schema: songee; Owner: postgres
--

COPY songee.users (id) FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

