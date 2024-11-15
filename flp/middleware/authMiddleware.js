import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticatefreeUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }

  try {
    const { userId, role , account} = verifyJWT(token);
    req.user = { userId, role , account};
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};


export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};