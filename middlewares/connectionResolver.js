const { createNamespace } = require("continuation-local-storage");
const { getConnectionBySlug } = require("../connectionManager");

// Create a namespace for the application.
let nameSpace = createNamespace("unique context");

/**
 * Get the connection instance for the given tenant's slug and set it to the current context.
 **/
const resolve = (req, res, next) => {
  const slug = req.query.slug;
  if (!slug) {
    res.json({ message: `Please provide tenant's slug to connect.` });
    return;
  }

  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  nameSpace.run(() => {
    nameSpace.set("connection", getConnectionBySlug(slug)); // This will set the knex instance to the 'connection'
    next();
  });
};

module.exports = resolve;
