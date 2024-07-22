var jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You're not authorize",
    });
  }
  // console.log("token here: " + token)
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin' || req.user.role === 'user' || req.user.role === 'teacher') {
      next()
    }
    else {
      return res.status(401).json({
        success: false,
        message: "You're not authenticated"
      })
    }
  })
}

const verifyTeacher = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin" || req.user.role === "teacher") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You're not authorize",
      });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You're not authorize",
      });
    }
  });
};

const verifyToken2 = (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You're not authorize",
    });
  }
  // console.log("token here: " + token)
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    req.user = user;
    next();
  });
};



module.exports = {
  verifyToken,
  verifyUser,
  verifyTeacher,
  verifyAdmin,
  verifyToken2
  
};
