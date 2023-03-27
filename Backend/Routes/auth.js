const express = require("express");
const router = express.Router();
const db = require('../Database');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const fetchuser = require('../middleware/fetchtoken');
var jwt = require("jsonwebtoken");
const JWT_SECRET = 'j@shan';

let User = db.User

router.post(
      "/Register",
   body("email", "Enter a vaild email").isEmail(),
   body("password", "password should be atleast 5 length").isLength({ min: 5 }),
   body("branch", "name min 3 length").isLength({ min: 3 }),
   body("name", "name min 3 length").isLength({ min: 3 }).isAlpha('en-US', {ignore: ' '}),
   body("type", "Invaild type").isLength({ min: 3 }),
   body("phone", "Invaild Phone number").isLength({ min:10, max:10 }).isNumeric().isMobilePhone(),
   body("load", "Invaild load").isNumeric(),
   body("age", "Invaild age").isNumeric(),
   fetchuser,
   async (req, res) => {

   try {

          // checking user input fileds

          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(403).json({ ValidationErrors: errors.array() , "error":"True" , "msg":"Syntax error" });
          }

          
      const userid = req.data.Userinfo.id;
      const dem = await User.findOne({ where: { id: userid } });
      if(dem.type === "User"){return res.status(401).json({"error":"true","msg":"Authentication error"})};

          // checking user allready exist or not

      const finduserexist = await User.findOne({ where: { email: req.body.email } } );
      if (finduserexist) {
        return res.status(409).json({"error":"Ture","msg":"sorry user with this email already exist" });
      }

      // hashing password

      await bcrypt.genSalt(10, async function (err, salt) {
        await bcrypt.hash(req.body.password, salt, async function (_err, hash) {

          // Store hash in your password DB.
          
          const user = await User.create({
              branch : req.body.branch.toUpperCase() ,
              name : req.body.name.toUpperCase() ,
              phone : req.body.phone ,
              password : hash,
              email : req.body.email.toLowerCase() ,
              type: req.body.type,
              load: req.body.load,
              age: req.body.age,
          });

          // create token for a user

          const data = {
            Userinfo: {
              id: user.id,
            },
          };
          const token = jwt.sign(data, JWT_SECRET);
          res.json({ "error" : "false" });
        });
      });   
     } catch (error) {
      return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
   }
  });



// login endpoints

router.post(
   "/Login",
   body("email", "Enter a vaild email").isEmail(),
   body("password", "password should be atleast 5 length").isLength({ min: 5 }),
   async (req, res) => {
     try {
 
       // checking user input fileds
 
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(403).json({ ValidationErrors: errors.array() , "error":"True" , "msg":"Syntax error" });
       }
 
       // checking user exist or not
 
       let { email, password } = req.body;
       email = email.toLowerCase()
 
       const Userinfo = await User.findOne({ where: { email } });
       if (!Userinfo) {
         return res.status(403).json({"error":"Ture","msg":"sorry user with this email can't exist" });
       }
 
       //  checking password
 
       const match = await bcrypt.compare( password, Userinfo.password);
           if (!match) {
             return res.status(403).json({"error":"Ture","msg":"password incorrect" });
           }
 
       // create token for a user
 
       const data = {
         Userinfo: {
           id: Userinfo.id
         }
       };
       const token = jwt.sign(data, JWT_SECRET);
       res.json({ "error" : "false" , token , "type" : Userinfo.type });
     } catch (error) {
       return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
     }
   }
 );
 
 
 // let user loged in authication  
 
 router.get("/Authication", fetchuser , async (req, res) => {
     try {
       const userid = req.data.Userinfo.id
       const user = await User.findOne({ where: { id:userid } ,  attributes: { exclude: ['password'] } })
       res.json({ "error" : "false" , user })
 
     } catch (error) {
       return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
     }
 
   });
 
   
 
module.exports = router;