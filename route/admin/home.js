const express=require('express');
const mysql=require('mysql');
var xlsx = require('node-xlsx');//处理导入的xls文件
const multer=require('multer');


//操作文件
const pathLib=require('path');
const fs=require('fs');
//链接池
var db=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'senyuan_data_db'
});

exports.showhome=function(req,res){
	//拿id的同时将需要的数据拿出来
	var lun_data=[]
	//需要先拿到先关图片的特征信息的id
	var promise=new Promise(function(resolve,reject){
		db.query(`SELECT product_piture_table.ID,product_piture_table.name,product_piture_table.product_carousel FROM product_piture_table where product_piture_table.iscarousel=1`,(err,data)=>{
			if(err){
			console.log(err);
				res.status(500).send('database error').end();
			}else if(data[0]==null){
				res.json({"result":-1})
			}else{
				for(var i=0;i<data.length;i++){
					lun_data.push({});
					lun_data[i].ID=data[i].ID;
					lun_data[i].name=data[i].name;
					lun_data[i].carousel=data[i].product_carousel;
				}
			}
			resolve(lun_data);
		})
	}).then(function(value){
		var flag=0;
		return new Promise(function(resolve,reject){
			for(let i=0;i<value.length;i++){
				(function(i){
					db.query(`SELECT image_url,submit_time FROM picture_table where picture_table.C_ID='${value[i].ID}'`,(err,data)=>{
						flag++;
						if(err){
							console.error(err);
							res.status(500).send('database error').end();
						}else{
							lun_data[i].img_url=data[0].image_url;
							lun_data[i].img_time=data[0].submit_time;
							if(flag==value.length){
								resolve(lun_data);
							}
						}
					})
				})(i)
			}
		})
	}).then(function(value){
		res.json({"data":value,"result":1});
	})
}
//删除数据
exports.deleteImage=function(req,res){
	var id=req.body.id;
	var t=0;
	new Promise(function(resolve,reject){
		t+=1;
		db.query(`DELETE FROM product_piture_table WHERE ID=${id}`,(err,data)=>{
			if(err){
				console.error(err);
				res.status(500).send('database error').end();
			}else{
				resolve(t);
			}
		});
	}).then(function(value){
		db.query(`DELETE FROM picture_table WHERE C_ID=${id}`,(err,data)=>{
			if(err){
				console.error(err);
				res.status(500).send('database error').end();
			}else{
				res.json({"result":1})
			}
		});
	})
	
	
}
//处理轮播a标签
//用来应付index 页面里的试题添加 a标签的请求  跳转页面
exports.addhome=function(req,res){
	res.render('admin/s_add.ejs',{});
}

//用来应付window里面重新重置的页面
exports.alterPage=function(req,res){
	res.render('admin/s_alter.ejs',{});
}
//添加除图片以外的数据
exports.addIm=function(req,res){
	var name=req.body.name;
	var miao=req.body.miao;
	//将除图片以外的内容传入数据库
	db.query(`INSERT INTO product_piture_table(name,iscarousel,product_carousel) VALUE('${name}','1','${miao}')`,(err,data)=>{
		if(err){
			console.log(err);
			res.status(500).send("database error").end();
		}else{
			res.json({"data":data})
		}
	})
}
//添加除图片以外的数据
exports.addImage=function(req,res){
	var c_id=parseInt(req.query.id);
	var time=new Date();
	var date1=time.toLocaleTimeString();
	var date2=time.toLocaleDateString();
		date1=date1.split(':')
	time=date2+"-"+date1[0]+"-"+date1[1]+"-"+date1[2];
	if(req.files[0]){
		var ext=pathLib.parse(req.files[0].originalname).ext;//接收图片的后缀
		var oldPath=req.files[0].path;//获取 图片位置信息
		var newPath=req.files[0].path+ext;//获取图片位置信息+后缀
		var newFileName=req.files[0].filename+ext;//获取图片名字+后缀
	}else{
		var newFileName=null;
	}
	if(newFileName){
		fs.rename(oldPath,newPath,(err)=>{
			if(err){
				console.log(err);
			}else{
				//将除图片以外的内容传入数据库
				db.query(`INSERT INTO picture_table(image_url,submit_time,C_ID) VALUE('${newFileName}','${time}','${c_id}')`,(err,data)=>{
					if(err){
						console.log(err);
						res.status(500).send("database error").end();
					}else{
						res.json({"result":1})
					}
				})
			}
		})
	}
	
}
//给修改页面发送数据
exports.alters=function(req,res){
	var id=req.body.id;
	var alter_data=[];
	var promise=new Promise(function(resolve,reject){
		db.query(`SELECT product_piture_table.ID,product_piture_table.name,product_piture_table.product_carousel FROM product_piture_table where product_piture_table.ID='${id}'`,(err,data)=>{
			if(err){
			console.log(err);
				res.status(500).send('database error').end();
			}else if(data[0]==null){
				res.json({"result":-1})
			}else{
				for(var i=0;i<data.length;i++){
					alter_data.push({});
					alter_data[i].ID=data[i].ID;
					alter_data[i].name=data[i].name;
					alter_data[i].carousel=data[i].product_carousel;
				}
			}
			resolve(alter_data);
		})
	}).then(function(value){
		var flag=0;
		return new Promise(function(resolve,reject){
			for(let i=0;i<value.length;i++){
				(function(i){
					db.query(`SELECT picture_table.image_url,picture_table.submit_time FROM picture_table where picture_table.C_ID='${value[i].ID}'`,(err,data)=>{
						flag++;
						if(err){
							console.error(err);
							res.status(500).send('database error').end();
						}else{
							alter_data[i].img_url=data[0].image_url;
							alter_data[i].img_time=data[0].submit_time;
							if(flag==value.length){
								resolve(alter_data);
							}
						}
					})
				})(i)
			}
		})
	}).then(function(value){
		res.json({"data":value,"result":1});
	})
	
}
//修改
exports.alterIm=function(req,res){
	var id=req.body.id;
	var name=req.body.name;
	var miao=req.body.miao;
	//将除图片以外的内容传入数据库
	db.query(`UPDATE product_piture_table SET name='${name}',product_carousel='${miao}' where ID='${id}'`,(err,data)=>{
		if(err){
			cosele.error(err);
			res.status(500).send('database error').end();
		}else{
			res.json({'result':1});
		}
	})
}
//修改图片
exports.alterImage=function(req,res){
	var c_id=parseInt(req.query.id);
	var time=new Date();
	var date1=time.toLocaleTimeString();
	var date2=time.toLocaleDateString();
		date1=date1.split(':')
	time=date2+"-"+date1[0]+"-"+date1[1]+"-"+date1[2];
	if(req.files[0]){
		var ext=pathLib.parse(req.files[0].originalname).ext;//接收图片的后缀
		var oldPath=req.files[0].path;//获取 图片位置信息
		var newPath=req.files[0].path+ext;//获取图片位置信息+后缀
		var newFileName=req.files[0].filename+ext;//获取图片名字+后缀
	}else{
		var newFileName=null;
	}
	if(newFileName){
		fs.rename(oldPath,newPath,(err)=>{
			if(err){
				console.log(err);
			}else{
				//将除图片以外的内容传入数据库
				db.query(`UPDATE picture_table SET image_url='${newFileName}',submit_time='${time}' where C_ID='${c_id}'`,(err,data)=>{
					if(err){
						console.log(err);
						res.status(500).send("database error").end();
					}else{
						res.json({"result":1})
					}
				})
			}
		})
	}
	
}