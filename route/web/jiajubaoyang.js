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
  router.get('/',(req,res)=>{
		idx = req.query.id;
		res.render('web/householdMaintenance.html',{});
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
	//处理基本的内容
	router.get('/a',(req,res)=>{
		var promise=new Promise(function(resolve,reject){
			db.query(`SELECT*FROM homes_maintenance`,(err,data)=>{
				if(err){
					console.log(err);
				}else{
					var Times=[];    //临时时间
					var Data=[];
					var topData=[];     //推荐
					var mount=0;
					
					if(data.length>5){
						for(var i=0;i<data.length;i++){
		 					Times[i] =parseInt(data[i].news_time.split("-")[0]+data[i].news_time.split("-")[1]+data[i].news_time.split("-")[2]);
				 		}
				 		Times.sort(function(a,b){
				 		 	return b-a;
				 		});
			 			for(var i=0;i<data.length;i++){
			 				if(Times[i]==parseInt(data[i].news_time.split("-")[0]+data[i].news_time.split("-")[1]+data[i].news_time.split("-")[2])){
			 					Data.push(data[i]);
			 				}
			 				if(data[i].isheadline==1){
			 					//console.log(data[i]);
			 					topData.push(data[i]);
			 				}
			 				if(i==data.length-1){
			 					Data=Data.slice(0,5);
			 					Data.push(topData);	
			 					resolve(Data);
			 				}
			 			}
					}else{
						resolve(Data);
					}
				}
			});	
		}).then(function(Data){
			//console.log(Data);
			if(Data.length>1){
				res.json({'result':1,'data':Data});
			}else{
				res.json({'result':-1});
			}	
		});
	});
//	route.get("/c",(req,res)=>{
//		var promise=new Promise(function(resolve,reject){
//			db.query(`SELECT picture_table.ID,picture_table.main_iamge FROM picture_table,product_piture_table where product_piture_table.CD=picture_table.C_ID and product_piture_table.iscarousel=0 and product_piture_table.isstar_pro=0 limit 0,10`,(err,data)=>{
//				if(err){
//					console.log(err);
//				}else{
//					res.json({'result':1,'data':Data});
//				}
//			});	
//		})
//	})
		return router;
}