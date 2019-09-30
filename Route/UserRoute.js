const express =  require('express');
const router = express.Router();
const UserModel = require('../Model/User');
const bcrypt = require('bcrypt');


router.get('/', (req, res)=>{
    res.send("Successful respond")
})

router.post('/', async (req, res)=>{
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await UserModel.create(req.body);
        const result = user.toJSON();
        delete result.password;

        res.status(200).json({
            status: 'Successful request',
            data: {user: result}
        })
        res.send("successfull request made");
       
    } catch (error) {
      res.status(500).json({
          status: 'Failed',
          message: 'An error occured trying to make request'
      })  
    }
    
})


module.exports = router;