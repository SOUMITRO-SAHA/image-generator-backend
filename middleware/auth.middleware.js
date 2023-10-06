import JWT from 'jsonwebtoken';
import User from '../models/user.schema.js';
import config from '../config/index.js';

export const isLoggedIn = async (req, res, next) => {
  let token;

  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer'))
  ) {
    token = req.cookies.token || req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Invalid token',
    });
  }

  try {
    const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);

    //_id, find user based on id, set this in req.user
    req.user = await User.findById(decodedJwtPayload._id);
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        'Something went wrong, while fetching the user in the database. Please try again',
      error: error.message,
    });
  }
};
