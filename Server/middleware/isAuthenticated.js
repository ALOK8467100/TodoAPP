import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token)
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'user not Authenticated, Authentication failed' 
      });
    }
    console.log("JWT_SECRET:", process.env.SECRET_KEY);

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if(!decode){
      return res.status(401).json({
        success: false,
        message: 'invalid token, Authentication failed'
      })
    }
    console.log(decode)
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error)
  }
}

export default isAuthenticated;