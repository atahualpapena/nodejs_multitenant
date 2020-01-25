const knex = require("knex");
const { getNamespace } = require("continuation-local-storage");
let connectionMap;

/**
 *  Create knex instance for all the tenants defined in common database and store in a map.
 **/
const connectAllDb = async () => {
  const commonConnection = require("./commonConnection");
  let tenants;

  try {
    tenants = await commonConnection.select("*").from("tenants");
  } catch (err) {
    console.log("error", err);

    return;
  }

  connectionMap = tenants
    .map(tenant => {
      return {
        [tenant.slug]: knex(createConnectionConfig(tenant))
      };
    })
    .reduce((prev, next) => {
      return Object.assign({}, prev, next);
    }, {});
};

/**
 *  Create configuration object for the given tenant.
 **/
const createConnectionConfig = tenant => {
  return {
    client: process.env.DB_CLIENT,
    connection: {
      host: tenant.db_host,
      port: tenant.db_port,
      user: tenant.db_username,
      database: tenant.db_name,
      password: tenant.db_password
    },
    pool: { min: 2, max: 20 }
  };
};

/**
 *  Get the connection information (knex instance) for the given tenant's slug.
 **/
const getConnectionBySlug = slug => {
  if (connectionMap) {
    return connectionMap[slug];
  }
};

/**
 *  Get the connection information (knex instance) for current context.
 **/
const getConnection = () => {
  const nameSpace = getNamespace("unique context");
  const conn = nameSpace.get("connection");

  if (!conn) {
    throw "Connection is not set for any tenant database.";
  }

  return conn;
};

module.exports = connectAllDb;
module.exports = getConnectionBySlug;
module.exports = getConnection;
