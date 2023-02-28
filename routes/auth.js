import dotenv from 'dotenv'
dotenv.config()
import passport from "passport";
import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

const CLIENT_URL = "http://localhost:5173/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      token: token,
      //   cookies: req.cookies
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
  
router.get("/google", passport.authenticate("google", { 
    scope: ["profile"] 
  })
);
  
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

/*
router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: '/login' }),
  function(req, res) {
    const {user} = req;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token, user });
    res.redirect(CLIENT_URL)
  });
*/
export default router;