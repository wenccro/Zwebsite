$(function(){
	//组件
	 function OnTree(){
		 	   this.$ajax();
		 	   this.$common();
		 }
		 OnTree.prototype.$ajax=function(){//ajax拉取
		 		var self=this;
		 		$.get("/news/a",function(data){
		 			if(data.result){
		 				self.$ontree(data);
		 			}
		 		});
		 }
		 OnTree.prototype.$ontree=function(data){//上树
		 		//头条
		 		self=this;
		 		var ids;
		 		ids =[ 
		 			'<a href="newsContent?id='+data.data[data.data.length-1].ID+'"><h2>'+data.data[data.data.length-1].news_title.slice(0,20)+'</h2>',
					'<p>'+delHtmlTag(data.data[data.data.length-1].news_content).slice(0,50)+'...</p></a>'
		 		].join("");
		 		$(".head_news").append(ids);
		 		ids = [
		 			'<a href="newsContent?id='+data.data[data.data.length-1].ID+'"><img  src="/upload/'+data.data[data.data.length-1].news_image+'"/><span>'+data.data[data.data.length-1].news_title+'</span></a>'
		 		].join("");
		 		$(".news_Img p").before(ids);
		 		for(var i=0;i<data.data.length-1;i++){
		 			var str_ri=data.data[i].news_time.split("-")[2];
					var str_qi=data.data[i].news_time.split("-")[0]+"-"+data.data[i].news_time.split("-")[1];
		 			ids=[
		 				'<li><div class="new_Time">',
							 '<p>'+str_ri+'</p>',
		  	 				'<p>'+str_qi+'</p></div>',
						'<div class="new_title">',
	  	 					'<h3><a href="newsContent?id='+data.data[i].ID+'">'+data.data[i].news_title.slice(0,20)+'</a></h3>',
	  	 					'<p>'+delHtmlTag(data.data[i].news_content).slice(0,30)+'...</p>',
	  	 					'<a href="newsContent?id='+data.data[i].ID+'"><b></b></a>',
		  	 			'</div></li>'
		 			].join("");
		 			$(".time_news ul").append(ids);
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
		 		for(var i=0;i<2;i++){
		 			ids= [
		 				 '<a href="news_con?id='+data.data[i].ID+'"><img src="/upload/'+data.data[i].news_image+'"><span>'+data.data[i].news_title.slice(0,10)+'</span></a>'
		 			].join("");
		 			$(".news_Img p").append(ids);
		 		}
		 		self.$common();
		 }
		 OnTree.prototype.$common=function(){//普通jQuery
		 			$(".new_title>a").mouseover(function(){
						$(this).children().css("border-bottom","2px solid #fff");
						$(this).children().css("border-right","2px solid #fff");
					});
					$(".new_title>a").mouseout(function(){
						$(this).children().css("border-bottom","2px solid #a39896");
						$(this).children().css("border-right","2px solid #a39896");
					});
		 }
		 new OnTree();
});
