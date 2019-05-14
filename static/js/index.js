$(function(){
		 function OnTree(){
		 	   this.$ajax();
		 	   this.$common();
		 }
		 
		 
		 OnTree.prototype.$ajax=function(){//ajax拉取
		 		var self=this;
		 		 $.ajax({
					type:"get",
					url:"/a",
					async:true,
					success:function(data,textStatus){
						if(data.result){
							
							self.$ontree(data);
						}
					},	
					error:function(XMLHttpRequest,textStatus,errorThrown){
						alert(textStatus);
						alert(errorThrown);
					}
				});
	   		 $.get("/b",function(data){
	   		 	 	if(data.result){
	                   	self.$ontree1(data);
	                }
	   		 });
		 }
		 OnTree.prototype.$ontree=function(data){//上树
		 	//轮播
		 	var img_amount=0;   //轮播数量
		 	var ids;             //储存上树内容
		 	//console.log(data.img_src);
		 	for(var i=0;i<data.data.length;i++){
		 		if(data.data[i].iscarousel==1){
		 			for(var j=0;j<data.img_src.length;j++){
		 				if(data.img_src[j].C_ID==data.data[i].ID){
		 					$(".lunbo .shutter-img a").eq(img_amount).prop("href","");
		 					ids = [
							'<img src="/upload/'+data.img_src[j].image_url+'" >'
							].join("");
							$(".lunbo .shutter-img a").eq(img_amount).append(ids);
							img_amount++;
		 				}
		 			}
		 		}
		 	}
		 	
		 	//明星产品2
		 	for(var i=0;i<data.data.length;i++){
		 		if(data.data[i].isstar_pro==1){
		 			for(var j=0;j<data.img_src.length;j++){
		 				if(data.img_src[j].C_ID==data.data[i].ID){
		 					ids = [
		 						'<li><a href="details?id='+data.data[i].ID+'"><img src="/upload/'+data.img_src[j].image_url+'"></a></li>'
		 					].join("");
		 					$(".produt_picture ul").append(ids);
		 				}
	 				}
		 		}
		 	}
		 }
		 OnTree.prototype.$ontree1=function(data){//上树
		 		var ids;
				for(var i=0;i<data.data.length;i++){
					var str_ri=data.data[i].news_time.split("-")[2];
					var str_qi=data.data[i].news_time.split("-")[0]+"-"+data.data[i].news_time.split("-")[1];
						ids = [
		 					'<li><a href="newsContent?id='+data.data[i].ID+'"><div class="new_time"><p>'+str_ri+'</p><p>'+str_qi+'</p></div>',
		  	 				'<div class="new_title"><h3>'+data.data[i].news_title.slice(0,20)+'</h3><p>'+delHtmlTag(data.data[i].news_content).slice(0,35)+'...</p></div></a></li>'	
		 				].join("");
		 				$(".news_font ul").append(ids);
				}
		 	}
		 OnTree.prototype.$common=function(){//普通jQuery
		 			var width=0;
				  function Marquee(){
				  	  if(width>=$(".produt_picture ul").eq(0).innerWidth()+20){
				  	  		$(".produt_picture").append($(".produt_picture ul:first"));
				  				width=20;
				  	  }else{
				  	  	$(".produt_picture").scrollLeft(width++);
				  	  }
				  }
					 var MyMar=setInterval(Marquee,20);
					 $(".produt_picture").mouseover(
					      function(){
						     clearInterval(MyMar);
						  }
					   );
					   $(".produt_picture").mouseleave(
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