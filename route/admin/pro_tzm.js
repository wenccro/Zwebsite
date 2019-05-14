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
	//需要先拿到先关图片的特征信息的id
	var promise=new Promise(function(resolve,reject){
		db.query(`SELECT ID,name,nature_details,details_carousel FROM product_piture_table where product_piture_table.iscarousel=0 and product_piture_table.nature_details!='' limit `+i+`,10`,(err,data)=>{
			if(err){
			console.log(err);
				res.status(500).send('database error').end();
			}else if(data[0]==null){
				res.json({"result":-1})
			}else{
				for(var i=0;i<data.length;i++){
					lun_data.push({});
					let tt=data[i].nature_details;
						tt=tt.split("*/*");
					lun_data[i].ID=data[i].ID;
					lun_data[i].name=data[i].name;
					let txts=delHtmlTag(data[i].details_carousel);
						txts=txts.slice(0,10);
					lun_data[i].jz=txts;
					lun_data[i].nature_details=tt;
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
			}
			resolve(lun_data);
		})
	}).then(function(value){
		//console.log(value);
		var flag=0;
		return new Promise(function(resolve,reject){
			for(let i=0;i<value.length;i++){
				(function(i){
					db.query(`SELECT picture_table.image_url,picture_table.submit_time FROM picture_table where picture_table.C_ID='${value[i].ID}' and picture_table.main_iamge=1 `,(err,data)=>{
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
	//console.log(id);
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
	res.render('admin/tzm_add.ejs',{});
}
exports.addofiamge=function(req,res){
	res.render('admin/tzm_add_imgs.ejs',{});
}

//用来应付window里面重新重置的页面
exports.alterPage=function(req,res){
	res.render('admin/tzm_alter.ejs',{});
}
//同款产品次要图片修改
exports.addAlterImages=function(req,res){
	res.render('admin/tzm_alter_imgs.ejs',{});
}
//发送给添加页面的信息
exports.addtzmdata=function(req,res){
	var alter_data=[];
	db.query(`SELECT * FROM nature_produce_table`,(err,data)=>{
		if(err){
			console.error(err);
			res.status(500).send('database error').end();
		}else{
			for(var i=0;i<data.length;i++){
				let tt=data[i].details;
				tt=tt.split("*/*");
				alter_data.push({});
				alter_data[i].ID=data[i].ID;
				alter_data[i].name=data[i].name;
				alter_data[i].details=tt;
			}
			res.json({"data":alter_data,"result":1});
		}
	})
}
//添加除图片以外的数据
exports.addIm=function(req,res){
	var name=req.body.name;
	var miao=req.body.miao;
	var teze=req.body.teze;
		teze=teze.slice(0,teze.length-3);
	//console.log(teze,miao)
	//将除图片以外的内容传入数据库
	db.query(`INSERT INTO product_piture_table(name,iscarousel,nature_details,details_carousel,isstar_pro) VALUE('${name}','0','${teze}','${miao}','0')`,(err,data)=>{
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
	var tt1=req.query;
		tt1=tt1.id;
		tt1=tt1.split("/");
	var images=tt1[1];
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
				db.query(`INSERT INTO picture_table(image_url,submit_time,C_ID,main_iamge) VALUE('${newFileName}','${time}','${c_id}','${images}')`,(err,data)=>{
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
	var alter_data=[];
	var promise=new Promise(function(resolve,reject){
		db.query(`SELECT ID,name,nature_details,details_carousel FROM product_piture_table where product_piture_table.ID='${id}'`,(err,data)=>{
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
					let tt=data[i].nature_details;
						tt=tt.split("*/*");
					alter_data[i].nature_details=tt;
					alter_data[i].details_carousel=data[i].details_carousel
				}
			}
			resolve(alter_data);
		})
	}).then(function(value){
		var flag=0;
		return new Promise(function(resolve,reject){
			for(let i=0;i<value.length;i++){
				(function(i){
					db.query(`SELECT picture_table.image_url,picture_table.submit_time FROM picture_table where picture_table.C_ID='${value[i].ID}' and picture_table.main_iamge=1`,(err,data)=>{
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
	var teze=req.body.teze;
		teze=teze.slice(0,teze.length-3);
	//将除图片以外的内容传入数据库
	db.query(`UPDATE product_piture_table SET name='${name}',details_carousel='${miao}',nature_details='${teze}' where ID='${id}'`,(err,data)=>{
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
				db.query(`UPDATE picture_table SET image_url='${newFileName}',submit_time='${time}' where ID='${c_id}'`,(err,data)=>{
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
