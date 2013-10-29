/*global define */
define([], function () {
    'use strict';

    var App = {
    	
    	config:{
    		messageFB: "404 Error",
    		video: {video: true, audio: false},
    		currentStep: 1,
    		imgUrl: "/images/monsterparts/",
    		filter: ""
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
	    			//Clean Picture Class
	    			$(App.obj.photo).removeClass();
	    			// Not showing vendor prefixes or code that works cross-browser.
					if (App.obj.stream) {
						var ctx = App.obj.canvas.getContext('2d');
						ctx.drawImage(App.obj.video, 0, 0, App.obj.canvas.width, App.obj.canvas.height);
					    // "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.					    
					    App.obj.photo.src = App.obj.canvas.toDataURL('image/jpeg', 1);
					    console.log(App.obj.photo);
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
				      'http://www.facebook.com/sharer/sharer.php?s=100&p[url]=' + encodeURIComponent("http://thehangar.cr") + '&p[images][0]=&p[title]=Hangar%20of%20the%20Dead&p[summary]=' + messageFB,
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
					$(".step" + App.config.currentStep).show();
					$(".termomenter").find("div").removeAttr("class").addClass("level" + App.config.currentStep);
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
	    			var imgObj = $('.img-part-content').find(".img-"+category);
	    			imgObj.attr("src",url);
	    			imgObj.addClass(App.config.filter);
	    		}
	    	}
	    },

	    flow: {
	    	step1: function() {
	    		App.controller.camera.takePicture();
	    	},
	    	step2: function() {
	    		// Pulls in meal data from JSON file
				$.getJSON('json/monster-part.json', function(json) {
				    App.controller.utils.loadImages(json.Wolfman, "wolfman");
				    App.controller.utils.loadImages(json.zombie, "zombie");
				    App.controller.utils.loadImages(json.vampire, "vampire");
				    App.controller.utils.loadImages(json.extras, "extras");
				}).done(function() {
					$(".part").on("click", function(){
				        App.controller.utils.pasteImage($(this).data("category"), $(this).find("img").attr("src"));
				    });
				});
	    	},
	    	step3: function() {
	    		console.log("Hacer paso 4");
	    	},
	    	step4: function() {
	    		console.log("Hacer paso 4");
	    	}

	    }

    };

    return App;
});