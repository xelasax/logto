# syntax=docker/dockerfile:1.7

###### [STAGE] Build ######
FROM node:22-alpine AS builder
WORKDIR /etc/logto
ENV CI=true

# Install toolchain
RUN npm add --location=global pnpm@^10.0.0
RUN apk add --no-cache python3 make g++ rsync

# Copy monorepo sources to build the connector in its workspace context
COPY . .

# Install dependencies
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store pnpm i

# Build ONLY the custom connector (much faster than building the entire monorepo)
RUN pnpm --filter @logto/connector-local-sms-service build

###### [STAGE] Runtime ######
FROM ghcr.io/logto-io/logto:latest AS app

# Inject the built custom connector into the official Logto image
COPY --from=builder /etc/logto/packages/connectors/connector-local-sms-service \
     /etc/logto/packages/core/connectors/connector-local-sms-service

EXPOSE 3001
