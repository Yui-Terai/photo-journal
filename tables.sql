CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY,
    photo TEXT,
    title TEXT,
    location TEXT,
    taken_date TEXT,
    capture TEXT
);

CREATE TABLE IF NOT EXISTS album (
    id SERIAL PRIMARY KEY,
    title TEXT
);

CREATE TABLE IF NOT EXISTS photos_album (
    id SERIAL PRIMARY KEY,
    photo_id INTEGER,
    album_id INTEGER
);