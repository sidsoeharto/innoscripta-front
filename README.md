## How To Run

Run this command to build the image on your local machine and start the container. You only need to run this command the first time, and whenever you make changes to docker-compose.yml.

```
docker-compose up --build --no-recreate -d
```

From the second time, you can use

```
docker-compose up -d
```

Log into the container and then execute the commands.
```
docker exec -it vite_docker sh
```

We have entered the container and now need to run the commands to install the Node packages and start the app.

```
yarn install && yarn dev
```

It will install the packages and the application will run on the defined ports.