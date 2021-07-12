interface KnexConfig {
  [key: string]: object;
};

export const knexConfig: KnexConfig = {
  development: {
    client: 'postgres',
    connection: {
      host: process.env.dev_access_key_id,
      user: process.env.dev_access_key_user,
      password: process.env.dev_access_secrety_key,
      database: 'myapp',
      insecureAuth: true
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.aws_access_key_id,
      user: process.env.aws_access_key_user,
      password: process.env.aws_access_secrety_key,
      database: 'myapp',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  }
};

export default knexConfig;