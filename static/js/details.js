$(function(){
	//组件
	 function OnTree(){
		 	   this.$ajax();
		 	   this.$common();
		 }
		 OnTree.prototype.$ajax=function(){//ajax拉取
		 		var self=this;
		 		$.get("/details/a",function(data){
	   		 	 	if(data.result){
	                   	self.$ontree(data);
	                }
	   		 	});
	   		 	$.get("/details/b",function(data){
	   		 	 	if(data.result){  
	                   	self.$ontree1(data);
	                }
	   		 	});
	   		 	$.get("/details/c",function(data){
	   		 	 	if(data.result){ 
	   		 	 		
	                   	self.$ontree2(data);
	                }
	   		 	});
		 }
		 OnTree.prototype.$ontree=function(data){//上树
		 		var self=this;	
		 		//查询项上树
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
		 		self.$ajax1();
		 }
		  OnTree.prototype.$ontree1=function(data){//上树
					//		 列表项上树
					var ids;
					for(var i=0;i<data.data.length;i++){
						for(var j=0;j<data.img_src.length;j++){
							if(!data.img_src[j]){
								continue;
							}
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
		  OnTree.prototype.$ontree2=function(data){//上树
		  		//详情页面
		  		var ids;
		  		
		  		for(var i=0;i<data.img_src.length;i++){
		  			if(data.img_src[i].main_iamge==1){
		  				ids = [
				  			'<img src="/upload/'+data.img_src[i].image_url+'" />'
				  		].join("");
				  		$(".details_img div").before(ids);
				  		ids = [
				  			'<li><img src="/upload/'+data.img_src[i].image_url+'" class="hover" /></li>'
				  		].join("");
				  		$(".details_img div ul").append(ids);
				  		 break;
		  			}
		  		}
		  		for(var i=0;i<data.img_src.length;i++){
		  			if(data.img_src[i].main_iamge!=1){
		  				ids = [
				  			'<li><img src="/upload/'+data.img_src[i].image_url+'" /></li>'
				  		].join("");
				  		$(".details_img div ul").before(ids);
		  			}
		  		}
		  		var property;
		  		property = data.data[0].nature_details;
		  		property = property.split('*/*');
		  		$(".refer ul li p a").removeClass();
		  		var mount=0;
		  		for(var i=0;i<$(".refer>ul li p").length;i++){
		  				mount=0;
		  			for(var j=0;j<$(".refer>ul li p").eq(i).children("a").length;j++){
		  				if(property[i]==$(".refer>ul li p").eq(i).children("a").eq(j).text()){
		  						mount++;
		  						$(".refer>ul li p").eq(i).children("a").eq(j).addClass("hover");
		  						break;
		  				}
		  			}
		  			if(mount == 0){
			  			 $(".refer>ul li p").eq(i).children("a").eq($(".refer>ul li p").eq(i).children("a").length-1).addClass("hover")
			  			}
		  		}
		  		property=property.join(' | ');
		  		property=property+" "+data.data[0].name;
		  		$(".details_font h3").append(property);
		  		$(".details_font p").append(delHtmlTag(data.data[0].details_carousel));
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
							stuff.push($(".refer>ul li p").eq(i).children().eq(j).index()+1);
						}
					}
				}
				
				stuff = stuff.join("/");
//				$.ajax({
//	            type:"post",
//	            url:"/details/a",
//	            data:{'stuff':stuff},
//	            async:true,
//	            success:function(data,textStatus){
//	                if(data.result==1){
//	                	alert("yy");
//	                }
//	            },	
//	            error:function(XMLHttpRequest,textStatus,errorThrown){
//	                alert(textStatus);
//	                alert(errorThrown);
//	            }
//				});
				window.location.href="./productCenter?id=1&Stuff="+stuff;
			}); 
		  }
		 OnTree.prototype.$common=function(){//普通jQuery
		 	
		 	
		 	
		 	$(".details_img>div img").click(function(){
				var ImgSrc;
				$(this).parent().parent().children().children().removeClass("hover");
				$(this).addClass("hover");
				$(".details_img>img").attr("src",$(this).attr("src"));
			});
			var btn_w=0;
			btn();
			$(".btn_L").click(function(){
				btn_w-=157;
				$(".details_img>div").scrollLeft(btn_w);
				btn();
			});
			$(".btn_R").click(function(){
				btn_w+=157;
				$(".details_img>div").scrollLeft(btn_w);
				btn();
			});
			function btn(){
				if($('.details_img>div').innerWidth()+btn_w>=$('.details_img>div ul').innerWidth()){
					$(".btn_R").css("display","none");
				}else{
					$(".btn_R").css("display","inline-block");
				}
				if(btn_w<=0){
					$(".btn_L").css("display","none");
				}else{
					$(".btn_L").css("display","inline-block");
				}
			}			
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
