jQuery(document).ready(function(){

	// 按回车键获取到文本框的值
	getData()
	$('.seachBtn').on('click',function(e){
            var param = $('.intCity').val();
            if(param.length==0) {
                alert("请输入城市名字");

            }
            else{
                //console.log(param);
                 getData(param)
              }

	});
	function getData(param){
		var param = param ? param : "深圳";
		$.ajax({
			type:'get',
			//url:'http://api.jisuapi.com/weather/query?appkey=eee8cacbc1e612cd&city=上海',
			url:'http://v.juhe.cn/weather/index',
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
				getIcon(json.result.today.weather);
			}
		})


	}

	function getIcon(weather){
        $.ajax({
            //请求地址：http://v.juhe.cn/weather/uni
            //请求参数：dtype=&key=46380a15835d66ba3aca3b12164e6e05
            //请求方式：GET
            type:'get',
            url:'http://v.juhe.cn/weather/uni',
            data:{
                key:"46380a15835d66ba3aca3b12164e6e05",
                dtype:"",

            },
            dataType:'jsonp',
            jsonp:'callback',
            success:function(json){
                console.log(json);
                var nowTime = new Date();
                var hh = nowTime.getHours();
               for(var i=0;i<json.result.length;i++){
                     if(json.result[i].weather==weather.split("转")[0]){
                         if(hh>20||hh<8){
                             var icon_src="weather_icon/g2/120x120/night/"+json.result[i].wid+".png"
                         }
                         else{
                             var icon_src="weather_icon/g2/120x120/day/"+json.result[i].wid+".png"
                         }

                        var html = template('tmplt_icon',{icon_src});
                         //console.log(json.result[i]);
                        //console.log(json.result[i].weather);

                    }


				}


                $('#icon').html(html);
            }
        })
	}
	

})