# Setting up bun 

ARG BUN_VERSION=1.0.29
FROM oven/bun:${BUN_VERSION}-slim as base

LABEL runtime="Bun"

#Working directory
WORKDIR /app

#setting up production env
ENV NODE_ENV="production"

#throw-away build stage 
FROM base as build

#install packages and dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 

#install node modules
COPY --link bun.lockb package.json ./
RUN bun install --ci 

#install frontend node modules 
COPY --link frontend/bun.lockb frontend/package.json frontend/
RUN cd frontend && bun install --ci

#copy source code
COPY --link . .

#Change to frontend working directory and build 
WORKDIR /app/frontend
RUN bun run build
#remove all files in frontend except dist
RUN find . -maxdepth 1 ! -regex '^./dist\(/.*\)?' -delete 

#final production stage
FROM base 

#Copy build application
COPY --from=build /app /app

#Expose port
EXPOSE 3000
CMD [ "bun","run","start" ]

