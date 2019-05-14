(function(){//这是一个控制所有列表页面切换的
	window.onload=function(){
		$(".home_lun").click(function(){
			$(".admin .lun").removeClass("hidden").siblings().addClass('hidden')
		})
		$(".home_sm").click(function(){
			$(".admin .sm").removeClass("hidden").siblings().addClass('hidden');
		})
		$(".pro_tz").click(function(){
			$(".admin .tz").removeClass("hidden").siblings().addClass('hidden');
		})
		$(".pro_tzm").click(function(){
			$(".admin .tzm").removeClass("hidden").siblings().addClass('hidden');
		})
		$(".new_z").click(function(){
			$(".admin .newss").removeClass("hidden").siblings().addClass('hidden');
		})
		$(".home_maintain").click(function(){
			$(".admin .by").removeClass("hidden").siblings().addClass('hidden');
		})
		$(".pro_telephone").click(function(){
			$(".admin .s-list").removeClass("hidden").siblings().addClass('hidden');
		})
	}
})()
