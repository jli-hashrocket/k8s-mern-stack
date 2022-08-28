FROM node:15.8.0

WORKDIR ./mern-stack

COPY . .

RUN npm install

EXPOSE 8080

CMD ["cd", "backend"]
CMD ["npm", "run dev"]