### NodeJs Multitenant example

This nodejs app implements a multi tenant architecture. This is for learning purposes.

To test this app you need the following:

PostgreSQL with:

```sh
common_db
tenant_1_db
tenant_2_db

common_user
tenant_1_user
tenant_2_user
```

Can use the `docker-compose.yml` to create a docker container with psql.

To install the app follow these steps:

Clone the repo with:

```sh
git clone
```

Change dir with:

```sh
cd
```

Install dependencies with:

```sh
npm i
```

Start the application with:

```
npm start
```
