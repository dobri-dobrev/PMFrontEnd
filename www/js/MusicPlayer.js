var CURRENTLY_PLAYING=0;


function listPlayListener(){
		var image = $(this).find(':first-child');
		//case clicking to pause
		if(image.hasClass("list-playing-flag")){

			image.attr('src', "css/images/list-play.png");
			image.removeClass("list-playing-flag");
			CURRENTLY_PLAYING=0;
		}
		//case clicking to play
		else{
			//case something is playing already
			if(CURRENTLY_PLAYING==1){
				$(".list-playing-flag").attr('src',"css/images/list-play.png");
				$(".list-playing-flag").removeClass("list-playing-flag");	
			}

			image.attr('src', "css/images/list-pause.png");
			image.addClass("list-playing-flag");

			CURRENTLY_PLAYING=1;
		}
		
		
	}