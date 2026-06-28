# ---- Build stage ----
FROM node:18-alpine AS build

WORKDIR /app

@@ -10,16 +10,6 @@ COPY . .
RUN npm run build


# ---- Runtime stage ----
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# SPA routing fix (important for React Router)
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]