const express = require("express");
const db = require('../Database');
const router = express.Router();
const fetchuser = require('../middleware/fetchtoken');

let User = db.User

    // fetch all departmet users

    
    router.get("/fetchDepartments", fetchuser , async (req, res) => {
        try {

          const userid = req.data.Userinfo.id;

          const dem = await User.findOne({ where: { id: userid } });
          if(dem.type === "User"){return res.status(401).json({"error":"true","msg":"Authentication error"})};    
  
          let users = await User.findAll({ where: { type: "User" } , attributes: { exclude: ['password'] } });
          if (users.length > 0) {  
            res.json(users);
          }else{
            return res.json({"error":"false","msg":"No Data Available"});
          }
            
        } catch (error) {
          return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
        }
      });


    
// endpoints for updates a notes data


router.put('/UpdateDepartment/:id', fetchuser , async (req, res)=>{
    try {
    
      const { name , phone , password , email , load , age , type , branch } = req.body;
      const NewUser = {};
      if(name){NewUser.name = name.toUpperCase()};
      if(branch){NewUser.branch = branch.toUpperCase()};
      if(phone){NewUser.phone = phone};
      if(type){NewUser.type = type};
      if(email){NewUser.email = email.toLowerCase()};
      if(load){NewUser.load = load}
      if(age){NewUser.age = age }

      //  create password hash

      if(password){
        await bcrypt.genSalt(10, async function (err, salt) {
          await bcrypt.hash( password , salt, async function (_err, hash) {
            NewUser.password = hash
           })
        });
      };

      const userId = req.params.id;
      const userid = req.data.Userinfo.id;

      const dem = await User.findOne({ where: { id: userid } });
      if(dem.type === "User"){return res.status(401).json({"error":"true","msg":"Authentication error"})};
  
      let Data = await User.update( NewUser, {
        where: {
          id: userId
        }
      });
  
      if(!Data){return res.status(403).json({"error":"true","msg":"the Data you want to Update is Invaild"})}
  
      return res.json({"error":"false","msg":"Data updated succesfully"});
        
    } catch (error) {
      console.log(error)
      return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
    }
  });
  
  
  
  // endpoints for Delete a notes data
  
  router.delete('/deleteDepartments/:id', fetchuser , async (req, res)=>{
    try {
      const userid = req.data.Userinfo.id;
      const userId = req.params.id;
  
      const dem = await User.findOne({ where: { id: userid } });
      if(dem.type === "User"){return res.status(401).json({"error":"true","msg":"Authentication error"})};
      
      const check = await User.findOne({ where: { id: userId } });
      if(!check){return res.status(409).json({"error":"true","msg":"Invalid Note"})}
  
  
  
      await User.destroy({ where: { id: userId } });
      return res.json({"error":"false","msg":"Data removed succesfully"});
    
    } catch (error) {
      return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
    }
  });
  
  
  
  
module.exports = router;
  