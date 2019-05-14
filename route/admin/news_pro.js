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
	var page_num=req.query.num;
	//console.log(page_num);
	var i=parseInt(req.query.num);
	if(i==0){
		i=0;
	}else{
		i=(i-1)*10;
	}
	var lun_data=[]
	db.query(`SELECT * FROM news_table limit `+i+`,10`,(err,data)=>{
		if(err){
		console.log(err);
			res.status(500).send('database error').end();
		}else if(data[0]==null){
			res.json({"result":-1})
		}else{
			//console.log(data);
			for(var i=0;i<data.length;i++){
				data[i].news_content=delHtmlTag(data[i].news_content);
			}
			res.json({"data":data,"result":1});
		}
		
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
		
	})
	
}
//删除数据
exports.deleteImage=function(req,res){
	var id=req.body.id;
	//console.log(id);
	db.query(`DELETE FROM news_table WHERE ID=${id}`,(err,data)=>{
		if(err){
			console.error(err);
			res.status(500).send('database error').end();
		}else{
			res.json({"result":1})
		}
	});
	
	
}
//处理轮播a标签
//用来应付index 页面里的试题添加 a标签的请求  跳转页面
exports.addhome=function(req,res){
	res.render('admin/news_add.ejs',{});
}

//用来应付window里面重新重置的页面
exports.alterPage=function(req,res){
	res.render('admin/news_alter.ejs',{});
}

//添加除图片以外的数据
exports.addIm=function(req,res){
	var name=req.body.name;//新闻标题
	var miao=req.body.miao;//新闻内容
	var ishear=req.body.ishear;//是否是头条
	var time=new Date();//时间
	var date1=time.toLocaleTimeString();
	var date2=time.toLocaleDateString();
		date1=date1.split(':')
	time=date2+"-"+date1[0]+"-"+date1[1]+"-"+date1[2];
	//将除图片以外的内容传入数据库
	db.query(`INSERT INTO news_table(news_title,news_content,news_time,isheadline) VALUE('${name}','${miao}','${time}','${ishear}')`,(err,data)=>{
		if(err){
			console.log(err);
			res.status(500).send("database error").end();
		}else{
			res.json({"data":data})
		}
	})
}
//添加图片
exports.addImage=function(req,res){
	var c_id=parseInt(req.query.id);
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
				db.query(`UPDATE news_table SET news_image='${newFileName}' where ID='${c_id}'`,(err,data)=>{
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
//修改页面拉取信息
exports.alters=function(req,res){
	var id=req.body.id;
	//console.log(id);
	db.query(`SELECT * FROM news_table where news_table.ID='${id}'`,(err,data)=>{
		if(err){
			console.log(err);
			res.status(500).send('database error').end();
		}else if(data[0]==null){
			res.json({"result":-1})
		}else{
			res.json({'result':1,"data":data});
		}		
	})	
}
//修改
exports.alterIm=function(req,res){
	var id=req.body.id;
	var name=req.body.name;
	var time_new=req.body.times;
	var time=new Date();
	var date1=time.toLocaleTimeString();
		date1=date1.split(':')
	time=time_new+"-"+date1[0]+"-"+date1[1]+"-"+date1[2];
	var miao=req.body.miao;
	var ishear=req.body.ishear;//是否是头条
	
	//将除图片以外的内容传入数据库
	db.query(`UPDATE news_table SET news_title='${name}',news_content='${miao}',news_time='${time}',isheadline='${ishear}' where ID='${id}'`,(err,data)=>{
		if(err){
			cosele.error(err);
			res.status(500).send('database error').end();
		}else{
			res.json({'result':1});
		}
	})
}
//修改图片
exports.alterImga=function(req,res){
	var c_id=parseInt(req.query.id);
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
				db.query(`UPDATE news_table SET news_image='${newFileName}' where ID='${c_id}'`,(err,data)=>{
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
exports.alterTwoData=function(req,res){
	var id=req.body.id;
	db.query(`SELECT ID,image_url,submit_time FROM picture_table where picture_table.C_ID='${id}' and picture_table.main_iamge=0`,(err,data)=>{
		if(err){
			console.error(err);
			res.status(500).send('database error').end();
		}else{
			res.json({"result":1,"data":data})
		}
	})
}
