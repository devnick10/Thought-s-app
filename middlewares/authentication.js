const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");


function authenticated(req,res,next) {
   let token = req.cookies.token;
   if (!token)res.redirect("/login");
   let user = jwt.verify(token,"secret");
   if (!user)res.send("invalid token");
   req.user = user;
   return next();

}

module.exports = authenticated