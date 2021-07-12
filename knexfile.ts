interface KnexConfig {
  [key: string]: object;
};

export const knexConfig: KnexConfig = {
  development: {
    client: 'postgres',
    connection: {
      host: process.env.rasp_access_key_id,
      user: process.env.rasp_access_key_user_rds,
      password: process.env.rasp_access_secrety_key,
      database: 'commerce',
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
      host: process.env.aws_access_key_id_rds,
      user: process.env.aws_access_key_user_rds,
      password: process.env.aws_access_secrety_key_rds,
      database: 'commerce',
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