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
	var page_num=req.query.num;
	//console.log(page_num);
	var i=parseInt(req.query.num);
	if(i==0){
		i=0;
	}else{
		i=(i-1)*10;
	}
	var lun_data=[];
	db.query(`SELECT * FROM nature_produce_table limit `+i+`,10`,(err,data)=>{
		if(err){
		console.log(err);
			res.status(500).send('database error').end();
		}else if(data[0]==null){
			res.json({"result":-1})
		}else{
			res.json({"data":data,"result":1});
		}
	})
}
//删除数据
exports.deletetz=function(req,res){
	var id=req.body.id;
	db.query(`DELETE FROM nature_produce_table WHERE ID=${id}`,(err,data)=>{
		if(err){
			console.error(err);
			res.status(500).send('database error').end();
		}else{
			res.json({"result":1});
		}
	});
	
	
	
}
//处理轮播a标签
//用来应付index 页面里的试题添加 a标签的请求  跳转页面
exports.addhome=function(req,res){
	res.render('admin/tz_add.ejs',{});
}

//用来应付window里面重新重置的页面
exports.alterPage=function(req,res){
	res.render('admin/tz_alter.ejs',{});
}

exports.addIm=function(req,res){
	var name=req.body.name;
	var miao=req.body.miao;
	miao=miao.slice(0,miao.length-3);
	//将除图片以外的内容传入数据库
	db.query(`INSERT INTO nature_produce_table(name,details) VALUE('${name}','${miao}')`,(err,data)=>{
		if(err){
			console.log(err);
			res.status(500).send("database error").end();
		}else{
			res.json({"result":1})
		}
	})
}
//发送内容给修改页面
exports.alters=function(req,res){
	
	var id=req.body.id;
	var alter_data=[];
	db.query(`SELECT * FROM nature_produce_table where nature_produce_table.ID='${id}'`,(err,data)=>{
		if(err){
		console.log(err);
			res.status(500).send('database error').end();
		}else if(data[0]==null){
			res.json({"result":-1})
		}else{
			let tt=data[0].details;
				tt=tt.split("*/*");
				alter_data.push({});
				alter_data[0].ID=data[0].ID;
				alter_data[0].name=data[0].name;
				alter_data[0].details=tt;
			res.json({"data":alter_data,"result":1});
		}
	})
}

//修改
exports.alterIm=function(req,res){
	var id=req.body.id;
	var name=req.body.name;
	var miao=req.body.miao;
	miao=miao.slice(0,miao.length-3);
	//将除图片以外的内容传入数据库
	db.query(`UPDATE nature_produce_table SET name='${name}',details='${miao}' where ID='${id}'`,(err,data)=>{
		if(err){
			cosele.error(err);
			res.status(500).send('database error').end();
		}else{
			res.json({'result':1});
		}
	})
}
