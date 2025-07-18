-- Create ENUM types
CREATE TYPE public."ResourceCategory" AS ENUM (
    'ANXIETY',
    'DEPRESSION',
    'STRESS',
    'BIPOLAR',
    'PTSD',
    'GENERAL_WELLNESS',
    'BREATHING_EXERCISES',
    'MINDFULNESS'
);

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);

-- Create tables
CREATE TABLE public.users (
    id text NOT NULL PRIMARY KEY,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);

CREATE TABLE public.journal_entries (
    id text NOT NULL PRIMARY KEY,
    "userId" text NOT NULL,
    title text,
    content text NOT NULL,
    mood integer NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE public.mental_health_resources (
    id text NOT NULL PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    content text NOT NULL,
    category public."ResourceCategory" NOT NULL,
    "imageUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);

-- Create the missing breathing_sessions table
CREATE TABLE public.breathing_sessions (
    id text NOT NULL PRIMARY KEY,
    "userId" text NOT NULL,
    duration integer NOT NULL,
    type text NOT NULL,
    completed boolean DEFAULT true,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
