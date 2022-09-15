const { response } = require("express");
const jwt = require("jsonwebtoken");
let jwtSecretKey = process.env.JWT_SECRET_KEY;
const { usersschema } = require("../models/users");

//authentification of user's token
const verifyToken = async (req, res, err, next) => {
  values = Object.values(req.cookies);
  token = values[0];
  if (token) {
    jwt.verify(token, jwtSecretKey, (err, decodedToken) => {
      if (err) {
        res.statu(404).json({
          login: false,
          message: "No access rights",
          redirect_path: "/auth/login",
        });
      } else {
        next();
      }
    });
  } else {
    res.statu(404).json({
      login: false,
      message: "No access rights",
      redirect_path: "/auth/login",
    });
    console.log("no token found");
  }

  // try {
  //   if (token) {
  //     const decode = await jwt.verify(token, jwtSecretKey);
  //     //response with decoded token
  //     // res.status(200).json({
  //     //   login: true,
  //     //   data: decode,
  //     // });
  //     return next();
  //   } else {
  //     errors = handleErrors(err);
  //    res.status(404).json({errors:"no token provided", redirect_path: "/auth/login"});
  //   }
  // } catch (err) {
  //   errors = handleErrors(err);
  //   res.status(404).json({ errors: "You are not authorised to login" , redirect_path: "/auth/login"});
  // }
};
const checkUser = async (req, res, next) => {
  values = Object.values(req.cookies);
  token = values[0];
  if (token) {
    jwt.verify(token, jwtSecretKey, async (err, decodedToken) => {
      if (err) {
        res.statu(404).json({
          login: false,
          message: "No access rights",
          redirect_path: "/auth/login",
        });
      } else {
        let user = await usersschema.findById(decodedToken.id);
        next();
      }
    });
  } else {
    res.statu(404).json({
      login: false,
      message: "No access rights",
      redirect_path: "/auth/login",
    });
    console.log("no token found");
  }
};

module.exports = {
  verifyToken: verifyToken,
  checkUser: checkUser,
};



// const checkRootLogin = async (req, res, next) => {
//   try {
//       const token = req.header('Authorization').replace('Bearer ', '');
//       // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const decoded = jwt.verify(token, "test");

//       const rootUser = await RootUser.findOne({_id: decoded._id, 'tokens.token': token});

//       if (!rootUser) {
//           throw new Error("User cannot find!!");
//       }

//       req.token = token;
//       req.rootUser = rootUser;
//       req.userID = rootUser._id;
//       next()
//   } catch (e) {
//       res.status(401).send({error: 'Authentication problem!!'})
//   }
// };