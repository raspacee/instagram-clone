# Instagram clone

Technologies used - MongoDB, Express, React and NodeJS.

## How to start backend

1. `cd` into the directory and run `npm install` to install the required dependencies.
2. Create a .env file in the root directory and set two environment variables: set `MONGODB_URL` as your MongoDB database URL and set `JWT_SECRET` as any random token.
3. Run `npm run dev` to start a dev server or `npm run start` to start a production server.
4. You can also set `PORT` in the .env file otherwise the server will use port 3000.

## How to start frontend

1. `cd` into the directory and run `yarn install` to install the required dependencies.
2. Create a .env file in the root directory and set two environment variables: set `VITE_COOKIES_NAME` as any string and set `VITE_API_URL` as the URL that the backend is running on.
3. Run `yarn dev` to start a dev server.
