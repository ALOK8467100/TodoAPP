import { User } from "../modals/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// Now we will create a controller for REGISTER
export const register = async (req,res) => {
  try {
    const {fullName, email, password} = req.body;
    console.log(fullName, email, password)
    if(!fullName || !email || !password){
      return res.status(400).json({
        success:false,
        message: 'Please provide all fields'
      })
    }
    // Here we find that User is regstered with this User ID or Not.
    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({
        success:false,
        message: 'This email ID is already registered'
      })
    }
    const hashPassword = await bcrypt.hash(password,10);
    await User.create({
      fullName,
      email,
      password:hashPassword
    })
    return res.status(201).json({
      success:true,
      message: 'Account created successfully'
    })
  } catch (error) {
    console.log(error)
  }
}



// Now we will create a controller for LOGIN
export const login = async (req,res) => {
  try {
    const {email, password} = req.body;
    console.log(email, password)
    if(!email || !password){
      return res.status(400).json({
        success:false,
        message: 'Please provide all fields'
      })
    }

    // Now here we find that user is registered with this email or not.
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        success:false,
        message: 'Incorrect email or password',
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
      return res.status(400).json({
        success:false,
        message: 'Incorrect email or password',
      });
    }

    // now passing token in the response

    const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn: '1d'});
    return res
    .status(200)
    .cookie("token", token, {
      httpOnly:true, 
      sameSite:"strict", 
      maxAge: 24 * 60 * 60 * 1000
    })
    .json({
      success:true,
      message: `Login Successfully Welcome Back ${user.fullName} `,
    })
  } catch (error) {
    console.log(error)
  }
}


// Now we will create a controller for LOGOUT

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", {maxAge: 0})
    .json({
      success:true,
      message: 'Logout Successfully'
    })
  } catch (error) {
    console.log(error)
  }
}