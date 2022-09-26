const { response } = require("express");
const jwt = require("jsonwebtoken");
let jwtSecretKey = process.env.JWT_SECRET_KEY;
const { usersschema } = require("../models/users");

// const errors = {
//   login: false,
//   message: "No access rights",
//   redirect_path: "/auth/login",
// };
const errors = {};
const handleErrors = (err) => {
  //duplicate error code
  if (err.code === 11000) {
    errors.email = "This is a duplicate email address";
    return errors;
  }
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
// get key value pair from req.body

const getNested = (obj, ...args)=>{
  return obj.reduce((obj, key) => obj && obj[key], obj)
};
//update user content
const getUpdatuser =(data,bodyojb)=>{
  Object.keys(data).forEach((k) => {
    for (const [keybody, valuebody] of Object.entries(bodyojb)) {
      if (data[k][`${keybody}`]){
        data[k][`${keybody}`]=valuebody;
      }
    }
  });
    return data;
};
//authentification of user's token
const verifyToken = async (req, res, err, next) => {
  values = Object.values(req.cookies);
  token = values[0];
  console.log(token);
  if (token) {
    await jwt.verify(token, jwtSecretKey, (err, decodedToken) => {
      if (err) {
        errors = handleErrors(err);
        res.statu(404).json(errors);
      } else {
        next();
      }
    });
  } else {
    // errors["message"] = "No valide token found";
    res.statu(404).json({errors:"No valide token found"});
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
        res.status(404).json(errors);
      } else {
        req.user = await usersschema.findById(decodedToken.id);
        return next();
      }
    });
  } else {
    errors["message"] = "No valide token found";
    res.status(404).json(errors);
  }
};

module.exports = {
  verifyToken: verifyToken,
  checkUser: checkUser,
  handleErrors: handleErrors,
  getNested: getNested,
  getUpdatuser: getUpdatuser
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
