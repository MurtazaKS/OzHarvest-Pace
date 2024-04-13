const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET

const getTokenFrom = request => {
  if(request.cookies.token !== undefined) {
    console.log(request.cookies.token)
    return request.cookies.token
  }
  const authorization = request.get('authorization') 
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) { 
    return authorization.substring(7)  
  }  
  return null
}

const auth = (req, res, next) => {
  const token = getTokenFrom(req)
  if (!token) {
    req.user = null;
    next();
  } else {
    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded.user;
      next();
    } catch (e) {
      if(e instanceof jwt.TokenExpiredError) {
        res.clearCookie("token");
        return res.status(403).json({
          errors: [{
            status: "AUTH_ERROR",
            msg: "Signin Token Expired"
          }]
        })
      } else {
        res.clearCookie("token");
        return res.status(403).json({
          errors: [{
            status: "AUTH_ERROR",
            msg: "Signin Token Invalid"
          }]
        })
      }
    }
  }
};

module.exports = {auth};
