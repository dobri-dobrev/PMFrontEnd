var FILE_NAME= " ";
var FILE_CREATED=0;
var RECORDING=0;
var RECORDER;

var recInterval;
//.m4a deletion usage
var FNTemp=" ";
$("#uploadPage").live('pagebeforeshow', function(){
	 $('#uploadButton').button('disable');
	});


$("#recButtonToUpload").on('click', recordToUpload);

function recordToUpload(e){
	e.preventDefault();
	var fn= $("#jName").val();
	$("#jokeNameHidden").val(fn);
	if(RECORDING==1){
		RECORDER.stopRecord();
		clearInterval(recInterval);
		RECORDING=0;
		$('#uploadButton').button('enable');
		$("#tleft").text("done");
		$('#recButtonToUpload').siblings('.ui-btn-inner').children('.ui-btn-text').text("Re-Record");
	}
	else{
		if(FILE_CREATED==1){
			alert("file created");
		}
		else{
			if(!fn){
				alert("Please input a joke name first.");
			}
			else{
				var fullfn=fn+".wav";
				FILE_NAME= fullfn;
				
				THEFILESYSTEM.root.getFile(FILESYSTEMPATH+fullfn, {create: true, exclusive: true}, createdFile, fileFail);
			}	
		}	
	}
	
	
}

function fileFail(err){
    console.log(err.message);
    alert("problem creating the file, please try another name");
}

function createdFile(fileEntry){
	$("#fileNameHidden").val(fileEntry.name);
	FILE_CREATED=1;
	console.log(fileEntry.fullPath);
	RECORDER= new Media(fileEntry.fullPath, onMediaSuccess, onMediaError);
	RECORDER.startRecord();
	RECORDING=1;
	$('#recButtonToUpload').siblings('.ui-btn-inner').children('.ui-btn-text').text("Stop");
	
    var recTime = 0;
    recInterval=setInterval(function() {

                recTime = recTime + 1;
                $("#tleft").text(recTime.toString());
                if (recTime >= MAX_RECORD) {
                    clearInterval(recInterval);
                    RECORDER.stopRecord();
                    RECORDING=0;
                    $('#uploadButton').button('enable');
                    $("#tleft").text("done");
                    $('#recButtonToUpload').siblings('.ui-btn-inner').children('.ui-btn-text').text("Re-Record");
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

//submit button on click
//first converts .wav, deletes .wav and then sends .m4a
$("#uploadButton").on('click', uploadClick);
function uploadClick(e){
	e.preventDefault();
	/*key="";
	policy="";
	signature="";
	console.log("got the click");
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/signed_url',
		data: {doc: {title: FILE_NAME}},
		async: false,
		success: function(data){
					console.log("KEY");
					console.log(data.key);
					console.log("policy");
					console.log(data.policy);
					console.log("signature");
					console.log(data.signature);

					key= data.key;
					policy= data.policy;
					signature= data.signature;
					getFile(FILE_NAME);
				},
		error: function(request, status, error){
   					alert("ajax fuck up");
				}
	}); */ 
	var fn= $("#fileNameHidden").val();
	if(!fn){
		alert("nothing to upload yet! Please record something catchy first!");	
	}
	else{
		encodeFile(fn);
	}
	
	//getFile(FILE_NAME);
	//console.log("prevented");
	  
}
function encodeFile(fn){
	console.log("File to encode " +FILESYSTEMPATH+fn);
	window.encodeAudio(FILESYSTEMPATH+fn, encodeSucc, encodeFail);
}
function encodeSucc(newPath){
	console.log("converted!!");
	var fn= newPath.substr(newPath.lastIndexOf('/')+1);
	getFile(fn);
}
function encodeFail(statusCode){
	console.log("conversion failed "+ statusCode);
}



function getFile( fileNa){
	var theFileEntry= THEFILESYSTEM.root.getFile(fileNa, null, gotFileEntry2, filefail2);
}
function gotFileEntry2(fileEntry) {
    fileEntry.file(gotFile2, filefail2);
}
function gotFile2(file){
    console.log(file.name);
    uploadFile(file);
}
function filefail2(evt){
	console.log("could not locate file");
}

function uploadFile(file){
	console.log("got file")
	var filePath= file.fullPath;
	FNTemp=file.name;
	var options = new FileUploadOptions();
	options.fileKey="joke[audio]";
	options.fileName=filePath.substr(filePath.lastIndexOf('/')+1);

	options.mimeType="audio/wav";
	params= {
		'joke[from]': window.localStorage.getItem("access_token"),
		'joke[jokename]': $("#jokeNameHidden").val(),
		'access_token': window.localStorage.getItem("access_token")
	};
	$("#tleft").text("uploading");
	options.params= params;
	var ft = new FileTransfer();
	ft.upload(filePath, BASE_URL+"jokes", winUpload, failUpload, options);

	/*var fd = new FormData();
	fd.append('joke[from]', 'dobri');
    //fd.append('acl', 'public-read'); 
    //fd.append('enctype', 'multipart/form-data');  
    //fd.append('Content-Type', 'audio/wav');     
    fd.append('joke[jokename]', 'joker');
    fd.append('joke[length]', 3);
    fd.append('joke[filename]', 't1');
    
    fd.append("joke[audio]",file);
    var xhr =  new XMLHttpRequest();
    
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    

    xhr.open('POST', 'http://localhost:3000/jokes', true); //MUST BE LAST LINE BEFORE YOU SEND 
    
    xhr.send(fd); */
} 
function winUpload(r) {
			$("#tleft").text("uploaded");
            THEFILESYSTEM.root.getFile(FNTemp, null, fileCleanUp, filefail2);
        }
function fileCleanUp(fileEntry){
	fileEntry.remove(delSuc, delFail);
}
function delSuc(e){
	console.log("removed file");
}
function delFail(e){
	console.log("could not remove file "+ e.message);
}


function failUpload(error) {
			$("#tleft").text("failed uploading");
            console.log("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

/*function uploadFailed(evt){
	console.log(this.status);
}
function uploadComplete(evt){
	console.log(this.status);
}
function uploadProgress(evt) {
    if (evt.lengthComputable) {
      var percentComplete = Math.round(evt.loaded * 100 / evt.total);
     console.log(percentComplete);
    }
    else {
      console.log("cant compute");
    }
  }

function uploadCanceled(evt) {
    alert("The upload has been canceled by the user or the browser dropped the connection.");
  }
 */






/*
function createCORSRequest(method, url) 
{
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) 
  {
    xhr.open(method, url, true);
  } 
  else if (typeof XDomainRequest != "undefined") 
  {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } 
  else 
  {
    xhr = null;
  }
  return xhr;
}


/**
 * Execute the given callback with the signed response.
 
function executeOnSignedUrl(file, callback)
{
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/signed_url?name=' + file.name + '&type=' + file.type, true);

  // Hack to pass bytes through unprocessed.
  xhr.overrideMimeType('text/plain; charset=x-user-defined');

  xhr.onreadystatechange = function(e) 
  {
    if (this.readyState == 4 && this.status == 200) 
    {
      callback(decodeURIComponent(this.responseText));
    }
    else if(this.readyState == 4 && this.status != 200)
    {
      setProgress(0, 'Could not contact signing script. Status = ' + this.status);
    }
  };

  xhr.send();
}

function uploadFile(file)
{
  executeOnSignedUrl(file, function(signedURL) 
  {
    uploadToS3(file, signedURL);
  });
}

/**
 * Use a CORS call to upload the given file to S3. Assumes the url
 * parameter has been signed and is accessible for upload.
 
function uploadToS3(file, url)
{
  var xhr = createCORSRequest('PUT', url);
  if (!xhr) 
  {
    setProgress(0, 'CORS not supported');
  }
  else
  {
    xhr.onload = function() 
    {
      if(xhr.status == 200)
      {
        setProgress(100, 'Upload completed.');
      }
      else
      {
        setProgress(0, 'Upload error: ' + xhr.status);
      }
    };

    xhr.onerror = function() 
    {
      setProgress(0, 'XHR error.');
    };

    xhr.upload.onprogress = function(e) 
    {
      if (e.lengthComputable) 
      {
        var percentLoaded = Math.round((e.loaded / e.total) * 100);
        setProgress(percentLoaded, percentLoaded == 100 ? 'Finalizing.' : 'Uploading.');
      }
    };

    xhr.setRequestHeader('Content-Type', "multipart/form-data");
    xhr.setRequestHeader('x-amz-acl', 'public-read');

    xhr.send(file);
  }
}

function setProgress(percent, statusLabel)
{
  console.log("status");
  console.log(statusLabel);
  console.log("percent");
  console.log(percent);
}








curl \
-F key=ts/test8.wav \
-F acl=public-read \
-F AWSAccessKeyId=AKIAIG65KDIAQ4XXWTKA \
-F Policy=eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQwMDowMDowMFoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJmdW5ueXNpZGVhcHAifSx7ImFjbCI6InB1YmxpYy1yZWFkIn0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0Il1dfQ== \
-F Signature=uQQeiphzR6b8gFz6PfR0qycI1Ys= \
-F Content-Type=audio/x-wav \
-F file=@test8.wav \
http://funnysideapp.s3.amazonaws.com */

