const jwt = require('jsonwebtoken');
let jwtSecretKey = process.env.JWT_SECRET_KEY;

//authentification of user's token
const verifyToken = async (req, res, err,next) => {
    key = Object.keys(req.cookies);
    token = key[1];
    try {
      if (token) {
        const decode = await jwt.verify(token, jwtSecretKey);
        //response with decoded token
        return await res.status(200).json({
          login: true,
          data: decode,
        });
      } else {
        errors = handleErrors(err);
        return res.status(404).json({ errors: "no token provided" });
      }
    } catch (err) {
      errors = handleErrors(err);
      res.status(401).json({ errors: "Login failure" });
    }
    next();
  };

  module.exports = {
    verifyToken: verifyToken
  };