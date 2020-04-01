module.exports = [
  {
    "type": "mysql",
    "host": process.env.DBHOST || 'localhost',
    "port": process.env.DBPORT || 3306,
    "username": "developer",
    "password": "123456",
    "database": "website",
    "entities": ["./dist/entity/*.js"],
    "migrations": ["./dist/migration/*.js"],
    "synchronize": false,
    "migrationsRun": false,
    "cli": {
      "migrationsDir": "./src/migration"
    }
  }
]
