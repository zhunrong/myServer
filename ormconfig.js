module.exports = [
  {
    type: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    username: process.env.MYSQL_USER || 'developer',
    password: process.env.MYSQL_PASSWORD || '123456',
    database: 'website',
    entities: ['./dist/entity/*.js'],
    migrations: ['./dist/migration/*.js'],
    synchronize: false,
    migrationsRun: false,
    cli: {
      migrationsDir: './src/migration',
    },
  },
];
