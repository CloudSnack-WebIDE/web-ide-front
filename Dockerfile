FROM node:20-bookworm
WORKDIR /usr/src/app
COPY goorm_cookie/ ./
RUN npm ci

# skip tsc checking
RUN npx vite build

RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "dist"]
