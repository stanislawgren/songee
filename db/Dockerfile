FROM postgres:12 as db

WORKDIR /app

COPY ./db/init.sh /docker-entrypoint-initdb.d
COPY ./db/init.sql ./scripts/db/init.sql