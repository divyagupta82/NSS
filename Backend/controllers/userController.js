
const User=require('../models/User');
const Request=require('../models/helpReq');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const upload=require('../middleware/multer');
const uploadOnCloudinary = require('../utils/cloudnary');


const registerController = async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        if(!username || !email || !password){
            return res.status(400).json({message:'Please fill all fields'});
        }
        const isUserExists=await User.findOne({email});
        if(isUserExists){
            return res.status(400).json({message:'User already exists'});
        }
        const newUser=new User({
            username,
            email,
            password,
        });
        await newUser.save();
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(201).json({message:'User created successfully',token});
    }catch(e){
        console.log(e);
        res.status(500).json({message:'Internal server error'});
    }
};


const loginController = async(req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:'Please fill all fields'});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).json({message:'Login successful',token});
    }catch(e){
        console.log(e);
        res.status(500).json({message:'Internal server error'});
    }
};

const reqHelpController =  async (req, res) => {
//    console.log(req.body);
//     console.log(req.file);
    try {
        const { name, regno, email, phnno, typeOfHelp, description } = req.body;

        // Check if all fields are provided
        if (!name || !regno || !email || !phnno || !typeOfHelp || !description) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        // Upload image to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(req.file.buffer);

        if (!cloudinaryResponse) {
            return res.status(500).json({ message: 'Error uploading image' });
        }

        // Save request in the database with Cloudinary URL
        const newRequest = new Request({
            name,
            regno,
            email,
            phnno,
            typeOfHelp,
            img: cloudinaryResponse.secure_url, // Store Cloudinary URL instead of local file path
            description
        });

        await newRequest.save();
        res.status(201).json({ message: 'Request created successfully', data: newRequest });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};





module.exports={
    registerController,
    loginController,
    reqHelpController
};  