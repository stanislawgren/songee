FROM nginx:alpine
WORKDIR /app
COPY . .
COPY ./web/nginx/my.conf /etc/nginx/conf.d/nginx.conf
RUN rm -rf /etc/nginx/conf.d/default.conf