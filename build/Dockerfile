FROM node:22 AS builder
WORKDIR /build
COPY . ./
RUN npm install
RUN npm run build

FROM node:22-alpine3.18
ARG GIT_COMMIT_HASH="undefined"
ARG SERVER_ORIGIN="http://localhost:3001"
ARG NODE_PORT=3001
ENV GIT_COMMIT_HASH=$GIT_COMMIT_HASH
# https://stackoverflow.com/questions/13333221/how-to-change-value-of-process-env-port-in-node-js
ENV PORT=$NODE_PORT
# https://stackoverflow.com/questions/73790956/cross-site-post-form-submissions-are-forbidden
ENV ORIGIN=$SERVER_ORIGIN
WORKDIR /app
COPY --from=builder build/svelte-build bin/
# https://www.reddit.com/r/sveltejs/comments/108ayfb/sveltekit_adapternode_deploy/
COPY --from=builder build/package.json bin/
WORKDIR /app/bin
# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#handling-kernel-signals
CMD ["node", "."]
