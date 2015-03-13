/**
* Plugin for easy form submissions via ajax
* Author @ahmedali5530
***/
(function ( $ ) {
    $.fn.submit = function(o, sc, fc ,cc, pc ) {
		
		//merge the default options with given options
        var ss = $.extend({
            placement: 'top',
			alert_type:'alert',
			redirect : false,
			reset 	 : false,
			refresh  : false,
			datatype : 'html',
			method : 'POST',
			cache : false,
        }, o );
		
		//get the current form
		//var form = document.forms[this.selector];
		
		var form = $(this).context;
		//console.log(form);
		
		//get the form submit button
		//var btn = $(form)['context']['elements']['submit'];
		
		//var btn = $(this).context.elements.item($(this).context.length-1);
		var btn = $(this).context.elements.submit;
		
		//disable the submit button to stop double submitting
		
		var btn_text = $(btn).html();
		$(btn).attr('disabled','disabled');
		$(btn).html('<i class="fa fa-spinner fa-spin fa-lg"></i>');
		
		//get the url of the form
		var url = form.action;
		
		//determine the enctype of form
		var enctype = form.enctype;
		
		//check if multipart is set to true
		if(enctype == 'multipart/form-data'){
		
			$.ajaxSetup({
				contentType : false,
				processData : false,
			});
			
			//prepare the files data
			var data = new FormData(form);
			
			/* $.each(form,function(k,v){
			
				if(v.type == 'file'){
					
					$.each(form.elements[k]['files'],function(ck,cv){
						
						if(form.elements[k]['files'].length == 1){
						
							data.append(v['name'],cv);
						
						}else{
						
							data.append(v['name']+'['+ck+']',cv);
						
						}
					
					});
					
				}
				
			}); */
			
			//prepares the post data
			
			$.each($(form).serializeArray(),function(k,v){
			
				data.append(v.name,v.value);
			
			});
		
		}else{
			$.ajaxSetup({
				contentType : 'application/x-www-form-urlencoded',
				processData : true,
			});
			//set the data if upload is not present
			//method 1
			/*var data = new Array();
			$.each(form,function(k,v){
				data[v.name] = v.value;
			});*/
			//method 2
			var data = $(form).serializeArray();
		}
		
		//send the request with $.ajax from now to onward
		
		$.ajax({
			//set the options here
			url:url,
			dataType : ss.datatype,
			method: ss.method,
			data:data,
			success:function(res,textStatus){
				//shows off the progress of request
				if('function' == typeof sc){
					sc(res,form);
				}
				
				//enables the messaging or not with json data transmission.
				
				//show messages only if datatype is set to json
				if(ss.datatype == 'json'){
					//set alerts
					if(ss.alert_type == 'alert'){
						
						var alert_class = '';
						
						if(res.status == ''){
							
							alert_class = 'alert-info';
							
						}else if(res.status == true){
							
							alert_class = 'alert-success';
							
						}else if(res.status == false){
							
							alert_class = 'alert-danger';
							
						}
						
						var alert_position = '';
						
						if(ss.placement == 'top'){
							alert_position = 'alert-top';
						}else if(ss.placement == 'bottom'){
							alert_position = 'alert-bottom';
						}else{
							alert_position = 'alert-top';	
						}
						
						var alert_template = '<div class="alert alert-status '+ alert_class+ ' ' + alert_position+'" id="alert-status"><button class="close" data-dismiss="alert"><i class="fa fa-times"></i></button><div class="row"><div class="container"><span>'+res.message+'</span></div></div></div>';
						$('body').append(alert_template);	
						
					}
				}
				
				//change the button state to normal
				$(btn).removeAttr('disabled');
				
				$(btn).html(btn_text);
				
				if(ss.reset == true){
					form.reset();
				}
				
				if(ss.refresh == true){
					window.location.reload(true);
				}
				
				if(ss.redirect !== false){
					window.location.href = ss.redirect;
				}
				
			},
			error:function(xhr, textStatus, errorThrown){
				if('function' == typeof fc){
					fc(url + ' ' + xhr.status + ' ' + errorThrown);
				}
				
				$(btn).removeAttr('disabled');
				
				$(btn).html(btn_text);
			},
			statusCode: {
				404: function() {
					alert( "page not found" );
				}
			},
			traditional : true,
			complete : function(){
				if('function' == typeof cc){
					cc();
				}
			}
		});
	};
}( jQuery ));

/****************plugin Ends***************/	
