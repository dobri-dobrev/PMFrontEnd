var memoryLayer;
var listView;
var JOKES_URL= "http://localhost:3000/jokes"
//on STARTUP
//document.addEventListener("deviceready", onDeviceReady, false);
//IOS VERSION
/*function onDeviceReady(){
    memoryLayer = new MemoryLayer();
    memoryLayer.initialize().done(function(){console.log("memoryLayer initialized");});
    listView = new ListView();
    listView.initialize().done(function(){console.log("listView initialized");});
}
*/
$(function() {
    FastClick.attach(document.body);
});

//CHROME VERSION


$( document ).ready(function() {
    memoryLayer = new MemoryLayer();
    memoryLayer.initialize().done(function(){console.log("memoryLayer initialized");});
    listView = new ListView();
    listView.initialize().done(function(){console.log("listView initialized");});
});




//USE after adding shit to the DOM
function renewEventListeners(){
    $(".list_entry").click(listEntryEventListener);
    $(".list-play-div").click(listPlayListener);
}

//navigation click events
$("#footer-mask-button").click(function(){
    if($("#left_page").hasClass("left_p")){
        if($("#right_page").hasClass("center_p")){
            $("#left_page").removeClass("left_p").addClass("center_p");
            $("#right_page").removeClass("center_p").addClass("right_p");
        }
        else{
            $("#left_page").removeClass("left_p").addClass("center_p");
        }
        
     }
    
});

$("#footer-mic-button").click(function(){
    if($("#left_page").hasClass("center_p")|| $("#right_page").hasClass("center_p")){
        if($("#left_page").hasClass("center_p")){
            $("#left_page").removeClass("center_p").addClass("left_p");
        }
        if($("#right_page").hasClass("center_p")){
            $("#right_page").removeClass("center_p").addClass("right_p");
        }
    }
});


$("#footer-star-button").click(function(){
    if($("#right_page").hasClass("right_p")){
        if($("#left_page").hasClass("center_p")){
            $("#right_page").removeClass("right_p").addClass("center_p");
            $("#left_page").removeClass("center_p").addClass("left_p");
        }
        else{
            $("#right_page").removeClass("right_p").addClass("center_p");
        }
     }
    
});


//listview header click events

$("#list_header_select_left").click(function(){
    $("#list_header_select_left").addClass("list_header_selected");
    $("#list_header_select_center").removeClass("list_header_selected");
    $("#list_header_select_right").removeClass("list_header_selected");
});

$("#list_header_select_center").click(function(){
    $("#list_header_select_center").addClass("list_header_selected");
    $("#list_header_select_left").removeClass("list_header_selected");
    $("#list_header_select_right").removeClass("list_header_selected");
});

$("#list_header_select_right").click(function(){
    $("#list_header_select_right").addClass("list_header_selected");
    $("#list_header_select_center").removeClass("list_header_selected");
    $("#list_header_select_left").removeClass("list_header_selected");
});


