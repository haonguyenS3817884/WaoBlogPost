# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Technologies Used

- [Remix](https://docs.remix.run/) - Check Remix documentation for detailed information.
- [Prisma](https://www.prisma.io/docs/) - Prisma's documentation for database handling.
- TypeScript
- ReactJS
- TailwindCSS
- Vite
- MySQL
- NodeJS (Node version >= 20.0.0)

## Clone the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/haonguyenS3817884/WaoBlogPost.git
cd WaoBlogPost
```

## Install Dependencies

Navigate to the project directory and install the necessary dependencies:

```bash
npm install
```

or

```bash
npm ci
```

## Set Up Environment Variables

Create a **.env** file in the root directory and include the MySQL connection link in this format:

```bash
DATABASE_URL=your_mysql_connection_link_here
```

Replace `your_mysql_connection_link_here` with your actual MySQL connection link.

For local database, URL format mysql://username:password@localhost:3306/databasename

## Set up and seed Database

First, generate Prisma:

```sh
npx prisma generate
```

Second, set up Prisma Client and create tables:

```sh
npx prisma db push
```

Finally, seed database:

```sh
npx prisma db seed
```

or

```sh
npx tsx prisma/seed.ts
```

## Development

Run the dev server:

```sh
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
