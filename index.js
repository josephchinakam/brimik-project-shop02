const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const path = require("path");
const bodyParser = require('body-parser')
const fsextra = require('fs-extra');
const moment = require('moment');
const fs = require("fs");


const Category = require("./category");
const Expensedata = require("./expensedata");
const Expenses = require("./expenses");
const Logs = require("./logs");
const Orderitems = require("./orderitems");
const Product = require("./product");
const Report = require("./report");
const Request = require("./request");
const Staff = require("./staff");
const Saledata = require("./saledata");
const Sales = require("./sales");
const Yeardata = require("./yeardata");
const Yearexpdata = require("./yearexpdata");
const DeletedData = require("./deleteddata");


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



// classes internal


class StaffClass{
	constructor(name, username, phone, password, position, globalid){
 
 			this.username =  username;
 			this.name =  name;
 			this.position =  position;
 			this.phone =  phone;
 			this.password = password;
 			this.globalid = globalid;
	}
}

class CategoryClass{
	constructor(name, globalid){
 			this.name =  name;
 			this.globalid = globalid;
	}
}


class ExpenseClass{
	constructor(name, quantity, cost, date, globalid){

		this.name = name;
		this.quantity = quantity;
		this.cost = cost;
		this.date = date;
		this.globalid = globalid;

	}
}


class ExpensedataClass{
	constructor(month, total, globalid){
		this.day = month;
		this.total = total;	
		this.globalid = globalid;	
	}
}


class LogsClass{
	constructor(username, action, time, globalid){

		this.action = action;
		this.username = username;
		this.time = time == undefined ? new moment().format("DD-MM-YYYY"): time;
		this.globalid = globalid;

	}
}

class ProductClass{
	constructor(name, isPromotion, price, quantity, pic, category, description, costprice, sold, infinite, globalid){

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
			this.globalid = globalid;
	}
}

class ReportClass{
	constructor(topic, description, globalid){
		this.topic = topic;
		this.description = description;	
		this.globalid = globalid;	
	}
}


class RequestClass{
	constructor(topic, description, globalid){
		this.topic = topic;
		this.description = description;	
		this.globalid = globalid;	
	}
}


class SaleClass{
	constructor(name, quantity, cost, date, orderid, globalid){

		this.name = name;
		this.quantity = quantity;
		this.cost = cost;
		this.date = date;
		this.orderid = orderid;
		this.globalid = globalid;
	}
}

class SalesdataClass{
	constructor(day, total, globalid){

		this.day = day;
		this.total = total;
		this.globalid = globalid;

	}
}

class YeardataClass{
	constructor(month, total, globalid){

		this.month = month;
		this.total = total;
		this.globalid = globalid;

	}
}

class YearexpdataClass{
	constructor(month, total, globalid){
	this.month = month;
	this.total = total;	
	this.globalid = globalid;	
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
				object === null ? object = null : category.push(new CategoryClass(object));
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



app.post('/browse/product', async(req, res) =>{

		const{name, ispromotion, price, quantity, pic, 
				category, description, costprice, sold, infinite, globalid} = req.body;

		if (globalid == "") {
			return res.status(300);
		}

		if (name == undefined || ispromotion == undefined || price == undefined || quantity == undefined || 
				category == undefined || description == undefined || costprice == undefined || sold == undefined || 
				infinite == undefined || globalid == undefined) {


			return res.status(300).json({
				status: 200
			})

		}

		const product = await Product.findOne({globalid: globalid});

		if (product != null) {

			await Product.updateOne({globalid: globalid}, {name : name, ispromotion : ispromotion,  price : price,  quantity : quantity, 
															category : category,  description : description,  costprice : costprice,  sold : sold, 
															infinite : infinite});
		}else{

			await Product.create({
						name : name,
						ispromotion : ispromotion, 
						price : price, 
						quantity : quantity, category : category, 
						description : description, 
						costprice : costprice, 
						sold : sold, 
						infinite : infinite,
						globalid: globalid			
			});

		}





		return res.status(200).json({
			status: 200,
			id: globalid
		})


	});


app.post('/browse/category', async(req, res) =>{

		const{name, globalid} = req.body;

		if (globalid == "" || globalid == null) {
			return res.status(300);
		}

		if (name == undefined || globalid == undefined) {
			return res.status(300).json({
				status: 200
			})
		}

		const category = await Category.findOne({globalid: globalid});

		if (category != null) {

			await Category.updateOne({globalid: globalid}, {name: name});
		}else{

			await Category.create({name: name, globalid: globalid});

		}

		return res.status(200).json({
			status: 200,
			id: globalid
		})


	});



app.post('/browse/expensedata', async(req, res) =>{

		const {day, total, globalid} = req.body;


		if (globalid == "" || globalid == null) {
			return res.status(300);
		}


		if (day == undefined || total == undefined || globalid == undefined) {
			return res.status(300).json({
				status: 200
			})
		}

		const expensedata = await Expensedata.findOne({globalid: globalid});

		if (expensedata != null) {

			await Expensedata.updateOne({day: day}, {total: total});
		}else{

			await Expensedata.create({day: day, total: total, globalid: globalid});

		}

		return res.status(200).json({
			status: 200,
			id: globalid
		})


	});



app.post('/browse/expense', async(req, res) =>{

		const {name, quantity, cost, date, globalid} = req.body;

		if (globalid == "" || globalid == null) {
			return res.status(300);
		}

		if (name == undefined || quantity == undefined || cost == undefined || date == undefined || globalid == undefined) {
			return res.status(300).json({
				status: 200
			})
		}


		const expense = await Expenses.findOne({globalid: globalid});

		if (expense != null) {

			await Expenses.updateOne({globalid: globalid}, {name : name, quantity : quantity, cost : cost, date : date});

		}else{

			await Expenses.create({name : name, quantity : quantity, cost : cost, date : date, globalid :globalid});

		}

		return res.status(200).json({
			status: 200,
			id: globalid
		})


	});


app.post('/browse/logs', async(req, res) =>{

		const {username, action, time} = req.body;


		if (username == undefined || action == undefined ||  time == undefined) {
			return res.status(300).json({
				status: 200
			})

		}


		await Logs.create({username: username, action: action, time: time});

		return res.status(200).json({
			status: 200,
		})


	});



app.post('/browse/orderitems', async(req, res) =>{

		const {orderid, name, price, quantity, globalid} = req.body;


		if (orderid == undefined || name == undefined || price == undefined || quantity == undefined || globalid == undefined) {

			return res.status(300).json({
				status: 200
			})

		}

		const orderitems = await Orderitems.find({globalid: globalid});

		if (orderitems != null) {

				return res.status(200).json({
					id: globalid,
					status: 200
				})

		}else{

			await Orderitems.create({orderid : orderid, name : name, price : price, quantity : quantity, globalid : globalid});

		}


		return res.status(200).json({
			status: 200,
			id: globalid
		})


	});


app.post('/browse/report', async(req, res) =>{

		const {topic, description, globalid} = req.body;


		if (globalid == "" || globalid == null) {
			return res.status(300);
		}

		if (topic == undefined || description == undefined || globalid == undefined) {

			return res.status(300).json({
				status: 200
			})

		}

		const report = await Report.findOne({globalid: globalid});

		if (report != null) {

				return res.status(200).json({
					id: globalid,
					status: 200
				})

		}else{

			await Report.create({topic : topic, description : description, globalid : globalid});

		}


		return res.status(200).json({
			status: 200,
			id: globalid
		})


	});


app.post('/browse/request', async(req, res) => {

		const {topic, description, globalid} = req.body;

		if (globalid == "" || globalid == null) {
			return res.status(300);
		}

		if (topic == undefined || description == undefined || globalid == undefined) {

			return res.status(300).json({
				status: 200
			})

		}

		const request = await Request.findOne({globalid: globalid});

		if (request != null) {

				return res.status(200).json({
					id: globalid,
					status: 200
				})

		}else{
			await Request.create({topic : topic, description : description, globalid : globalid});
		}


		return res.status(200).json({
			status: 200,
			id: globalid
		})

	});


app.post('/browse/salesdata', async(req, res) => {

		const {day, total, globalid} = req.body;

		if (globalid == "" || globalid == null) {
			return res.status(300);
		}


		if (day == undefined || total == undefined || globalid == undefined) {
			return res.status(300).json({
				status: 200
			});
		}

		const saledata = await Saledata.findOne({globalid: globalid});

		if (saledata != null) {

				return res.status(200).json({
					id: globalid,
					status: 200
				})

		}else{
			await Saledata.create({day : day, total : total, globalid : globalid});
		}


		return res.status(200).json({
			status: 200,
			id: globalid
		})

	});


app.post('/browse/sales', async(req, res) => {

		const {name, cost, quantity, date, orderid, globalid} = req.body;

		if (globalid == "" || globalid == null) {
			return res.status(300);
		}

		if (name == undefined || cost == undefined || quantity == undefined || 
			date == undefined || orderid == undefined || globalid == undefined) {

			return res.status(300).json({
				status: 200
			})

		}


		const sale = await Sales.findOne({globalid: globalid});

		if (sale != null) {

				return res.status(200).json({
					id: globalid,
					status: 200
				})

		}else{
			await Sales.create({name : name, cost : cost, quantity : quantity, date : date, orderid : orderid, globalid : globalid});
		}


		return res.status(200).json({
			status: 200,
			id: globalid
		})

	});


app.post('/browse/staff', async(req, res) => {

		const {name, username, phone, password, position, globalid} = req.body;


		if (globalid == "" || globalid == null) {
			return res.status(300);
		}

		if (name == undefined || username == undefined || phone == undefined || 
			password == undefined || position == undefined || globalid == undefined) {

			return res.status(300).json({
				status: 200
			})

		}

		const staff = await Staff.findOne({globalid: globalid});

			if (staff != null) {

				await Staff.updateOne({globalid: globalid}, {name: name, username: username,  phone: phone, password: password, position: position});

			}else{
				await Staff.create({name: name, username: username,  phone: phone, password: password, position: position, globalid: globalid});
			}



		return res.status(200).json({
			status: 200,
			id: globalid
		})

	});


app.post('/browse/yeardata', async(req, res) => {

		const {month, total, globalid} = req.body;

		if (globalid == "" || globalid == null) {
			return res.status(300);
		}

		if (month == undefined || total == undefined || globalid == undefined) {

			return res.status(300).json({
				status: 200
			})

		}

		const yeardata = await Yeardata.findOne({month: month});

		if (yeardata != null) {

			await Yeardata.updateOne({globalid: globalid}, {total: total});

		}else{
			await Yeardata.create({month: month, total: total, globalid, globalid});
		}


		return res.status(200).json({
			status: 200,
			id: globalid
		})

	});


app.post('/browse/yearexpdata', async(req, res) => {

		const {month, total, globalid} = req.body;

		if (globalid == "" || globalid == null) {
			return res.status(300);
		}

		if (month == undefined || total == undefined || globalid == undefined) {

			return res.status(300).json({
				status: 200
			})

		}


		const yearexpdata = await Yearexpdata.findOne({month: month});

		if (yearexpdata != null) {

			await Yearexpdata.updateOne({globalid: globalid}, {total: total});

		}else{
			await Yearexpdata.create({month: month, total: total, globalid: globalid});
		}


		return res.status(200).json({
			status: 200,
			id: globalid
		})

	});


app.post('/browse/deleted', async(req, res) => {

		const {type, globalid} = req.body;


			if (type == undefined || globalid == undefined) {

				return res.status(300).json({
					status: 200
				})

			}

			const deleteddata = await DeletedData.findOne({type: type, globalid: globalid});

			if (deleteddata != null) {

			}else{
				await DeletedData.create({type: type, globalid: globalid});
			}


		return res.status(200).json({
			status: 200,
			id: globalid
		})

	});


app.get('/browse/check', async(req, res) => {

		return res.status(200).json({
			status: 200,
			id: "0000"
		})

	});




app.post('/browse/get/database', async(req, res) =>{

		const{username} = req.body;

		const product = await Product.find({});
		const category = await Category.find({});
		const sales = await Sales.find({});
		const logs = await Logs.find({time: new moment().format("DD-MM-YYYY"), username : !username});
		const expense = await Expenses.find({});
		const reports = await Report.find({});
		const requests = await Request.find({});
		const saledata = await Saledata.find({});
		const expensedata = await Expensedata.find({});
		const yeardata = await Yeardata.find({});
		const yearexpdata = await Yearexpdata.find({});
		const staff = await Staff.find({});

		return res.status(200).json({
			status: 200, id: "00",
				product,staff,sales,logs,expense,reports,requests,saledata,expensedata,yeardata,yearexpdata,category
		})


	});


app.post('/browse/clear', async(req, res) =>{


		await Product.deleteMany({});
		await Category.deleteMany({});
		await Sales.deleteMany({});
		await Logs.deleteMany({});
		await Expenses.deleteMany({});
		await Report.deleteMany({});
		await Request.deleteMany({});
		await Saledata.deleteMany({});
		await Expensedata.deleteMany({});
		await Yeardata.deleteMany({});
		await Yearexpdata.deleteMany({});

		return res.status(200).json({
			status: 200
		})


	});





app.listen(3000, () =>{
 	console.log("Server started on port 3000...");
 });
