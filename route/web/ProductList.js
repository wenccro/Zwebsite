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
			db.query(`SELECT*FROM nature_produce_table `,(err,data)=>{
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
		var promise=new Promise(function(resolve,reject){
			db.query(`SELECT*FROM product_piture_table`,(err,data)=>{
				if(err){
					console.log(err);
				}else{
					var Img_src=[];
					var img_src=[];
					var AllPage=0;
					var all_data=[];
					//分页系统
					if(idx==undefined){
						idx=1;
					}
					//AllPage=Math.ceil(data.length/9);
					//AllPage=data.length;
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
							var flags=data[i].nature_details;
							if(flags!=null&&flags!=''){
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
				     //console.log(chaxun);
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
			    	//replace = replace.slice((idx-1)*9,idx*9);
					var flag=0;
					var AllPage=1;//拿产品中心的总数据条数
					for(var i=1;i<replace.length+1;i++){
						(function(i){
							db.query(`SELECT*FROM picture_table where C_ID='${replace[i-1].ID}' and main_iamge='${1}'`,(err,dat)=>{
									flag++;
									if(dat[0]!=null){
										AllPage++;
										all_data.push(dat[0]);//将所有数据存入到这里，为分页做准备
									}
									if(flag==replace.length){
										/**********************************************/
										AllPage=Math.ceil(AllPage/9);//每一页是9条数据
										//对数据作处理,决定需要发送哪一页的数据过去.
										var data_start=((idx-1)*9);//数据开始
										let biao=0;//是否够9条数据了
										
										for(let z=data_start;z<all_data.length;z++){
											if(biao<9){
												img_src.push(all_data[z]);
												biao++;
											}
										}
										
										/**************************************************/
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
			//console.log(data);
			return new Promise(function(resolve,reject){
				let gg=[];
				let tt=0;
				for(let p=0;p<data[1].length;p++){
					(function(p){
						db.query(`SELECT * FROM product_piture_table WHERE product_piture_table.ID='${data[1][p].C_ID}'`,(err,datas)=>{
							tt++;
							gg.push(datas[0]);
							if(tt==data[1].length){
								data[4]=gg;
								resolve(data);
							}
						})
					})(p)
				}
				
			})
		}).then(function(data){//反向在查一波，避免向前台发送太多数据
			res.json({'result':1,'data':data[4],'img_src':data[1],'AllPage':data[2],"Page":data[3],"Stuff":Stuff});
		})
	});
	
	router.post('/a',(req,res)=>{
		
		var promise=new Promise(function(resolve,reject){
			db.query(`SELECT*FROM product_piture_table where iscarousel='${0}' and isstar_pro='${0}'`,(err,data)=>{
				if(err){
					console.log(err);
				}else{
					var Img_src=[];
					var img_src=[];
					var AllPage=0;
					var all_data=[];
					//分页系统
					if(idx==undefined){
						idx=1;
					}
					//AllPage=Math.ceil(data.length/9);
					
					//查询系统
					 	var stuff = req.body.stuff;
						stuff = stuff.split(",");
						var mount_1=0;
						var chaxun = [];
					for(var i=0;i<data.length;i++){
						mount_1=0;
						if(!data[i].nature_details){
							continue;
						}
						for(var j=0;j<stuff.length;j++){
							for(var k=0;k<data[i].nature_details.split("*/*").length;k++){
								if(stuff[j]=="全部"){
									mount_1++;
									break;
								}else if(data[i].nature_details.split("*/*")[k]==stuff[j]){
									mount_1++;
									break;
								}
							}
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
			    	var flag=0;
					var AllPage=1;//拿产品中心的总数据条数
			    	replace = replace.slice((idx-1)*9,idx*9);
					var flag=0;
					//console.log(replace);
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