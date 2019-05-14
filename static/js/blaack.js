$(function(){
	var idx=0;
	$("#jiameng_lf ul a").click(function(){
		$(this).parent().parent().children().children().removeClass("hover");
		$(this).addClass("hover");
		idx=$(this).parent().index();
		$("#jiameng_rt").children().css("display","none");
		$(".Text").eq(idx).css("display","inline-block");
	});
	
	$("#jiameng_lf ul a").mouseover(function(){
		for(var i=0;i<$("#jiameng_lf ul a").length;i++){
			if($("#jiameng_lf ul a").eq(i).hasClass("hover")){
				$("#jiameng_lf ul a").eq(i).removeClass("hover");
				idx=i;
			}
		}
	});
	$("#jiameng_lf ul a").mouseout(function(){
		$("#jiameng_lf ul a").eq(idx).addClass("hover");
	});
	
	
	//组件
	 function OnTree(){
		 	   this.$ajax();
		 	   this.$common();
		 }
		 OnTree.prototype.$ajax=function(){//ajax拉取
		 		var self=this;
		 }
		 OnTree.prototype.$ontree=function(){//上树
		 				
		 }
		 OnTree.prototype.$common=function(){//普通jQuery
		 			
		 }
		 new OnTree();
});
