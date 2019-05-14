$(function(){
	//组件
	 function OnTree(){
		 	   this.$ajax();
		 	   this.$common();
		 }
		 OnTree.prototype.$ajax=function(){//ajax拉取
		 		var self=this;
		 		$.get("/newsContent/a",function(data){
		 			if(data.result){
		 				//console.log(data);
		 				self.$ontree(data);
		 			}
		 		});
		 }
		 OnTree.prototype.$ontree=function(data){//上树
		 		self = this;
		 		var ids;
		 		ids = [
		 			'<h1>'+data.data.news_title+'</h1>',
					'<p>发布日期：'+data.data.news_time.split("-")[0]+'年',
					+data.data.news_time.split("-")[1]+'月'+data.data.news_time.split("-")[2]+'日</p>'
		 		].join("");
		 		$(".new_Title").append(ids);
		 		$(".new_Con").append(data.data.news_content);
		 }
		 OnTree.prototype.$common=function(){//普通jQuery
		 			
		 }
		 new OnTree();
});