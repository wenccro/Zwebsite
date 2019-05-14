/*$(function(){
//	 $("#footer-right button").click(function(){
//	 	var name=$(".form p").eq(0).children().val();
//	 	var phone=$(".form p").eq(1).children().val();
//	 	var content=$(".form p").eq(2).children().val();
//	 	console.log(name,phone,content)
//	 	if(phone!=''){
//	 		
//	 	}
//	 		
//	 	$.ajax({
//      type:"post",
//      url:"/b",
//      data:{
//      'name':,
//      'phone':,
//      'content':
//      },
//      async:true,
//      success:function(data,textStatus){
//          if(data.result==1){
//             	alert("提交成功");
//          }else if(data.result==0){
//          	alert("提交失败");
//          }
//          location.reload();
//      },	
//      error:function(XMLHttpRequest,textStatus,errorThrown){
//          alert(textStatus);
//          alert(errorThrown);
//      }
//	 });
	
	

 	var phone='';
 	$("#phone").click(function(){//点击时给提交按钮添加不可选中状态
 		$("#footer-right button").attr('disabled',true);
 		$("#footer-right button").css("background-color","#959995");
 		
 	})
 	$("#phone").blur(function(){//离开电话号码时，获取电话号码
 	 var phone=$(".form p").eq(1).children().val();
 		if(phone!=''){//可以提交
 			$("#footer-right button").attr('disabled',false);
 			$("#footer-right button").css("background-color","#ef5450");
 		}
 	})
 		
	$("#sub_data").click(function(){
		var name=$(".form p").eq(0).children().val();
		var	phone=$(".form p").eq(1).children().val();
		var content=$("#cct").val();
		//console.log(name,phone,content);
		if(phone!=''){//再次确认有电话号码
			$("#footer-right button").attr('disabled',false);
			$.ajax({
		        type:"post",
		        url:"/b",
		        data:{
		        	'name':name,
	        		'phone':phone,
		       		'content':content
		        },
		        async:true,
		        success:function(data,textStatus){
		            if(data.result==1){
		               	alert("提交成功");
		            }else if(data.result==0){
		            	alert("服务器出处了");
		            }
		            location.reload();
		        },	
		        error:function(XMLHttpRequest,textStatus,errorThrown){
		            alert(textStatus);
		            alert(errorThrown);
		        }
		     });	
		 	if(name==''||phone==''||content==''){
		 		$(".promp").empty();
		 		$(".promp").append("<span class='errphone'>请将信息填写完整！</span>");
		 	}
		}
	 		
 	});
	
	 var moun = 0;
	 for(var i=0;i<$(".nav li a").length;i++){
	 		if($(".nav li a").eq(i).hasClass("hover")){
	 			moun = i;
	 		}
	 	}
	 $(".nav ul").mouseover(function(){
	 	$(".nav li a").removeClass("hover");
	 });
	 $(".nav li").mouseout(function(){
	 	
	 	$(".nav li a").eq(moun).addClass("hover");
	 	
	 });
	 
		 var lazyLoad = (function(){
		var clock;
		
		function init(){
		$(window).on("scroll", function(){
		if (clock) {
			clearTimeout(clock);
		}
		clock = setTimeout(function(){
			checkShow();
				}, 200);
			})
			checkShow();
		}
			
		function checkShow(){
			$(".lunbo img").each(function(){
				var $cur =$(this);
				if($cur.attr('isLoaded')){
		    		return;
		  		}
				if(shouldShow($cur)){
					showImg($cur);
				}
			})
		}
		function shouldShow($node){
			var scrollH = $(window).scrollTop(),
				winH = $(window).height(),
				top = $node.offset().top;
			if(top < winH + scrollH){
		  		return true;
		  	}else{
		  		return false;
		  	}
		}
		function showImg($node){
			$node.attr('src', $node.attr('data-img'));
			$node.attr('isLoaded', true);
		}
		return {
			init: init
		}
		})()
		lazyLoad.init();
		$(".form input").eq(1).blur(function(){
			if(!$(".form p").eq(1).children().val()){
				$(".form p").eq(1).children().attr("value","请您输入电话号码");
				$(".form p").eq(1).children().css("border","1px solid #c00");
				$(".form p").eq(1).children().css("color","#c00");
			}
		});
		$(".form input").eq(1).focus(function(){
			$(".form p").eq(1).children().attr("value","");
			$(".form p").eq(1).children().css("border","1px solid #000");
				$(".form p").eq(1).children().css("color","#000");
		});
		//手机号码验证
		function isPhoneAvailable(q) {
		   var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
		   if (!myreg.test(q)){
		   // return false;
		   	   	$(".promptphone").empty();
			   	$(".promptphone").append("<b class='errphone'>手机号码输入错误！</b>");
			   	$("#phone").val("");
		    } else {
				$(".promptphone").empty();
		    	$(".promptphone").append("<b class='okphone'>手机号码输入正确！</b>");
		    return true;
		    }
		};

		$("#phone").change(function(e){
		    var stR = $("#phone").val();
		    isPhoneAvailable(stR);
		});
});
*/
$(function(){
	$("#sub_data").click(function(){
		var name=$(".form p").eq(0).children().val();
		var	phone=$(".form p").eq(1).children().val();
		var content=$("#cct").val();
		if (phone=='') {
			alert("请输入手机号！");
		}else{//再次确认有电话号码
			isPhoneAvailable();
			if(isPhoneAvailable()==true){
				console.log("2");
				$.ajax({
			        type:"post",
			        url:"/b",
			        data:{
			        	'name':name,
		        		'phone':phone,
			       		'content':content
			        },
			        async:true,
			        success:function(data,textStatus){
			            if(data.result==1){
			               	/*$(".promp").empty();
			 				$(".promp").append("<span class='okphone'>恭喜您提交成功了！</span>");*/
			 				alert("恭喜您提交成功了！");
			            }else if(data.result==0){
			            	/*$(".promp").empty();
			 				$(".promp").append("<span class='errphone'>提交失败了！</span>");*/
			 				alert("提交失败了！");
			            }
			            location.reload();
			        },	
			        error:function(XMLHttpRequest,textStatus,errorThrown){
			            alert(textStatus);
			            alert(errorThrown);
			        }
			     });	
			}else if(isPhoneAvailable()==false){
				alert("手机号码错误！");
				$("#phone").val("");
				console.log(1);
			}
		}	
 	});
	
	 var moun = 0;
	 for(var i=0;i<$(".nav li a").length;i++){
	 		if($(".nav li a").eq(i).hasClass("hover")){
	 			moun = i;
	 		}
	 	}
	 $(".nav ul").mouseover(function(){
	 	$(".nav li a").removeClass("hover");
	 });
	 $(".nav li").mouseout(function(){
	 	
	 	$(".nav li a").eq(moun).addClass("hover");
	 	
	 });
	 
		 var lazyLoad = (function(){
		var clock;
		
		function init(){
		$(window).on("scroll", function(){
		if (clock) {
			clearTimeout(clock);
		}
		clock = setTimeout(function(){
			checkShow();
				}, 200);
			})
			checkShow();
		}
			
		function checkShow(){
			$(".lunbo img").each(function(){
				var $cur =$(this);
				if($cur.attr('isLoaded')){
		    		return;
		  		}
				if(shouldShow($cur)){
					showImg($cur);
				}
			})
		}
		function shouldShow($node){
			var scrollH = $(window).scrollTop(),
				winH = $(window).height(),
				top = $node.offset().top;
			if(top < winH + scrollH){
		  		return true;
		  	}else{
		  		return false;
		  	}
		}
		function showImg($node){
			$node.attr('src', $node.attr('data-img'));
			$node.attr('isLoaded', true);
		}
		return {
			init: init
		}
		})()
		lazyLoad.init();
		$(".form input").eq(1).blur(function(){
			if(!$(".form p").eq(1).children().val()){
				$(".form p").eq(1).children().attr("value","");
				$(".form p").eq(1).children().css("border","0 none");
				/*$(".form p").eq(1).children().css("color","#c00");*/
			}
		});
		$(".form input").eq(1).focus(function(){
			$(".form p").eq(1).children().attr("value","");
			$(".form p").eq(1).children().css("border","0 none");
			/*$(".form p").eq(1).children().css("color","#000");*/
		});
	//手机号码验证
	function isPhoneAvailable() {
		var phone=$("#phone").val();
	   	var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
	   	if (!myreg.test(phone)){
	  		return false;		   	
	    } else {
	    	return true;
	    }
	};
		
});