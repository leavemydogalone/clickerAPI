const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    // Get the token after "Bearer" in the Header
    const token = authHeader.split(" ")[1];

    // verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("Token is not valid");

      //   save user to req.body and go next
      req.user = user;
      next();
    });
  } else {
    // If there is no token in the Header
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  // Check that the user id sent from the verification is the same as the id in the parameters
  // or that they are admin
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.idAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorization };
