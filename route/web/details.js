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
		res.render('web/details.html',{});
	});
	router.get('/a',(req,res)=>{
		var promise=new Promise(function(resolve,reject){
			db.query(`SELECT*FROM nature_produce_table`,(err,data)=>{
			if(err){
				console.log(err);
			}else{
				resolve(data);
			}
			});	
		}).then(function(data){
			res.json({'result':1,'data':data});
		});
	});
	router.get('/b',(req,res)=>{
		var promise=new Promise(function(resolve,reject){
			db.query(`SELECT*FROM product_piture_table where iscarousel='${0}' and isstar_pro='${0}'`,(err,data)=>{
				if(err){
					console.log(err);
				}else{
					var Img_src=[];
					var img_src=[];
					data = data.slice(0,6);
					var flag=0;
					for(var i=1;i<data.length+1;i++){
						(function(i){
							db.query(`SELECT*FROM picture_table where C_ID='${data[i-1].ID}' and main_iamge='${1}'`,(err,dat)=>{
									flag++;
								img_src.push(dat[0]);
								if(flag==data.length){
									Img_src[0]=data;
									Img_src[1]=img_src;
									resolve(Img_src);
								}
							});
						})(i)
					}
				}
			});	
		}).then(function(data){
			res.json({'result':1,'data':data[0],'img_src':data[1]});
		});
	});
	router.get('/c',(req,res)=>{
		var promise=new Promise(function(resolve,reject){
			db.query(`SELECT*FROM product_piture_table WHERE ID=${idx}`,(err,data)=>{
			if(err){
				console.log(err);
			}else{
				var Img_src=[];
				db.query(`SELECT*FROM picture_table WHERE C_ID=${idx}`,(err,dat)=>{
					if(err){
						console.log(err);
					}else{
						Img_src[0]=data;
						Img_src[1]=dat;
						resolve(Img_src);
					}
				});	
			}
			});	
		}).then(function(data){
			res.json({'result':1,'data':data[0],'img_src':data[1]});
		});
	});
	
	router.post('/a',(req,res)=>{
		var stuff = req.body.stuff;
		
		console.log("1");
		res.location('web/ProductList.html',{'Stuff':stuff});
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