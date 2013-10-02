var hardcoded_jokes_data= [
	{"id" : 0, "jokename" : "New Joke","author_id": "731838368", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 1, "jokename" : "New Joke2", "author_id": "731838368", "likes": 213243, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 2, "jokename" : "New Joke3", "author_id": "731838368","likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 3, "jokename" : "New Joke4", "author_id": "731838368", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 4, "jokename" : "New Joke5", "author_id": "731838368", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 5, "jokename" : "New Joke6", "author_id": "731838368", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 6, "jokename" : "New Joke7", "author_id": "731838368", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 7, "jokename" : "New Joke8", "author_id": "731838368", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 8, "jokename" : "New Joke9", "author_id": "731838368", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 9, "jokename" : "New Joke10", "author_id": "731838368", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},

];

var hardcoded_jokes_data_hot= [
	{"id" : 0, "jokename" : "HOT Joke","author_id": "100001543362451", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 1, "jokename" : "HOT Joke2", "author_id": "100001543362451", "likes": 213243, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 2, "jokename" : "HOT Joke3", "author_id": "100001543362451","likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 3, "jokename" : "HOT Joke4", "author_id": "100001543362451", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 4, "jokename" : "HOT Joke5", "author_id": "100001543362451", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 5, "jokename" : "HOT Joke6", "author_id": "100001543362451", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 6, "jokename" : "HOT Joke7", "author_id": "100001543362451", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 7, "jokename" : "HOT Joke8", "author_id": "100001543362451", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 8, "jokename" : "HOT Joke9", "author_id": "100001543362451", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},
	{"id" : 9, "jokename" : "HOT Joke10", "author_id": "100001543362451", "likes": 2, "from" : "the big borec", "duration" : 24, "audio": {"url": "http://s3.amazonaws.com/funnysideapp/audios/11/original/First.m4a?1365101996"}},

];



function MemoryLayer(){
	this.initialize= function(){
		var deferred = $.Deferred();
		deferred.resolve();
		return deferred.promise();
	}

	this.getNewJokes= function(){
		console.log("getting new jokes ");
		var deferred = $.Deferred();
		var out= hardcoded_jokes_data;
		deferred.resolve(out);
		return deferred.promise();
	}
	this.getHotJokes= function(){
		console.log("getting hot jokes");
		var deferred = $.Deferred();
		var out= hardcoded_jokes_data_hot;
		deferred.resolve(out);
		return deferred.promise();
	}
	this.getJokesByCategory= function( category ){
		console.log("getting jokes from category "+ category);
		var deferred = $.Deferred();
		var out= hardcoded_jokes_data;
		deferred.resolve(out);
		return deferred.promise();
	}
	this.getJokeByID= function(id){
		var deferred = $.Deferred();
		var out= hardcoded_jokes_data[id];
		deferred.resolve(out);
		return deferred.promise();	
	}
	//returns 0 if empty, non zero if it has some jokes
	this.hasJokes = function(){
		return hardcoded_jokes_data.length;
	}
}