# build step
FROM node:16.13.2-alpine as build
LABEL authors="Eduardo"

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./

RUN npm run build

# release step
FROM nginx:1.21.5-alpine as release

COPY --from=build /app/build /usr/share/nginx/html/
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]

ENTRYPOINT ["top", "-b"]