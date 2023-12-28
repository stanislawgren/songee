FROM node:18
WORKDIR /app
COPY . .
EXPOSE 8080
CMD ["node", "./api/server.js"]