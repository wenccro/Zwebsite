const express=require('express');
const mysql=require('mysql');

//操作文件
const pathLib=require('path');
const fs=require('fs');
//链接池
var db=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'senyuan_data_db'
})

module.exports=function(){
  var router=express.Router();
  var idx,Stuff,nature_produce;
  router.get('/',(req,res)=>{
		idx = req.query.page;
		Stuff = req.query.Stuff;
		if(idx==undefined){
			idx=1;
		}
		if(Stuff==undefined){
			Stuff="1/1/1";
		}
		res.render('web/productCenter.html',{});
	});
   
   router.get('/a',(req,res)=>{
		var promise=new Promise(function(resolve,reject){
			db.query(`SELECT*FROM nature_produce_table`,(err,data)=>{
			if(err){
				console.log(err);
			}else{
				nature_produce=data;
				resolve(data);
			}
			});	
		}).then(function(data){
			res.json({'result':1,'data':data});
		});
	});
	router.get('/b',(req,res)=>{
		var dage=req.body.dage;//拿到页面
		var promise=new Promise(function(resolve,reject){
			db.query(`SELECT*FROM product_piture_table`,(err,data)=>{
				if(err){
					console.log(err);
				}else{
					var Img_src=[];
					var img_src=[];
					var AllPage=0;
					//分页系统
					if(idx==undefined){
						idx=1;
					}
					AllPage=Math.ceil(data.length/9);
					
					//查询系统
					Stuff = Stuff.split('/');
					var mount_1=0;
					var chaxun = [];
//					for(var i=0;i<data.length;i++){
//						mount_1=0;
//						for(var j=0;j<Stuff.length;j++){
//							if(data[i].nature_details.split("*/*").indexOf(Stuff[j])!=-1){
//								mount_1++;
//							}else if(Stuff == "全部"){
//								mount_1++;
//							}else if(Stuff == "其他"){
//								for(var k=0;k<nature_produce.details.split("*/*").length;k++){
//									if(data[i].nature_details.split("*/*").indexOf(nature_produce.details.split("*/*")[k]!=-1)){
//										mount++;
//									}
//								}	
//							}
//							chaxun.push({'mount':mount_1,'ID':data[i].ID});
//						}
//					}
					var mount_2=0;
					for(var i=0;i<data.length;i++){
						mount_1=0;
						for(var j=0;j<Stuff.length;j++){
							if(Stuff[j] == 1){
								mount_1++;
							}else if(Stuff[j]-2<nature_produce[j].details.split("*/*").length){
								if(data[i].nature_details.split("*/*").indexOf(nature_produce[j].details.split("*/*")[parseInt(Stuff[j]-2)])!=-1){
									mount_1++;
								}
							}else if(Stuff[j]-2 == nature_produce[j].details.split("*/*").length){
								for(var k=0;k<nature_produce[j].details.split("*/*").length;k++){
									if(data[i].nature_details.split("*/*").indexOf(nature_produce[j].details.split("*/*")[k])!=-1){
											mount_2++
									}
								}
								if(mount_2==0){
									mount_1++;
								}
							}
							chaxun.push({'mount':mount_1,'ID':data[i].ID});
						}
					}
					//处理chaxun 
					 function compare(property){
				         return function(obj1,obj2){
				             var value1 = obj1[property];
				             var value2 = obj2[property];
				             return  value2 - value1;     // 升序
				         }
				    }
				     chaxun = chaxun.sort(compare("mount"));
				     //去重复
				     var hash={};
						chaxun = chaxun.reduce(function (item, next) {
						    hash[next.ID] ? '' : hash[next.ID] = true && item.push(next);
						    return item;
						}, []);
				    //新数组
				    var replace=[];
				    for(var i=0;i<chaxun.length;i++){
				    	for(var j=0;j<data.length;j++){
				    		if(data[j].ID==chaxun[i].ID){
				    			replace.push(data[j]);
				    			break;
				    		}
				    	}
				    }
			    //后面
			    	replace = replace.slice((idx-1)*9,idx*9);
					var flag=0;
					for(var i=1;i<replace.length+1;i++){
						(function(i){
							db.query(`SELECT*FROM picture_table where C_ID='${replace[i-1].ID}' and main_iamge='${1}'`,(err,dat)=>{
									flag++;
									img_src.push(dat[0]);
									if(flag==replace.length){
										Img_src[0]=replace;
										Img_src[1]=img_src;
										Img_src[2]=AllPage;
										Img_src[3]=idx;
										resolve(Img_src);
									}
							});
						})(i)
					}
				}
			});	
		}).then(function(data){
			res.json({'result':1,'data':data[0],'img_src':data[1],'AllPage':data[2],"Page":data[3],"Stuff":Stuff});
		});
	});
	router.post('/a',(req,res)=>{
		
		var promise=new Promise(function(resolve,reject){
			db.query(`SELECT*FROM product_piture_table`,(err,data)=>{
				if(err){
					console.log(err);
				}else{
					var Img_src=[];
					var img_src=[];
					var AllPage=0;
					//分页系统
					if(idx==undefined){
						idx=1;
					}
					AllPage=Math.ceil(data.length/9);
					
					//查询系统
					 var stuff = req.body.stuff;
						stuff = stuff.split(",");
					var mount_1=0;
					var chaxun = [];
					for(var i=0;i<data.length;i++){
						mount_1=0;
						for(var j=0;j<stuff.length;j++){
							if(data[i].nature_details.split("*/*").indexOf(stuff[j])!=-1){
								mount_1++;
							}
							chaxun.push({'mount':mount_1,'ID':data[i].ID});
						}
					}
					
					//处理chaxun 
					 function compare(property){
				         return function(obj1,obj2){
				             var value1 = obj1[property];
				             var value2 = obj2[property];
				             return  value2 - value1;     // 升序
				         }
				    }
				     chaxun = chaxun.sort(compare("mount"));
				     //去重复
				     var hash={};
						chaxun = chaxun.reduce(function (item, next) {
						    hash[next.ID] ? '' : hash[next.ID] = true && item.push(next);
						    return item;
						}, []);
				    
				    //新数组
				    var replace=[];
				    for(var i=0;i<chaxun.length;i++){
				    	for(var j=0;j<data.length;j++){
				    		if(data[j].ID==chaxun[i].ID){
				    			replace.push(data[j]);
				    			break;
				    		}
				    	}
				    }
			    //后面
			    	replace = replace.slice((idx-1)*9,idx*9);
					var flag=0;
					for(var i=1;i<replace.length+1;i++){
						(function(i){
							db.query(`SELECT*FROM picture_table where C_ID='${replace[i-1].ID}' and main_iamge='${1}'`,(err,dat)=>{
									flag++;
									img_src.push(dat[0]);
									if(flag==replace.length){
										Img_src[0]=replace;
										Img_src[1]=img_src;
										Img_src[2]=AllPage;
										Img_src[3]=idx;
										resolve(Img_src);
									}
							});
						})(i)
					}
				}
			});	
		}).then(function(data){
			res.json({'result':1,'data':data[0],'img_src':data[1],'AllPage':data[2],"Page":data[3],"Stuff":req.body.stuff});
		});
		
	});
	router.post('/b',(req,res)=>{
		if(req.body.name||req.body.phone||req.body.content){
			res.json({'result':1});
		}else{
			res.json({'result':0});
		}
	});
		return router;
}