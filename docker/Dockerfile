FROM node:20.9.0-alpine

WORKDIR /app

COPY src ./src

RUN node --check src/main.js

EXPOSE 8000

CMD ["node", "src/main.js"]
