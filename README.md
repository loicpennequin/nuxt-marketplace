# Marketplace App

## Installation

Create  .env file by copying .env-sample and replace the dummy values

💡 Note: Pusher environment variables are not needed **for now**
```bash
cp .env-sample .env
```
Install dependencies

```bash
yarn
```
***Planetscale only*** Open a separate terminal and start the database connexion 
```bash
yarn db:start
```

Generate your Prisma schema and sync it to your database
```
yarn db:sync
```

## Local development

***Planetscale only*** Open a separate terminal and start the database connexion 
```bash
yarn db:start
```

Open another terminal and start the maildev server to recieve emails in your local environment

*@TODO: make it optional with environment variable and print temporary email links in console*

```bash
yarn maildev
```

Open a third terminal and start the appearance-none
```bash
yarn dev
```