# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

FROM dependencies AS development
COPY --chown=node:node . .
RUN chown node:node /app \
    && mkdir -p node_modules/.vite node_modules/.tmp \
    && chown -R node:node node_modules/.vite node_modules/.tmp
USER node
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM dependencies AS build
ARG VITE_APP_URL=https://app.kinkverse.org
ARG VITE_PUBLIC_POSTHOG_KEY=
ARG VITE_PUBLIC_POSTHOG_HOST=
ENV VITE_APP_URL=$VITE_APP_URL VITE_PUBLIC_POSTHOG_KEY=$VITE_PUBLIC_POSTHOG_KEY VITE_PUBLIC_POSTHOG_HOST=$VITE_PUBLIC_POSTHOG_HOST
COPY . .
RUN npm run build

FROM caddy:2.10.2-alpine AS production
COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
USER 1000:1000
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s CMD wget -q --spider http://127.0.0.1:8080/ || exit 1
