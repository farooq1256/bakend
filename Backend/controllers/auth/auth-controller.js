import bcrypt  from "bcryptjs";
import  jwt from "jsonwebtoken";
import User from "../../models/user.js";

//register controller

const registerUsers = async (req, res) => {
  const { userName, email, password } = req.body;
  try {

    const checkUser = await User.findOne({email})
    if(checkUser) return res.json({success: false, message:"User already exit. please login"})

    
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login controller


const loginUsers = async (req, res) => {
  const { email, password } = req.body;
  try {

    const checkUser = await User.findOne({email})
    if(!checkUser) 
      return res.json({
    success: false, 
    message:"User doesnot exit. please register first"
  })
const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)
  if (!checkPasswordMatch)
    return res.json({
  success: false, 
    message:"Your passward is incorrect."
    })

    const token = jwt.sign({
      id : checkUser._id, role : checkUser.role, email : checkUser.email, password : checkUser.password
    },'CLIENT_SECRET_KEY',{expiresIn : '60mins'})

    res.cookie("token", token, {httpOnly : true, secure : false}).json({
success: true,
message: "Logged in successfully",
user:{
  email: checkUser.email,
  role: checkUser.role,
  id: checkUser._id,
}
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// logout controllers
const logoutUsers = (req,res) =>{
  res.clearCookie("token").json({
success: ture,
message:"Loged out successfully! "
})
}

//auth middleware
const authMiddleware = async(req,res,next)=>{
  const token = req.cookies.token;
  if(!token) return res.status(401).json({
    success : false,
    message :'Unauthorised user!'
  })

  try{
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
    req.user = decoded;
    next()
  }catch(error){
    res.status(401).json({
    success : false,
    message :'Unauthorised user!'
    })
  }
}

export {registerUsers ,loginUsers,logoutUsers,authMiddleware};