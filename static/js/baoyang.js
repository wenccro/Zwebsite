$(function(){
		   function OnTree(){
		 	   this.$ajax();
		 	   this.$common();
		 }
		 OnTree.prototype.$ajax=function(){//ajax拉取,保养内容
		 		var self=this;
		 		$.get("/householdMaintenance/a",function(data){
	   		 	 	if(data.result!=-1){
	                   	self.$ontree(data);
	                }
	   		 	});
	   		 	$.get("/householdMaintenance/c",function(data){
	   		 	 	if(data.result!=-1){
	   		 	 		//console.log(data);
	                   	self.$ontree1(data);
	                }
	   		 	});
		 }
		 OnTree.prototype.$ontree=function(data){//上树
		 	//console.log(data.data);
		 	if(data.data.length<=5){
		 		for(var i=0;i<data,data.length;i++){
		 			if(!data.data[i]){
		 				continue;
		 			}
		 			
					var str_qi=data.data[i].news_time.split("-")[0]+"年"+data.data[i].news_time.split("-")[1]+"月"+data.data[i].news_time.split("-")[2]+"日";
						ids = [
		 					'<div class="baoyang_box" data-id="'+data.data[i].ID+'"><div class="baoyang_rt">',
							'<img class="lf" src="/upload/'+data.data[i].news_image+'"/>',
							'<div class="baoyang lf" >',
								'<h3>'+data.data[i].hmaint_title+'...</h3>',
								'<p>'+data.data[i].hmaint_content.slice(0,100)+'...</p>',
								'<p class="data rt">'+str_qi+'</p>',
							'</div></div></div>'
		 				].join("");
		 				$("#baoyang #a").append(ids);
		 				$(".baoyang_box").click(function(){
			 				var idx=$(this).attr("data-id");
			 				window.location="/homeContent?id="+idx;	 				
			 			})
				}
		 		for(var i=0;i<data.data.length;i++){
		 			if(data.data[i].isheadline==1){
			 				ids=[
			 				'<li><img src="/upload/'+data.data[i].news_image+'" /></li>'
			 			].join("");
			 			$("#baoyang_scoll ul").append(ids);
		 			}
		 		}
		 	}else{
		 		for(var i=0;i<5;i++){
		 			if(!data.data[i]){
		 				continue;
		 			}
					var str_qi=data.data[i].news_time.split("-")[0]+"年"+data.data[i].news_time.split("-")[1]+"月"+data.data[i].news_time.split("-")[2]+"日";
						ids = [
		 					'<div class="baoyang_box" data-id="'+data.data[i].ID+'"><div class="baoyang_rt">',
							'<img class="lf" src="/upload/'+data.data[i].news_image+'"/>',
							'<div class="baoyang lf" >',
								'<h3>'+data.data[i].hmaint_title+'...</h3>',
								'<p>'+delHtmlTag(data.data[i].hmaint_content).slice(0,100)+'...</p>',
								'<p class="data rt">'+str_qi+'</p>',
							'</div></div></div>'
		 				].join("");
		 				$("#baoyang #a").append(ids);
		 				$(".baoyang_box").click(function(){
			 				var idx=$(this).attr("data-id");
			 				window.location="/homeContent?id="+idx;	 				
			 			})
				}
		 		for(var i=0;i<data.data[5].length;i++){
		 			ids=[
		 				'<li><img src="/upload/'+data.data[5][i].news_image+'" /></li>'
		 			].join("");
		 			$("#baoyang_scoll ul").append(ids);
		 		}
		 	}
		 		
		 }
		 //精品推荐上树
		 OnTree.prototype.$ontree=function(data){//上树
		 		var self=this;
		 		var nature=[];   //性质   如名称
		 		for(var i=0;i<data.data.length;i++){
		 			if(nature.indexOf(data.data[i].name) == -1) {　　　　
							nature.push(data.data[i].name);　　
					}
		 		}
		 		var property=[];
		 		for(var i=0;i<data.data.length;i++){
		 			if(nature.indexOf(data.data[i].name) == -1) {　　　　
						property.push(data.data[i].name);　　
					}
		 		}
		 		var ids;
		 		
		 		for(var i=0;i<nature.length;i++){
		 				ids = [
							'<li><span>'+nature[i]+' :</span><p>',
							'<a class="hover">全部</a>',
							'</p></li>'
						].join("");
						$(".refer>ul").append(ids);
						
					for(var j=0;j<data.data[i].details.split("*/*").length;j++){
						if(data.data[i].name==nature[i]){
							ids = [
								'<a>'+data.data[i].details.split("*/*")[j]+'</a>'
							].join("");
							$(".refer>ul li p").eq(i).append(ids);
						}
					}
					
		 		}
		 		self.$common();
		 }
		 /*************************************/
		 OnTree.prototype.$common=function(){//普通jQuery
		 			
		 			var width=0;
			  function Marquee(){
			  	//console.log($("#baoyang_scoll ul").innerHeight());
			  	  if(width>=$("#baoyang_scoll ul").innerHeight()){
			  	  		$("#baoyang_scoll").append($("#baoyang_scoll ul:first"));
			  				width=20;
			  	  }else{
			  	  	$("#baoyang_scoll").scrollTop(width++);
			  	  }
			  }
				 var MyMar=setInterval(Marquee,20);
				 $("#baoyang_scoll").mouseover(
				      function(){
					     clearInterval(MyMar);
					  }
				   );
				   $("#baoyang_scoll").mouseleave(
				      function(){
					     MyMar=setInterval(Marquee,20);
					  }
				   );
				 }
		 new OnTree();
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
});