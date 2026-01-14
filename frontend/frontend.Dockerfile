# ---------- build stage ----------
FROM node:20 AS build
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build

# ---------- runtime stage (nginx) ----------
FROM nginx:1.25

# Кладём собранный фронт
COPY --from=build /app/dist /usr/share/nginx/html

# Наш конфиг nginx (только server блок)
COPY nginx.conf /etc/nginx/conf.d/default.conf
