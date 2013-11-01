/*global define */
define([], function () {
    'use strict';

    var App = {
    	
    	config:{
    		imgpath: "http://RudadondeVivenlasimagenes/",
    		facebookfileName: "",
    		video: {video: true, audio: false},
    		currentStep: 1,
    		imgUrl: "/images/monsterparts/",
    		filter: "",
    		jsonLoaded: false,
    		headline: ""    		
    	},

    	obj: {    		
    		video: document.querySelector('#booth-camera'),
    		canvas: document.querySelector('#booth-canvas'),
    		photo: document.querySelector('#booth-photo'),    	
    		stream: null
    	},

	    validation: {
	    	hasGetUserMedia: function (){	    	
	            // Note: Opera is unprefixed.
				return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            			navigator.mozGetUserMedia || navigator.msGetUserMedia );
	    	},
	    	errorCallback: function (error){
	    		console.log("Video capture error: ", error.code); 
	    	}
	    },

	    controller: {
	    	camera:{
	    		setStream:function(streamValue){
	    			App.obj.stream = streamValue;
	    		},

	    		takePicture:function(){
	    			// Not showing vendor prefixes or code that works cross-browser.
					if (App.obj.stream) {
						
						var ctx = App.obj.canvas.getContext('2d');

						$('#flash').show();

						setTimeout(function(){							
							ctx.drawImage(App.obj.video, 0, 0, App.obj.canvas.width, App.obj.canvas.height);
						    App.obj.photo.src = App.obj.canvas.toDataURL('image/jpeg', 1);
							$('#flash').hide();
						},400);
						
						
					    // "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.					    
					    //alert(App.obj.canvas.toDataURL('image/jpeg', 1));
					}
	    		}
	    	},

	    	utils:{
	    		shareFacebook:function(){
	    			var D=550,A=450,C=screen.height,B=screen.width,H=Math.round((B/2)-(D/2)),G=0,F=document,E;
				    if(C>A){
				        G=Math.round((C/2)-(A/2))
				    }
	    			window.open(
				      'http://www.facebook.com/sharer/sharer.php?s=100&p[url]=' + encodeURIComponent("http://thehangar.cr") + '&p[images][0]= '+ encodeURIComponent(App.config.facebookfileName) + '&p[title]=Hangar%20of%20the%20Dead&p[summary]=Know with the Hangar whata terror day means.',
				      'facebook-share-dialog', 
				      'width='+D+',height=436,left='+ H +',top='+ G );	    			 
	    		},

	    		setFilter:function(filter){
	    			
	    			App.config.filter = filter;
	    		},

	    		nextStep:function(){	    				    			
					switch(App.config.currentStep)
					{
						case 1:
							
						  App.flow.step1();

						  break;
						case 2:
						  App.flow.step2();
						  break;
						case 3:
						  App.flow.step3();
						  break;
						case 4:
						  App.flow.step4();
						  break;
					}
	    			$(".step" + App.config.currentStep).hide();
	    			App.config.currentStep++;
					$(".step" + App.config.currentStep).show();
					$(".termomenter").find("div").removeAttr("class").addClass("level" + App.config.currentStep);
	    		},

	    		backStep:function(){
	    			$(".step" + App.config.currentStep).hide();
	    			App.config.currentStep--;
	    			//Clear all
	    			if (App.config.currentStep == 1){
	    				App.controller.utils.clearAll();
	    			}

					$(".step" + App.config.currentStep).show();
					$(".termomenter").find("div").removeAttr("class").addClass("level" + App.config.currentStep);
	    		},

	    		clearAll:function(){
	    			$('.img-part-content').find("img").attr("src", "");
    				$(".headline img").attr("src","");
    				// App.config.filter = "";
	    		},

	    		loadImages:function(jsonOBJ, category){
	    			var carouselTemp = $("#carousel-" + category + " .carousel-inner");
	    			$.each(jsonOBJ, function() {
	    				var obj = "<div class='item part' data-category='" + this.category + "'><img src='" + App.config.imgUrl + category + "/" + this.category + "/" + this.fileName + "'/></div>";
				    	carouselTemp.append(obj);
				    });
				    carouselTemp.find(".item").first().addClass("active");
	    		},

	    		pasteImage:function(category, url){
	    			var imgObj = $('.img-part-content').find("#img-"+category);
	    			imgObj.attr("src",url);
	    			imgObj.addClass(App.config.filter);
	    		},

	    		downloadCanvas:function(link, canvasId, filename) {
				    // link.href = document.getElementById(canvasId).toDataURL();
				    link.href = App.config.facebookfileName;
				    link.download = filename;
				},

				saveImage:function(){
					var timestamp = Number(new Date());

					App.config.facebookfileName = timestamp + ".jpg";

					console.log(App.config.headline);

					$.ajax({ 
                        type: "POST", 
                        url: "http://166.78.57.50/labs-photobooth-filters/process.php",
                        dataType: 'json',
                        data: {
                            data : document.getElementById("final-canvas").toDataURL('image/jpeg'),
                            filename : timestamp + ".jpg",
                            filter : App.config.filter,
                            headline : App.config.headline,

                        },
                        beforeSend : function() {
                            console.log('Sending ajax...');
                        },
                        complete : function( data ) {
                            console.log('Ajax Sent');
                            console.log(data.responseJSON.url);
                            
                            App.config.facebookfileName = data.responseJSON.url;

                        }
                    });
				}

	    	}
	    },

	    flow: {
	    	step1: function() {
	    		App.controller.camera.takePicture();
	    	},
	    	step2: function() {
	    		// Pulls in meal data from JSON file
				if (!App.config.jsonLoaded){
					$.getJSON('json/monster-part.json', function(json) {
					    App.controller.utils.loadImages(json.Wolfman, "wolfman");
					    App.controller.utils.loadImages(json.zombie, "zombie");
					    App.controller.utils.loadImages(json.vampire, "vampire");
					    App.controller.utils.loadImages(json.extras, "extras");
					}).done(function() {
						App.config.jsonLoaded = true;
						$(".part").on("click", function(){
					        App.controller.utils.pasteImage($(this).data("category"), $(this).find("img").attr("src"));
					    });
					});
				}
				
	    	},
	    	step3: function() {
	    		console.log("Hacer paso 4");
	    	},
	    	step4: function() {

	    		//Save Final Image

	    		var c = document.getElementById("final-canvas");
				var ctx = c.getContext("2d");

				//Get My Photo
				var img = App.obj.photo;
				ctx.translate(518, 0);
				ctx.scale(-1, 1);				
				ctx.drawImage(img, 218, 0, c.width, c.height, -35, 70, c.width, c.height);
				
				//Get Full - Face
				ctx.translate(518, 0);
				ctx.scale(-1, 1);
				img = document.querySelector("#img-fullface");
				ctx.drawImage(img, 0, 0, c.width, c.height);

				//Get Eyes
				img = document.querySelector("#img-eyes");
				ctx.drawImage(img, 0, 0, c.width, c.height);

				//Get Mouth
				img = document.querySelector("#img-mouth");
				ctx.drawImage(img, 0, 0, c.width, c.height);

				//Get Forehead
				// ctx.translate(518, 0);
				// ctx.scale(-1, 1);
				img = document.querySelector("#img-forehead");
				ctx.drawImage(img, 0, 0, c.width, c.height);

				//Get booth
				// ctx.translate(518, 0);
				// ctx.scale(-1, 1);
				// img = document.querySelector(".booth");
				// ctx.drawImage(img, 0, 0, c.width, c.height);

				// //Get headline (yellow title)
				// img = document.querySelector(".headline-message");
				// ctx.drawImage(img, 24, 77, 460 , 105);

				App.controller.utils.saveImage();
	    	}

	    }

    };

    return App;
});