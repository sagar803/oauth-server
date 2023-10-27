import dotenv from 'dotenv'
dotenv.config()
import passport from "passport";
import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile" , "email"] }));


router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/login" }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL);
  }
);
router.get("/login/success", (req, res) => {
    if (req.isAuthenticated()) {
      const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        token: token,
      });
    } else {
      res.status(401).json({
          success: false,
          message: 'User not authenticated'
      });
    }
});

router.get("/login/failed" , (req, res)=>{
    res.status(401).json({
        success: false,
        message: "failure",
    });
});  
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:5173/login");
});
  
export default router;