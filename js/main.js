jQuery(document).ready(function(){

	// 按回车键获取到文本框的值
	getData()
	$('#headerGet').on('keydown',function(e){

		if(e.keyCode == 13){

			// console.log(1)
			var param = $(this).val();
			// console.log(param);
			getData(param)
		}
	});
	function getData(param){
		var param = param ? param : "深圳";
		$.ajax({
			type:'get',
			//url:'http://api.jisuapi.com/weather/query?appkey=eee8cacbc1e612cd&city=上海',
			url:'https://v.juhe.cn/weather/index',
			data:{
                key:"46380a15835d66ba3aca3b12164e6e05",
                dtype:"",
                format:"",
				cityname:param
			},
			dataType:'jsonp',
			jsonp:'callback',
			success:function(json){
				console.log(json);
				var html = template('tmplt',json);
				$('#ulLists').html(html);
			}
		})
	}
	

})
