
/*!
 * jQuery simple page plus v1.0
 * http://t.qq.com/websole 
 * Author:sole
 * Mail:macore@163.com
 * Created:2012/10/31
 * Copyright 2012 - http://t.qq.com/websole 
*/
$.extend({
	//obj:分页对象;  noeNum:当前页；  allNum:总页数；  callBack：回调函数
	simplePage : function(opt){

		if(!opt.obj){ return false; };
		var obj = $(opt.obj); 
		var nowNum = opt.nowNum || 1; 
		var allNum = opt.allNum || 5; 
		var callBack = opt.callBack || function(){};
		var apd_ele = "";
		var Stuff = opt.Stuff || "";
		function ele(num, cls){
			var str = "";
			if(cls){
				str = "<a href='productCenter?page="+num+"&Stuff="+Stuff+"'class='"+cls+"'>"+num+"</a>";
			}else{
				str = "<a href='productCenter?page="+num+"&Stuff="+Stuff+"'>"+num+"</a>";
			}
			return str;
		}

		if(nowNum > 1){
			apd_ele = "<a href='productCenter?page="+ ( nowNum - 1 ) +"&Stuff="+Stuff+"'><<</a>";
			obj.append(apd_ele);
		}

		if(allNum <= 5){
			for(var i=1; i<=allNum; i++){
				if(nowNum == i){
					apd_ele = ele(i, "now");
				}else{
					apd_ele = ele(i);
				}
				obj.append(apd_ele);
			}
		}else{
			for(var i=1; i<=5; i++){
				if(nowNum == 1 || nowNum == 2){
					if(nowNum == i){
						apd_ele = ele(i, "now");
					}else{
						apd_ele = ele(i);
					}
				}else if( (allNum - nowNum) == 0 || (allNum - nowNum) == 1 ){
					if( (allNum - nowNum) == 0 && i == 5){
						apd_ele = ele( (allNum - 5 + i), "now");
					}else if( (allNum - nowNum) == 1 && i == 4){
						apd_ele = ele( (allNum - 5 + i), "now");
					}else{
						apd_ele = ele( allNum - 5 + i );
					}
				}else{
					if(i == 3){
						apd_ele = ele(nowNum-3+i, "now");
					}else{
						apd_ele = ele(nowNum-3+i);
					}
				}
				
				obj.append(apd_ele);
			}
		}

		if((allNum - nowNum) >= 1){
			apd_ele = "<a href='productCenter?page="+ ( parseInt(nowNum) + 1 ) +"&Stuff="+Stuff+"'>>></a>";
			obj.append(apd_ele);	
		}
		
		callBack(nowNum, allNum);

		obj.find("a").click(function(){
			var nowNum = parseInt($(this).attr("href").substring(17));
			obj.html("");
			$.simplePage({
				obj : "#page",
				nowNum : nowNum,
				allNum : allNum,
				callBack :callBack,
				Stuff	:Stuff
			});
			return true;
		});

	}
});