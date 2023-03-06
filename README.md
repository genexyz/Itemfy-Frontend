# ITEMFY - Products and Reviews Platform - Frontend

In this platform users can create, view and review Products.

## How to set up the app locally

1.  Install the required dependencies

```
npm install
```

2.  Create a .env file in the root directory with the server URL

```
VITE_SERVER_URL=http://localhost:8000
```

3. To start the app run:

```
npm run dev
```

This will start the client on http://localhost:5173

## Considerations and Notes

### Deployment

The app is currently deployed online to use, the client can be found at:

```
https://itemfy-frontend.vercel.app/
```

The deployment is already connected to the deployed server, so testing can be made easily.
If you have any errors when setting up the local environment, feel free to test the client in the deployed URL.

### Users to test

To test the app you can use the following users, which are already loaded in the cloud database. Or you can create your own.

```
test@example.com - password1$
test1@example.com - password1$
test2@example.com - password1$
test3@example.com - password1$
```

### Functionalities

- Sign in & Sign up & Sign out (JWT)
- Create a product
- List products with the number of reviews
- View details of a single product
- Create a review of a product
- List reviews with data of the product
- View details of a review and its associated product

A lot of improvements could be made to the current state of the app, but I limited to the core functionalities needed.

### Functionalities

## Tech Stack

- React.js
- Typescript
- Material UI
- Tailwind CSS
- Vite
