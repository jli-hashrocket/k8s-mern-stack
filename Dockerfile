FROM node:15.8.0

WORKDIR ./mern-stack

COPY . .

RUN cd backend && npm install && cd ../frontend && npm install
EXPOSE 3000
CMD cd backend && npm run servers
