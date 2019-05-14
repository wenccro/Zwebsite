const express=require('express');
const mysql=require('mysql');

//操作文件
const pathLib=require('path');
const fs=require('fs');
//链接池
var db=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'senyuan_data_db'
})

module.exports=function(){
  var router=express.Router();
  var idx;
  router.get('/',(req,res)=>{
		idx = req.query.id;
		if(idx==undefined){
			idx=1;
		}
		res.render('web/jiajuContent.html',{});
	});
	router.get('/a',(req,res)=>{
		var promise=new Promise(function(resolve,reject){
			db.query(`SELECT*FROM homes_maintenance where ID=${idx}`,(err,data)=>{
				if(err){
					console.log(err);
				}else{
					resolve(data[0]);
				}
			});	
		}).then(function(Data){
			res.json({'result':1,'data':Data});
		});
	});
	router.post('/b',(req,res)=>{
		var name=req.body.name!=''?req.body.name:'未留称呼';
		var phone=req.body.phone;
		var content=req.body.content!=''?req.body.content:'未留内容';
		if(phone!=''){
			//添加进入数据库
			db.query(`INSERT INTO telephone_table(name,tele_num,context) VALUE('${name}','${phone}','${content}')`,(err,data)=>{
				if(err){
					console.log(err);
					res.status(500).send("database error").end();
				}else{
					res.json({"result":1})
				}
			})
		}	
	});
		return router;
}