FROM node as build
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps

# Accept build-time variables as arguments
ARG REACT_APP_BLOG
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_GOOGLE_CLIENT_ID

# Set environment variables in the container for React build
ENV REACT_APP_BLOG=$REACT_APP_BLOG
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID
COPY . .
#ARG REACT_APP_NAME
#ENV REACT_APP_NAME=$REACT_APP_NAME
RUN npm run build

FROM nginxinc/nginx-unprivileged
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=build /app/build /usr/share/nginx/html