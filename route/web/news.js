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
		res.render('web/news.html',{});
	});
   router.get('/a',(req,res)=>{
		var promise=new Promise(function(resolve,reject){
			db.query(`SELECT*FROM news_table`,(err,data)=>{
			if(err){
				console.log(err);
			}else{
				var Times=[];
					var Data=[];
					var topData;
					var mount=0;
					for(var i=0;i<data.length;i++){
		 			Times[i] =parseInt(data[i].news_time.split("-")[0]+data[i].news_time.split("-")[1]+data[i].news_time.split("-")[2]);
			 		}
			 		Times.sort(function(a,b){
			 		 	return b-a;
			 		});
			 		for(var j=0;j<5;j++){
			 			for(var i=0;i<data.length;i++){
			 				if(Times[j]==parseInt(data[i].news_time.split("-")[0]+data[i].news_time.split("-")[1]+data[i].news_time.split("-")[2])){
			 					Data.push(data[i]);
			 				}
			 				if(data[i].isheadline==1&&mount==0){
			 					topData = data[i];
			 					mount++;
			 				}
			 				if(i==data.length-1&&j==4){
			 					Data=Data.slice(0,5);
			 					Data.push(topData);	
			 					resolve(Data);
			 				}
			 			}
		 			}
			 		
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