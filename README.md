# Chat-platform
Basic chat platform with NodeJS, React &amp; GraphQL

### Requirements

- In a new project, install the apollo-server and graphql dependencies using:

```
npm i apollo-server graphql
```

- Sequelize ORM

```
$ npm i --save sequelize

$ npm i sequelize-cli -g

$ npm i --save mysql2
```

### Sequelize model

```sh
$ sequelize model:generate --name User --attributes username:string,email:string

$ sequelize model:generate --name Message --attributes content:string,uuid:uuid,from:string,to:string

$ sequelize db:migrate

```

### Test Data seeders

```sh
$ sequelize seed:generate --name create-users

$ sequelize seed:generate --name create-messages

$ sequelize db:migrate:undo:all

$ sequelize db:migrate

$ sequelize db:seed:all

```