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
			res.render('web/index.html',{});
	});
	router.get('/a',(req,res)=>{
		var promise=new Promise(function(resolve,reject){
		   var img_src=[],Img_src=[];
			db.query(`SELECT*FROM product_piture_table WHERE iscarousel=1 or isstar_pro=1`,(err,data)=>{
			if(err){
				console.log(err);
			}else{
			db.query(`SELECT*FROM picture_table`,(err,dat)=>{
				if(err){
					console.log(err);
					res.status(404).send("i don't no");
					}else{
						for(var i=0;i<data.length;i++){
							for(var j=0;j<dat.length;j++){
								if(data[i].ID==dat[j].C_ID){
									img_src[i] = dat[j];	
								}
								if(i==data.length-1||j==dat.length-1){
									Img_src[0] = data;
									Img_src[1] = img_src;
									resolve(Img_src);
								}
							}
						}
					}
				});	
				}
			});	
		}).then(function(Img_src){
			//console.log(Img_src);
			res.json({'result':1,'img_src':Img_src[1],'data':Img_src[0]});
		});
	});
//	新闻
	router.get('/b',(req,res)=>{
		var promise=new Promise(function(resolve,reject){
			db.query(`SELECT*FROM news_table`,(err,data)=>{
				if(err){
					console.log(err);
				}else{
					var Times=[];
					var Data=[];
					var mount=0;
					for(var i=0;i<data.length;i++){
		 			Times[i] =parseInt(data[i].news_time.split("-")[0]+data[i].news_time.split("-")[1]+data[i].news_time.split("-")[2]);
			 		}
			 		Times.sort(function(a,b){
			 		 	return b-a;
			 		});
			 		for(var j=0;j<3;j++){
			 			for(var i=0;i<data.length;i++){
			 				if(Times[j]==parseInt(data[i].news_time.split("-")[0]+data[i].news_time.split("-")[1]+data[i].news_time.split("-")[2])){
			 					Data[mount]=data[i];
			 					mount++;
			 				}
			 				if(i==data.length-1&&j==2){
			 					Data=Data.slice(0,3);
			 					resolve(Data);
			 				}
			 			}
		 			}
				}
			})
		}).then(function(data){
			res.json({'result':1,'data':data});
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
	//路由
	router.use('/aboutUs',require('./aboutMe')());//关于我们
	router.use('/JoinTheService',require('./blaack')());//加盟
	router.use('/customizedService',require('./customization')());//定制服务
	router.use('/details',require('./details')());//详情页面
	router.use('/news',require('./news')());//新闻
	router.use('/productCenter',require('./ProductList')());//产品列表
	router.use('/serviceAssurance',require('./server')());//服务保障
	router.use('/householdMaintenance',require('./jiajubaoyang')());//家具保养
	router.use('/newsContent',require('./news_con')());//新闻内容
	router.use('/homeContent',require('./jiaju_con')());//家具内容
  	return router;
}

