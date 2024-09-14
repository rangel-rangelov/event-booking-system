This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. First make sure your are using the correct version of Node.js listed in the `.nvmrc` file. If you are using NVM, you can switch to that version by running:
```bash
nvm use
```
2. In order to install the correct package manager. In this case `yarn`. Run the following commands:
```bash
corepack enable
corepack install
```
3. To install the project dependencies run the following command:
```bash
yarn
```

4. Make a copy of the `.env.example` file and rename it to `.env.local`. Then setup your environment variables by filling the listed variables.

5. Make sure to update your type definitions by running:

```bash
yarn sanity:types
```

6. To start the project run:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
