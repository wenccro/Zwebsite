const express=require('express');
const mysql=require('mysql');
const multer=require('multer');

//操作文件
const pathLib=require('path');
const fs=require('fs');
//链接池
var db=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'car_detection_station'
})

exports.showIndex=function(req,res){
	//res.render('web/index2.ejs',{});
	var router=express.Router();
	router.get('/', (req, res)=>{
		//res.send("我是外部");
		res.render('web/index2.ejs',{});
	});
	return router;
}

