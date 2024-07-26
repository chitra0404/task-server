const User=require("../Model/UserModel");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken")

module.exports.getUser=async(req,res)=>{
    try{
        const user=await User.find({})
        res.status(200).json({message:user})
    }
    catch(err){
        res.status(500).send({message:err})
    }
}


module.exports.Register=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const emailexist=await User.findOne({email:req.body.email})
        if(emailexist){
            res.status(400).json({status:"400",message:"user already exist"})
        
        return;
        }
    
  
    const hashedpassword=await bcrypt.hash(password,10);
    const user=new User({name,email,password:hashedpassword,role})

   

    const token = jwt.sign({userId:user._id,role:user.role}, process.env.SECRET, { expiresIn: '1h' });

    
    await user.save();
    res.status(200) .header("Bearer").json({token:token});
    }
    catch(err){
        console.error('Error signing up user', err);
        return res.status(400).json({ Message: "Internal server error" })
    }
}
module.exports.Login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(409).json({message:"authentication failed"});
    }
        const passwordmatch=await bcrypt.compare(password,user.password);
        if(!passwordmatch){
            return res.status(409).json({message:"invalid password"}); }
            if (user && passwordmatch) {
               console.log(user.role) 
                const token = jwt.sign( { userId:user._id,role:user.role }, process.env.SECRET, { expiresIn: '1h' });

                res.json({
                 
                  
                  email: user.email,
                  role:user.role,
                 token:token
                })}
            else{
                return res.status(400).json({ message: 'invalid password' });
            }
    
}

module.exports.adduser=async(req,res)=>{
    
        const { name, email, password, role } = req.body;
        try {
            const newUser = new User({
                name,
                email,
                password,
                role
            });
    
            await newUser.save();
            res.status(200).json(newUser);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
}
 module.exports.deleteUser=async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
 }