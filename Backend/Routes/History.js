const express = require('express');
const router = express.Router();
const db = require('../Database');
const fetchuser = require('../middleware/fetchtoken');
const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");

let User = db.User
let History = db.History

router.post("/SaveHistory",
body("name", "You can Use English Alphabets only in Name").isAlpha('en-US', {ignore: ' '}).isLength({ min: 5 }),
body("amount", "invaild amount").isNumeric(),
fetchuser , async (req, res) => {

	try {

			// checking user input fileds

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
			return res.status(403).json({ ValidationErrors: errors.array() , "error":"True" , "msg":" Syntax error" });
			};

			const usersId = req.data.Userinfo.id;

			const dem = await User.findOne({ where: { id: usersId } });
			if(dem.type !== "Bill-Generator"){return res.status(401).json({"error":"true","msg":"Authentication error"})}; 

			// save data of user

			const { name, amount, due , generate } = req.body;

			const billdata = { "name":name , "amount":amount, "due":due , "generate":generate  };

			await History.create(billdata);
			return res.json({ "error": "false", "msg": "Data added succesfully" });

	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	};


});


// endpoints for  get history of financial yaer 

router.post("/GetHistory",
fetchuser , async (req, res) => {

	try {
			const start_date_of_the_year = req.body.start;
			const end_date_of_the_year = req.body.end;
			const filter_stage = {
				where: {
					generate: {
					[Op.gte]: new Date(start_date_of_the_year),
					[Op.lte]: new Date(end_date_of_the_year),
				},
				},
			};
			const response = await History.findAll(filter_stage);

			if(response.length > 0 ){
				return res.json({"error":"false", response , "msg":"" });
			} else {
				return res.json({"error":"false", response , "msg":"No data avilable" });
			}


	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}

});

router.get("/LastHistory",
fetchuser , async (req, res) => {

	try {
				const response = await History.findAll({  limit: 1, order: [ [ 'createdAt', 'DESC' ]] , });
			    return res.json({"error":"false", "data": response[0] });

		} catch (error) {
			return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
		}
		
});

module.exports = router