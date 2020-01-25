const { getConnection } = require("../connectionManager");

/**
 * Get all the users.
 **/
const getAll = async (req, res, next) => {
  res.json({
    body: await getConnection()
      .select("*")
      .from("users")
  });
};

module.exports = getAll;
