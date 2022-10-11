This is a Single Page Application that is primarily for learning MERN/Docker/Kubernetes.

## Available Scripts
Deploy via Kubernetes
- kubectl apply -f k8s

Deploy via Docker
- create .env file in /backend
    - set DB_HOST = 'mongodb://mongo-service:27017/submission-manager
    - set DB_USER = root
    - set DB_PASSWORD = root
- run 'docker compose up'
