CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
author text,
url text NOT NULL,
title text NOT NULL,
likes integer DEFAULT 0        
);

insert into blogs (author, url, title, likes) values ('megaeonise', 'www.google.com', 'megafa', 200);

insert into blogs (url, title) values ('www.google.com', 'evil');