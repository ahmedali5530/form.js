# form.js
A helper jquery plugin to submit forms with ajax and html5 file uploads.

# Usage
`
$(document).on('submit','form',function(e){
	e.preventDefault();
	$('form',this).submit({
    	options
  	},function(result,form){
    	//success callback
    	console.log(result);
    	//form is the form object
  	},function(er){
    	//error callback
    	console.log(er);
  	},function(){
    	//complete callback
  	});
})
`
