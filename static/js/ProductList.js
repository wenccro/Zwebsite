$(function(){
	//组件
	 function OnTree(){
		 	   this.$ajax();
		 	   this.$common();
		 }
		 OnTree.prototype.$ajax=function(){//ajax拉取
		 		var self=this;
		 		$.get("/productCenter/a",function(data){
	   		 	 	if(data.result){
	                   	self.$ontree(data);
			            $.get("/productCenter/b",function(data){
			   		 	 	if(data.result){  
			   		 	 		data.Stuff = data.Stuff.join("/");
			                   	self.$ontree1(data);
			                }
			   		 	});
	                }
	   		 	});
//	   		 	$.get("/productCenter/b",function(data){
//	   		 	 	if(data.result){  
//	   		 	 		data.Stuff = data.Stuff.join("/");
//	                   	self.$ontree1(data);
//	                }
//	   		 	});
		 }
		 
		 OnTree.prototype.$ontree=function(data){//上树
		 		//查询项上树
		 		
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
		 OnTree.prototype.$ontree1=function(data){//上树
//					 列表项上树
			var ids;
			$.simplePage({
				obj : "#page",
				nowNum : data.Page,
				allNum : data.AllPage,
				Stuff  : data.Stuff
			});
			//console.log(data);
			for(var i=0;i<data.data.length;i++){
				for(var j=0;j<data.img_src.length;j++){
					if(data.img_src[j]!=null){
						if(data.img_src[j].C_ID==data.data[i].ID){
							ids = [
							'<li><a href="details?id='+data.data[i].ID+'"><img src="/upload/'+data.img_src[j].image_url+'" />',
				 			'<h5>'+data.data[i].name+'</h5></a></li>'
							].join("");
							$(".list ul").append(ids);
						}
					}	
				}
			}
				//修改
		 		var property;
		  		property = data.Stuff;
	  			property = property.split('/');
	  			//console.log(property);
		  		$(".refer ul li p a").removeClass("hover");
		  		for(var i=0;i<$(".refer>ul li p").length;i++){
		  			$(".refer>ul li p").eq(i).children().eq(property[i]-1).addClass("hover");
		  		}
//		  		var mount=0;
//		  		for(var i=0;i<$(".refer>ul li p").length;i++){
//		  				mount=0;
//		  			for(var j=0;j<$(".refer>ul li p").eq(i).children("a").length;j++){
//		  				if(property[i]==$(".refer>ul li p").eq(i).children("a").eq(j).text()){
//		  						mount++;
//		  						$(".refer>ul li p").eq(i).children("a").eq(j).addClass("hover");
//		  						break;
//		  				}
//		  			}
//		  			if(mount == 0){
//			  			 $(".refer>ul li p").eq(i).children("a").eq($(".refer>ul li p").eq(i).children("a").length-1).addClass("hover")
//			  			}
//		  		}
		  		
		  		 this.$ajax1();
		 }
		  OnTree.prototype.$ontree2=function(data){//上树
		  	var self = this;
		  		//查询改变
		  		//console.log(data);
		  		
		  		var stuff = [];
		  		for(var i=0;i<$(".refer>ul li").length;i++){
					for(var j=0;j<$(".refer>ul li p").eq(i).children().length;j++){
						if($(".refer>ul li p").eq(i).children().eq(j).hasClass("hover")){
							stuff.push($(".refer>ul li p").eq(i).children().eq(j).index()+1);
						}
					}
				}
		  		
		  		stuff = stuff.join("/");
		  		$(".list>ul").children().remove();
		  		$("#page").children().remove();
		  		var ids;
		  		data.Stuff = data.Stuff.split(",");
		  		data.Stuff = data.Stuff.join("/");
			$.simplePage({
				obj : "#page",
				nowNum : data.Page,
				allNum : data.AllPage,
				Stuff  : stuff
			});
			for(var i=0;i<data.data.length;i++){
				
				for(var j=0;j<data.img_src.length;j++){
					if(data.img_src[j].C_ID==data.data[i].ID){
						ids = [
						'<li><a href="details?id='+data.data[i].ID+'"><img src="/upload/'+data.img_src[j].image_url+'" />',
			 			'<h5>'+data.data[i].name+'</h5></a></li>'
						].join("");
						$(".list ul").append(ids);
					}	
				}
			}
			
		  }
		  OnTree.prototype.$ajax1=function(){//ajax拉取
		  	var self= this;
		  	$(".refer ul li p a").click(function(){
				$(this).parent().children().removeClass("hover");
				$(this).addClass("hover");
				var stuff = [];
				for(var i=0;i<$(".refer>ul li").length;i++){
					for(var j=0;j<$(".refer>ul li p").eq(i).children().length;j++){
						if($(".refer>ul li p").eq(i).children().eq(j).hasClass("hover")){
							stuff.push($(".refer>ul li p").eq(i).children().eq(j).html());
						}
					}
				}
				stuff = stuff.toString("*/*");
				$.ajax({
	            type:"post",
	            url:"/productCenter/a",
	            data:{'stuff':stuff},
	            async:true,
	            success:function(data,textStatus){
	                if(data.result==1){
	                   	self.$ontree2(data);
	                }
	            },	
	            error:function(XMLHttpRequest,textStatus,errorThrown){
	                alert(textStatus);
	                alert(errorThrown);
	            }
				});
			}); 
		  }
		  
		 OnTree.prototype.$common=function(){//普通jQuery
		 	var self=this;
			$('.refer ul li').eq($('.refer>ul li').length-1).css("border","0");
		}	
		
		 new OnTree();
});
