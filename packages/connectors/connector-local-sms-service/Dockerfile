# Build stage for the connector
FROM node:22-alpine AS builder

WORKDIR /app

# Copy connector source
COPY packages/connectors/connector-local-sms-service/package.json .
COPY packages/connectors/connector-local-sms-service/tsconfig.json .
COPY packages/connectors/connector-local-sms-service/tsup.config.ts .
COPY packages/connectors/connector-local-sms-service/src ./src

# Copy required workspace packages (we only need the compiled lib)
COPY packages/toolkit/connector-kit/package.json ../toolkit/connector-kit/package.json
COPY packages/toolkit/language-kit/package.json ../toolkit/language-kit/package.json

# Install dependencies and build
RUN npm install && npx tsup

# Production image - just the built connector
FROM node:22-alpine

WORKDIR /app

# Copy built connector
COPY --from=builder /app/lib ./lib
COPY packages/connectors/connector-local-sms-service/package.json .

# The connector is a library, not a standalone service.
# This image provides the connector package for use in other Logto deployments.
# To test, you can run: node -e "const { createConnector } = require('./lib/index.js'); console.log('Connector loaded');"

LABEL org.opencontainers.image.title="Local SMS Service Connector"
LABEL org.opencontainers.image.description="Configurable HTTP SMS connector with POST/GET support"
LABEL org.opencontainers.image.vendor="Logto"

CMD ["node", "-e", "const { createConnector } = require('./lib/index.js'); console.log('✅ Local SMS Service Connector loaded successfully');"]
