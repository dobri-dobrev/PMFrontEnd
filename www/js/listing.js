var AUDIOPLAYER;
var BASE_URL= "http://vast-shelf-7018.herokuapp.com/";
var POLLINGADDRESS= BASE_URL+"jokes.json";


//ajax poll for jokes (general)

$("#jokeList").live('pagebeforeshow', function(){
                    var token =window.localStorage.getItem("access_token");
                    console.log(token);
                    $.ajax({
                           url: POLLINGADDRESS,
                           dataType: "json",
                           data: {
                            'access_token': token
                           },
                           success: ajaxDone,
                           error: ajaxError
                           });
                    
                    }); 

function ajaxDone(data){
    $("#jokeListing").empty();
    
    
    for(var i=0; i<data.length; i++){

            printListEntry(data[i].jokename, data[i].audio_file_name, data[i].likes, data[i].url);
            
    }
    $('#jokeListing').listview('refresh');
}

function ajaxError(request, status, error){
   alert("Sorry, couldn't connect to server!");
}

function printListEntry( name, file, likes, url){
	
	var liStart= "<li ><div data-role='controlgroup' data-type='horizontal' style='float: right'>";
    liStart+= '<a href="#" data-role="button" class= "likeButton">Like </a>';
    liStart+= '<a href="#" data-role= "button" class = "playButton" data-playing="false" data-theurl="'+url+'">Play </a> </div>';
    var liMid= "<h3>"+name+"</h3>";
    var liEnd= "<p>from: "+ file+"</p>";
    liEnd+= "<p>likes: "+likes+ "</p></li>";
    console.log(liStart+liMid+liEnd);
    $("#jokeListing").append(liStart+liMid+liEnd); 


}

$('.playButton').live('click', function(e) {
        console.log("clicked");
        e.preventDefault();
        var me= $(this);
        theurl= me.attr('data-theurl');
        
        if(me.attr("data-playing")==="true"){
        	AUDIOPLAYER.pause();
        	me.attr("data-playing", "false");
        }
        else{


	        if(AUDIOPLAYER){
	        	console.log("not audioplayer");
	        	AUDIOPLAYER.pause();
	        }
	        else{
	        	console.log("audioplayer");
	        	
	        }

	        AUDIOPLAYER= new Audio(theurl);
	 		AUDIOPLAYER.play();
	 		me.attr("data-playing", "true");
 		}
 }); 


/*function playStream() {
    try {
        if(!myaudio){
            myaudio = new Audio(BASE_URL+'t.m4a');
            myaudio.id = 'playerMyAdio';
        }
        
        myaudio.play();
    } catch (e) {
        alert('no audio support!');
    } 
}
function stopStream(){
    myaudio.pause();
}

*/

