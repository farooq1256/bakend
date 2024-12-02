import  express  from "express";
import  {registerUsers,
    loginUsers,
    authMiddleware,
    logoutUsers
} from "../../controllers/auth/auth-controller.js";


const router = express.Router();

router.post("/register", registerUsers);
router.post("/login", loginUsers);
router.post("/logout", logoutUsers);
router.get('/check-auth',authMiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({
success : true,
message :'Authenticated  user!',
user
 })
})

export default router;
