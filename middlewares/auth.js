const { validateToken } = require("../services/auth");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    try {
      if (!tokenCookieValue) {
        return next();
      }
    } catch (error) {
      console.log("in middlewares, ERROR: ", error);
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}
    return next();
  };
}

module.exports = { checkForAuthenticationCookie };
