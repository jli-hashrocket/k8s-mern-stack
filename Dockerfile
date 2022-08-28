FROM node:15.8.0

WORKDIR ./mern-stack

COPY . .

RUN npm install -g npm

EXPOSE 8080

CMD ["npm", "run dev"]