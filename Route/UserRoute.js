const express =  require('express');
const router = express.Router();
const UserModel = require('../Model/User');
const bcrypt = require('bcrypt');


router.post('/', async (req, res)=>{
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await UserModel.create(req.body);
        const result = user.toJSON();
        delete result.password;
        const token =jwt.sign({id: user.id}, process.env.jwt_secret, {expiresIn: '2h'});

        res.status(200).json({
            status: 'Successful request',
            data: {user: result, token}
        })
        res.send("successfull request made");
       
    } catch (error) {
      res.status(500).json({
          status: 'Failed',
          message: 'An error occured trying to make request'
      })  
    }
    
})


router.post('/login', async (req, res)=>{
    try {
        const user = await UserModel.findOne({email:req.body.email}, '+password');

        if(!user) return res.status(401).json({status: "error", message: "Invalid  detials"});

        const ispassword = await bcrypt.compare(req.body.password, user.password);
       

        if(!ispassword) return res.json({status: 'error', message:"invalid login detials"});

        const token = jwt.sign({id: user.id}, process.env.jwt_secret);

        res.json({status: "success",data: {token}});


    } catch (error) {
        res.json({
            status:'Error',
            message:'Cannot get login name correctly'
        })
    }
});

router.get('/', async (req, res)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) return res.status(404).json({status: "error", message:"please specify a header"});

        const token = authHeader.split(' ')[1];

        const tokenData = jwt.verify(token, process.env.jwt_secret);

        const user = await UserModel.findById(tokenData.id);
       res.json({
            status: "success",
            data: user
        });

        res.json({tokenData});

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


module.exports = router;
