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
	db.query(`SELECT * FROM telephone_table`,(err,data)=>{
		if(err){
		console.log(err);
			res.status(500).send('database error').end();
		}else if(data[0]==null){
			res.json({"result":-1})
		}else{
			//console.log(data);
			for(var i=0;i<data.length;i++){
				data[i].context=delHtmlTag(data[i].context);
			}
			res.json({"data":data,"result":1});
		}
	})
	//去掉所有的html标签
	function delHtmlTag(str)
	{
	    var strs=str.replace(/<[^>]+>/g,"");//去掉所有的html标记
	    for(var i=0;i<strs.length;i++){
	    	strs=strs.replace('&lt;','<');
	    	strs=strs.replace('&gt;','>');
	    	strs=strs.replace('&nbsp;',' ');
	    }
	    return strs;
	}
}
//删除数据
exports.deletetele=function(req,res){
	var id=req.body.id;
	db.query(`DELETE FROM telephone_table WHERE ID=${id}`,(err,data)=>{
		if(err){
			console.error(err);
			res.status(500).send('database error').end();
		}else{
			res.json({"result":1});
		}
	});
	
	
	
}

//用来应付window里面重新重置的页面
exports.alterPage=function(req,res){
	res.render('admin/tele_look.ejs',{});
}

//给查看页面发送数据
exports.alters=function(req,res){
	var id=req.body.id;
	db.query(`SELECT * FROM telephone_table where telephone_table.ID='${id}'`,(err,data)=>{
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
