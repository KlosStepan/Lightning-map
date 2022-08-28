FROM node as build
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
ARG REACT_APP_NAME
ENV REACT_APP_NAME=$REACT_APP_NAME
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html