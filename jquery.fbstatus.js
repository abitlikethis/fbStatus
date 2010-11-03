/**
* Facebook Status - A super lightweight tool to display current publicly accessible facebook status
* Coded by Ben Greig @ Abitlikethis
* Based on the code example by PrettyKlicks http://www.prettyklicks.com/demo/fbjson.php
* Version 1.0
* http://abitlikethis.com/
**/

(function($){
	
	$.fn.fbstatus = function(options) {
			
		set = jQuery.extend({
			username: 'prettyklicks',			// [string]   required, unless you want to display prettyklicks status. :)
			count: 5,							// [integer]  how many status updates to display?
			loading_text: null                  // [string]   optional loading text, displayed while tweets load
		}, options);
		
		function fbstatus_link(text){
	        return text.replace(/(href="|<a.*?>)?[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function($0, $1) {
	          return $1 ? $0 : $0.link($0);
			});
	    }
		
		//Set Url of JSON data from the facebook graph api. make sure callback is set with a '?' to overcome the cross domain problems with JSON
  		var url = "http://graph.facebook.com/"+set.username+"/feed?limit="+set.count+"&callback=?";
		
		$(this).each(function(i, widget){
			var loading = $('<p class="loading">'+set.loading_text+'</p>');
			var theObject = $(this);
			if (set.loading_text) $(widget).append(loading);
			
			//Use jQuery getJSON method to fetch the data from the url and then create our unordered list with the relevant data.
			$.getJSON(url,function(json){
			    var html = "<ul>";
					//loop through and within data array's retrieve the message variable.
			    	$.each(json.data,function(i,fb){
			      		
			      		if (fb.message) {
							html += "<li>" + fbstatus_link(fb.message) + "</li>";
						}
						
			    	});
			    html += "</ul>";
			
			
				//A little animation once fetched
				theObject.animate({opacity:0}, 500, function(){
			
						theObject.html(html);
			
				});
			
			    theObject.animate({opacity:1}, 500);
			  
			});
			
		});
		
	};
	
})(jQuery);