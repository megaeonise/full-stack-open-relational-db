// const { Sequelize } = require("sequelize");
// const { DATABASE_URL } = require("./config");
// const { Umzug, SequelizeStorage } = require("umzug");

// const sequelize = new Sequelize(DATABASE_URL, {
//   dialect: "postgres",
// });

// const connectToDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("connected to the database");
//   } catch (err) {
//     console.log("failed to connect to the database");
//     return process.exit(1);
//   }

//   return null;
// };

// module.exports = { connectToDatabase, sequelize };
const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(DATABASE_URL, { dialect: "postgres" });

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("authenticated");
    await runMigrations();
    console.log("connected to the database");
  } catch (err) {
    console.log(err);
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
};

const migrationConf = {
  migrations: {
    glob: "migrations/*.ts",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig: { name: any }) => mig.name),
  });
};
const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

module.exports = { connectToDatabase, sequelize, rollbackMigration };
