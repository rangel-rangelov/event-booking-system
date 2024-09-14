This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Make a copy of the `.env.example` file and rename it to `.env.local`. Then setup your environment variables by filling the listed variables. For assist how to get the diferrent values head to **Envirnoment Variables** section.

2. Make sure your are using the correct version of Node.js listed in the `.nvmrc` file. If you are using NVM, you can switch to that version by running:
```bash
nvm use
```

3. In order to install the correct package manager. In this case `yarn`. Run the following commands:
```bash
corepack enable
corepack install
```

4. Install your packages using yarn
```bash
yarn install
```

5. To run the project with Docker run the following command. Note that the packages may need some time to install:
```bash
docker compose up
```

6. If it's your first time running the project you'll have to go through the following steps:
    1. Generate prisma client:
    ```bash
    docker exec -it booking-app yarn prisma:generate
    ```
    2. Synchronize your prisma schema with the db schema
    ```bash
    docker exec -it booking-app yarn prisma:db:push
    ```
    3. (Optional) Seed your database with users:
    ```bash
    docker exec -it booking-app yarn prisma:db:seed
    ```
    4. You'll need to restart the services using `docker compose down` and then `docker compose up`.

7. Make sure to update your type definitions by running:

```bash
yarn sanity:types
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Head to [http://localhost:3000/studio](http://localhost:3000/studio) to create your first event.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment variables
### Sanity
Head to [Sanity](https://www.sanity.io/) and login to your account. If you don't have one - create it.
1. Create a new project.
2. When asked `*How do you want to set up your project?`* select **From scratch with CLI**.
3. After creating the project you should see the project dashboard.
4. On top you can see the *PROJECT ID*. Copy it and replace it in your `.env.local` file where you see `SET_YOUR_SANITY_PROJECT_ID_HERE`.
5. Make sure to add `http://localhost:3000` as a CORS origin to your Sanity project.

### Pusher
Head to [Pusher](https://pusher.com/) and login to your account. If you don't have one - create it.
1. Create a new project.
2. After you create the project head to **App Key** section and copy the values.
3. Replace them in your `.env.local` file as follows: 
- `app_id` to `SET_YOUR_PUSHER_APP_ID_HERE`
- `key` to `SET_YOUR_PUSHER_APP_KEY_HERE`
- `secret` to `SET_YOUR_PUSHER_APP_SECRET_HERE`

### NextAuth Secret
1. To generate NextAuth secret run the following command in your command prompt:
```bash
openssl rand -base64 32
```
2. Replace the returned value in your `.env.local` file where you see `SET_YOUR_NEXTAUTH_SECRET_HERE`

### Database url and postgres password
1. The password doesn't need to be changed unless you want to. To change the password update the value of `POSTGRES_PASSWORD` in your `.env.local.` file.
2. If the password is not change the default database value will be:
```env
postgresql://postgres:example@db:5432/dev-db
```
3. Place this value in your `.env.local` file where you see `SET_YOUR_DATABASE_URL_HERE`
if any changes are needed the structure is the following:
```
postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
