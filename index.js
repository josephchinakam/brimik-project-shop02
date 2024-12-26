const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const path = require("path");
const bodyParser = require('body-parser')
const fsextra = require('fs-extra');
const pg = require('pg');
const moment = require('moment');
const fs = require("fs");



const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))



const uri = 'mongodb+srv://brimikshop02:lti3P5T2ywjcA08O@brimikdatabase.ng5tw.mongodb.net/?retryWrites=true&w=majority&appName=brimikdatabase'

mongoose.connect(uri);


// seeting routes


app.post("/user/update", (req, res) => {

	upload(req, res, (err) => {

		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json({status: 200});
	})

});


const str = new mongoose.Schema({
	data: {type: String, required: true},
	username: {type: String, required: true}
});


const Data = new mongoose.model("Str", str);

// classes internal


class StaffClass{
	constructor(name, username, phone, password, position){
 
 			this.username =  username;
 			this.name =  name;
 			this.position =  position;
 			this.phone =  phone;
 			this.password = password;
	}
}

class CategoryClass{
	constructor(name){
 			this.name =  name;
	}
}


class ExpenseClass{
	constructor(name, quantity, cost, date){

	this.name = name;
	this.quantity = quantity;
	this.cost = cost;
	this.date = date;

	}
}


class ExpensedataClass{
	constructor(month, total){
		this.day = month;
		this.total = total;		
	}
}


class LogsClass{
	constructor(username, action, time){

		this.action = action;
		this.username = username;
		this.time = time == undefined ? new moment().format("DD-MM-YYYY"): time;

	}
}

class ProductClass{
	constructor(name, isPromotion, price, quantity, pic, category, description, costprice, sold, infinite){

			this.name = name ;
			this.id = "" ;
			this.isPromotion = isPromotion ;
			this.price = price ;
			this.quantity = quantity;
			this.pic = "" ;
			this.category = category ;
			this.description = description ;
			this.costprice = costprice ;
			this.ratio = null ;
			this.sold = sold ;
			this.infinite= infinite;
	}
}

class ReportClass{
	constructor(topic, description){
	this.topic = topic;
	this.description = description;		
	}
}


class RequestClass{
	constructor(topic, description){

	this.topic = topic;
	this.description = description;		
	}
}


class SaleClass{
	constructor(name, quantity, cost, date, orderid){

		this.name = name;
		this.quantity = quantity;
		this.cost = cost;
		this.date = date;
		this.orderid = orderid;
	}
}

class SalesdataClass{
	constructor(day, total){

		this.day = day;
		this.total = total;

	}
}

class YeardataClass{
	constructor(month, total){

	this.month = month;
	this.total = total;

	}
}

class YearexpdataClass{
	constructor(month, total){
	this.month = month;
	this.total = total;		
	}
}


// antd the end here..



function createToClasses(inst, type, obj, product, staff, sales, logs, 
	expense, report, request, saledata, expensedata, yeardata, yearexpdata, category) {

	const array = obj.split(",");

	var object = null;

	switch(type){
			case "category":
				array[1] === undefined ? object = null : object = new CategoryClass(inst+"@"+array[1]);
				object === null ? object = null : category.push(new CategoryClass(array[1]));
				break;

			case "expense":
				array[1] === undefined ? object = null : object = new ExpenseClass(inst+"@"+array[1], array[2], array[3], array[4]);
				object === null ? object = null : expense.push(object);
				break;

			case "expensedata":
				array[1] === undefined ? object = null : object = new ExpensedataClass(inst+"@"+array[1], array[2]);
				object === null ? object = null : expensedata.push(object);
				break;				

			case "logs":
				array[1] === undefined ? object = null : object = new LogsClass(inst+"@"+array[1], array[2], array[3], array[4]);
				object === null ? object = null : logs.push(object);
				break;	

			case "product":
				array[1] === undefined ? object = null : object = new ProductClass(inst+"@"+array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10]);
				object === null ? object = null : product.push(object);
				break;

			case "report":
				array[1] === undefined ? object = null : object = new ReportClass(inst+"@"+array[1], array[2]);
				object === null ? object = null : report.push(object);
				break;

			case "request":
				array[1] === undefined ? object = null : object = new RequestClass(inst+"@"+array[1], array[2]);
				object === null ? object = null : request.push(object);
				break;

			case "sale":
				array[1] === undefined ? object = null : object = new SaleClass(inst+"@"+array[1], array[2], array[3], array[4]);
				object === null ? object = null : sales.push(object);
				break;


			case "saledata":
				array[1] === undefined ? object = null : object = new SalesdataClass(inst+"@"+array[1], array[2]);
				object === null ? object = null : saledata.push(object);
				break;


			case "staff":
				array[1] === undefined ? object = null : object = new StaffClass(inst+"@"+array[1], array[2], array[3], array[4], array[5]);

				if (array[1]=== "Admin" || object === null) {

				}else{
				 	staff.push(object);
				}

				break;

			case "yeardata":
				array[1] === undefined ? object = null : object = new YeardataClass(inst+"@"+array[1], array[2]);
				object === null ? object = null : yeardata.push(object);
				break;

			case "yearexpdata":
				array[1] === undefined ? object = null : object = new YearexpdataClass(inst+"@"+array[1], array[2]);
				object === null ? object = null : yearexpdata.push(object);
				break;

	}


	return object
}


 //clearAll();

app.post('/browse/init', async(req, res) =>{

		const{created, updated, deleted, username} = req.body;

		console.log(username);

		if (created != undefined && created != null && created != "") {

			const data = await Data.create({data: "create@"+created, username: username});

		}

		if (updated!= undefined && updated!= null && updated!= "") {
			const data = await Data.create({data: "update@"+updated,  username: username});
			await data.save();

		}

		if (deleted != undefined && deleted != null && deleted != "") {
			const data = await Data.create({data: "delete@"+deleted,  username: username});
			await data.save();
		}



		return res.status(200).json({
			status: 200
		})


	});



app.post('/browse/get/database', async(req, res) =>{

		const{lastid, username} = req.body;

		const data = await Data.find({});

		  var unfiltered = [];

		  var id = 0


			const product = [];
			const staff = [];
			const sales = [];
			const logs = [];
			const expense = [];
			const reports = [];
			const requests = [];
			const saledata = [];
			const expensedata = [];
			const yeardata = [];
			const yearexpdata = [];
			const category = [];



		  if (data.length > 0) {id = data[data.length-1].id;}

		  var lastupdateindex = -1;
		  var gg = 0

		  var filtered = [];

		  data.forEach(item => {
		  		item.id === lastid ? lastupdateindex = data.indexOf(item) : gg = -1;
		  });


		  for (var i = lastupdateindex + 1; i < data.length; i++) {
		  	  unfiltered.push(data[i]);
		  }

		  unfiltered.forEach(item =>{
		  		item.username != username ? filtered.push(item) : gg = 0;
		  })

		 const datums = [];

		  filtered.forEach(item =>{
		  		datums.push(item.data);
		  });

		  for(let v of datums){


		  		var status = v.split("@")[0];

		  		var table = v.split('@')[1].split(":")[0];
		  		var tablerows =  v.split('@')[1].split(":")[1];
		  		var rows = tablerows.split("=");
		  		rows.forEach(async item =>{
					await createToClasses(status, table, item, product, staff, sales, logs, 
						expense, reports, requests, saledata, expensedata, yeardata, yearexpdata, category);		  			
		  		});


		  }


		return res.status(200).json({
			status: 200, id,
				product,staff,sales,logs,expense,reports,requests,saledata,expensedata,yeardata,yearexpdata,category
		})


	});


app.post('/browse/clear', async(req, res) =>{

		async function clearAll() {
			await Data.deleteMany();
		}


		return res.status(200).json({
			status: 200
		})


	});





app.listen(3000, () =>{
 	console.log("Server started on port 3000...");
 });
