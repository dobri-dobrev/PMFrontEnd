//problem with listview
//when switching from one category to another does not bring you to the top

var MAX_NAME_LENGTH= 25;
var MAX_TITLE_LENGTH = 40;
var LIST_ENTRY_CLASS_BUFFER= "";
//THINK ABOUT LIST SWITHING AND MAINTAINING THE PLAYING STATE IN THE UI...
function ListView(){
	this.initialize = function(){
		var deferred = $.Deferred();
		if(memoryLayer.hasJokes() != 0){
			this.populateNew();
		}
		else{
			putLoadingMessageOnListView();
			console.log("put loading message");
		}
		deferred.resolve();
		return deferred.promise();
	};
	this.populateNew = function(){
		//default joke list is the NEW one
		memoryLayer.getNewJokes().done(
			function(records){
				var entriesString="";
				for(var i=0; i<records.length; i++){
					//odd and even stuff
					if(i%2==0){
						entriesString+= generateListEntry(records[i], 1);
					}
					else{
						entriesString+= generateListEntry(records[i], 0);
					}
					
				}
				$("#list_view").html(entriesString);
				renewEventListeners();
				
				
			}
			);
	};
	this.populateHot = function(){
		memoryLayer.getHotJokes().done(
			function(records){
				var entriesString="";
				for(var i=0; i<records.length; i++){
					//odd and even stuff
					if(i%2==0){
						entriesString+= generateListEntry(records[i], 1);
					}
					else{
						entriesString+= generateListEntry(records[i], 0);
					}
					
				}
				$("#list_view").html(entriesString);
				renewEventListeners();
				
				
			}
			);
	};
}

//HOT event listener

$("#list_header_select_left").click(function(){
	listView.populateHot();
});
$("#list_header_select_center").click(function(){
	listView.populateNew();
});

function putLoadingMessageOnListView(){
	
	$("#right_page").html("loading!");
}



function listEntryEventListener(){
		if($(this).hasClass("list_entry_selected")){
			
		}
		else{
			//case NOT first click
			if ($(".list_entry_selected")[0]){
				$(".list_entry_selected").addClass(LIST_ENTRY_CLASS_BUFFER).removeClass("list_entry_selected");

			}
			if($(this).hasClass("list_entry_odd")){
				LIST_ENTRY_CLASS_BUFFER= "list_entry_odd";
				$(this).removeClass("list_entry_odd");
				$(this).addClass("list_entry_selected");
			}
			else{
				LIST_ENTRY_CLASS_BUFFER= "list_entry_even";
				$(this).removeClass("list_entry_even");
				$(this).addClass("list_entry_selected");
			}
		

		}
	}

function generateListEntry(entry, even_flag){
	var out= ' <div class="list_entry list_entry_'
	if(even_flag=== 0){
		out+= 'odd';
	}
	else{
		out+= 'even';
	}
	out+= '"> <div class="list-profile-pic-div"> <img src="http://graph.facebook.com/';
    out+= entry.author_id;
    out+= '/picture?type=square" alt="profile pic" class="list-profile-pic"/> </div> <div class = "list-left-container"> <div class= "list-title">';
    console.log(entry.jokename);
    out+= ensureLength(entry.jokename, MAX_TITLE_LENGTH, 0);
    out+= '<span class="list-duration">';
    out+= entry.duration;
    out+= '</span> </div> <div class = "list-subscript">'
    out+= "By "+ensureLength(entry.from, MAX_NAME_LENGTH, 1);
    out+= '</div></div> <div class = "list-icons-container"> <div class= "list-play-div"> <img src="css/images/list-play.png" class="list-play-icon" /></div><div class= "list-like-div"><img src="css/images/list-like.png" class="list-play-icon" /></div></div><div class = "list-likes">'
    out+= entry.likes+ " likes";
    out+= '</div></div>';
	return out;

}

function ensureLength( str, max_length, flag){
	if(str.length > max_length){
		var out = str;
		//case it is a title

		if(flag ===  0){
			out = str.substring(0, max_length-2) + "...";
			return out;
		}
		else{
			
			out= str.substr(0,str.indexOf(' '));
			console.log(out);
			if(out.length > max_length){
				out = str.substring(0, max_length-2) + "...";
			}
			return out;
		}
	}
	else{
		return str;
	}
}
