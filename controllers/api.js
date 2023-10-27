import User from "../models/User.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({
            email, 
            password
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const login = async ( req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({email:email});
        if (!user) return res.status(400).json({ msg: "User does not exist. " });
        
        const isMatch = (user.password === password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}