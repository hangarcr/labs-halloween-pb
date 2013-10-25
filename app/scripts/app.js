/*global define */
define([], function () {
    // 'use strict';

    var video = document.querySelector('video');
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');
	var stream = null;
	var messageFB = "404 Error";
	var currentStep = 1;

    var App = {

	    validation: {
	    	hasGetUserMedia: function (){
	            // Note: Opera is unprefixed.
				return !!(navigator.getUserMedia );
	    	}
	    },

	    controller: {
	    	camera:{
	    		setStream:function(streamValue){
	    			stream = streamValue;
	    		},

	    		takePicture:function(){
	    			// Not showing vendor prefixes or code that works cross-browser.
					if (stream) {
						ctx.drawImage(video, 0, 0);
					    // "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
					    document.querySelector('img').src = canvas.toDataURL('image/webp');
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
					switch(currentStep)
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
	    			$(".step" + currentStep).hide();
	    			currentStep++;
					$(".step" + currentStep).show();
	    		},

	    		backStep:function(){
	    			$(".step" + currentStep).hide();
	    			currentStep--;
					$(".step" + currentStep).show();
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