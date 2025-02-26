const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked");
  const token = "ABC";
  const isAdminauthorized = "ABC";
  if (!isAdminauthorized) {
    res.status(401).send("Unauthorized Request");
  } else {
    next();
  }
};

const customerAuth = (req, res, next) => {
    console.log("Customer auth is getting checked");
    const token = "ABC";
    const isAdminauthorized = "ABC";
    if (!isAdminauthorized) {
      res.status(401).send("Customer Unauthorized Request");
    } else {
      next();
    }
  };

module.exports = {
    adminAuth,
    customerAuth,
}