# React Event Mini App

## Commands

Running locally:

Install the dependencies:

```bash
yarn
```

Backend:

```bash
cd backend && yarn
```

Set the environment variables:

```bash
cp .env.example .env
```

## Project Structure

```
frontend\
 |--backend\         # backend project
 |--...
 |--...
```

## To run migration

```bash
cd backend && npx sequelize-cli db:migrate --config config/config.json

```

## Cron Job

To change the cron job time follow the following instructions and apply in app.js

┌────────────── second (0 - 59) (optional)
│ ┌──────────── minute (0 - 59)
│ │ ┌────────── hour (0 - 23)
│ │ │ ┌──────── day of the month (1 - 31)
│ │ │ │ ┌────── month (1 - 12)
│ │ │ │ │ ┌──── day of the week (0 - 6) (0 and 7 both represent Sunday)
│ │ │ │ │ │
│ │ │ │ │ │

---

## Backend Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`
