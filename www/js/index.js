//dissapearing header code
/*function setIdle(cb, seconds) {
    var timer;
    var interval = seconds;
    function refresh() {
        clearInterval(timer);
        timer = setTimeout(cb, interval);
    };
    $(document).on('keypress, click', refresh);
    refresh();
}


setIdle(function() {
        $('.fading').fadeOut(400);
        }
        , 3000);


$('#render').click(function(){
                  if(!$('.fading').is(':visible')){
                  $('.fading').fadeIn(200);
                  }
                  });
//message appearance code
$('#render').on("swipeleft", function()
               {
               if(!$('.slideHide').is(':visible')){
                    $('.slideHide').fadeIn(700);
                   // $('.fading').fadeIn(200);
               }
               });
$('#render').on("swiperight", function()
               {
               
               if($('#caption').is(':visible')){
               $('#caption').fadeOut(200);
               $('.fading').fadeOut(200);
               }
               });
*/
//database stuff
/*document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
    var firstrun = window.localStorage.getItem("runned");
    var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
    //printDB is for testing purposes
    if ( firstrun == null ) {
        window.localStorage.setItem("runned", "1"); 
        db.transaction(populateDB);
        db.transaction(printDB);
     }
    else { 
          db.transaction(printDB);
        } 

}
//message table initialization
function populateDB(tx){
    //messages table
    tx.executeSql('create table messages(fr text, image text, message text)');
    console.log('created');
    tx.executeSql('INSERT INTO MESSAGES (fr, image, message) VALUES ("Dobri", "img/test2.jpg", "life is good" )');
    tx.executeSql('INSERT INTO MESSAGES (fr, image, message) VALUES ("James", "img/test3.jpeg", "some other text" )');
    tx.executeSql('INSERT INTO MESSAGES (fr, image, message) VALUES ("Hongzhi", "img/test.jpg", "third text" )');
}

function printDB(tx){
    tx.executeSql('SELECT * FROM MESSAGES', [], querySuccess, errorCB);
    }
function querySuccess(tx, results){
    var rows= results.rows.length;
    for(var i=0; i<rows; i++){
        console.log("row "+ i+ "has "+ results.rows.item(i).fr+ " with data " + results.rows.item(i).image);
    }
    console.log("Returned rows = " + rows);
}
function errorCB(err){
    alert("db error");
}

*/
/*
//INBOX stuff
$("#inbox").live('pageinit', function() {
                 var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
                 db.transaction(printInbox);
                     });
function printInbox(tx){
    tx.executeSql('SELECT * FROM MESSAGES', [], printInboxInner, errorCB);
}
//global vars
var theresults;
function printInboxInner(tx, results){
    var rows= results.rows.length;
    theresults= results;
    for(var i=0; i<rows; i++){
        var theText= "window.localStorage.setItem('passId','"+i+"')";
        $('#inboxList').append('<li onClick="'+theText+'"><a href="#render" ><h3><b>From: ' + results.rows.item(i).fr + '</b></h3><p>the date</p></a></li>');
    }
    $('#inboxList').listview('refresh');
}
//render page push in picture, from and caption based on passId
$("#render").live('pagebeforeshow', function(){
             $("#caption").hide();
             $("#theTop").hide();
             var theid = window.localStorage.getItem("passId");
             $(".background").attr("src", theresults.rows.item(theid).image);
             $("#name").html("From "+theresults.rows.item(theid).fr);
             $("#caption").html(theresults.rows.item(theid).message);
             });

*/

//USER REGISTRATION
/*var addressRegister= "http://localhost:3000/users.json"
$("#UserRegister").on('click', submitUserF);
function submitUserF(){
    var usrname= $("#userInputField").val();
    
    if(!usrname)
        alert("Please type in a username");
    else{
        $.ajax({
               type: 'POST',
               url: addressRegister,
               username: '39af64d1f185a33639d6a98ab9246faa',
               password: '9cd3d01675595a7e40c742d5f70f1a7e',
               data: {
               'user[username]': usrname
               },
               success: function(msg){
                    window.localStorage.setItem("user_name", usrname);
                    window.localStorage.setItem("access_token", msg.access_token);
                    //console.log(window.localStorage.getItem("access_token"));
                    $.mobile.changePage( "#one", { transition: "slideup"} );
               },
               error: ajaxError
               });
    }
}
*/
//think about no network connection
var FILESYSTEMPATH=" ";
var tempFileName=" ";
var THEFILESYSTEM;
var MAX_RECORD=10;
var BASE_URL= "http://vast-shelf-7018.herokuapp.com/";
$(document).bind("deviceready", function() {
                 $.support.cors = true;
                 //$.mobile.allowCrossDomainPages = true;
                 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS2, fileFail);
                 });
function gotFS2(fileSystem){
    FILESYSTEMPATH= fileSystem.root.fullPath+'/';
    THEFILESYSTEM=fileSystem;
}



document.addEventListener('deviceready', function() {
                  try {
                          //alert('Device is ready! Make sure you set your app_id below this alert.');
                          FB.init({ appId: "462339003822070", nativeInterface: CDV.FB, useCachedDialogs: false });
                          
                          } catch (e) {
                          alert(e);
                          }
                          var initial ;
                          FB.getLoginStatus(function(response) {
                                            if (response.status == 'connected') {
                                            
                                            initial = '#one';
                                            } else {
                                            initial= '#startPage'
                                            }
                                            //CHANGE PAGE BASED ON LOGIN
                                             $.mobile.changePage(initial);
                                            });
                    });




function login() {
    FB.login(
             function(response) {
             if (response.authResponse) {
             $.mobile.changePage("#one");
             
             FB.api('/me', function(response) {
                    $.ajax({
                           type: 'POST',
                           url: BASE_URL+'users.json',
                           username: '39af64d1f185a33639d6a98ab9246faa',
                           password: '9cd3d01675595a7e40c742d5f70f1a7e',
                           data: {
                           'user[username]': response.name,
                           'user[facebookid]': response.id
                           },
                           success: function(msg){
                           window.localStorage.setItem("user_name", response.name);
                           window.localStorage.setItem("access_token", msg.access_token);
                           window.localStorage.setItem("facebookid", response.id);
                           console.log(window.localStorage.getItem("user_name"));
                           
                           },
                           error: ajaxError
                           });
                    });
             
             } else {
             alert('not logged in');
             }
             },
             { scope: "email" }
             );
}
$("#fbLogin").on('click', login);






//Contact stuff
/*$("#contacts").live( 'pageinit', function(){
                    var options = new ContactFindOptions();
                    options.multiple=true;
                    var fields= ["name", "phoneNumbers"];
                    navigator.contacts.find(fields, onContactSuccess, onContactError, options);
                    });
function onContactError(contactError){
    alert("cant access contacts");
}
function onContactSuccess(contacts){
    for (var i=0; i<contacts.length; i++) {
         $('#contactsList').append('<li><a href="#one" ><h3>' + contacts[i].name.givenName +' '+ contacts[i].name.familyName+ '</h3></a></li>');
    }
    $('#contactsList').listview('refresh');
} */




/* AJAX POST FOR LISTING CREATION!!!
$("#jokeSubmit").on('click', submitJokeF);
function submitJokeF(){
    var name= $("#jokeName").val();
    var file= $("#fileName").val();
    if(!name || !file)
        alert("Please type in a joke name and file name");
    else{
        $.ajax({
               type: 'POST',
               url: address,
               data: {
                    'joke[filename]': file,
                    'joke[jokename]': name,
                    'joke[from]': window.localStorage.getItem("user_name"),
                    'access_token': window.localStorage.getItem("access_token")
               },
               success: function(msg){
               $.mobile.changePage( "#one", { transition: "slideup"} );
               },
               error: ajaxError
               });
    }
}




// Sound recording
//name generation
function generateName(){
    return "test8.wav";
}
var filen;
var RECORD_FILEPATH;
//click bound to start button; calls gotFS after getting filesystem
$('#startButton').click(function(e) {
                   e.preventDefault();
                   filen= generateName();
                   console.log(filen);
                   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fileFail);
                   

                   
                   });
//calls gotFileEntry
function gotFS(fileSystem){

    FSPATH= fileSystem.root.fullPath+'/';
    RECORD_FILEPATH = fileSystem.root.fullPath + '/' + filen;
    fileSystem.root.getFile(filen, {create: true, exclusive: true}, gotFileEntry, fileFail);
}



var FSPATH;
var mediaRec;
var recInterval;
function gotFileEntry(fileEntry){
    console.log("got FIle entry");
    
    mediaRec = new Media(RECORD_FILEPATH, onMediaSuccess, onMediaError);
    mediaRec.startRecord();
    var recTime = 0;
    recInterval=setInterval(function() {
                recTime = recTime + 1;
                $("#recDisplay").text(recTime.toString());
                if (recTime >= 10) {
                    clearInterval(recInterval);
                    mediaRec.stopRecord();
                    $("#recDisplay").text("done");
                }
            },
    1000);
    
}
function onMediaError(err){
    console.log("media error!!! "+ err.message);
}

function onMediaSuccess(){
    console.log("media success");
}

$('#stopButton').click(function(e) {
                        e.preventDefault();
                       clearInterval(recInterval);
                       mediaRec.stopRecord();
                       $("#recDisplay").text("done");
                        //do other stuff when a click happens
                        });



//audio streaming

*/



$.ajax({'url: bla'}).done(function (employee){

});



