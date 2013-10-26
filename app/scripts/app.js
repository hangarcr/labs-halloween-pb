/*global define */
define([], function () {
    'use strict';

    var App = {
    	
    	config:{
    		messageFB: "404 Error",
    		video: {video: true, audio: false},
    		currentStep: 1
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
	    		},

	    		backStep:function(){
	    			$(".step" + App.config.currentStep).hide();
	    			App.config.currentStep--;
					$(".step" + App.config.currentStep).show();
	    		}
	    	}
	    },

	    flow: {
	    	step1: function() {
	    		App.controller.camera.takePicture();
	    	},
	    	step2: function() {
	    		console.log("Hacer paso 2");
	    	},
	    	step3: function() {
	    		console.log("Hacer paso 3");
	    	},
	    	step4: function() {
	    		console.log("Hacer paso 4");
	    	},

	    }

    };

    return App;
});