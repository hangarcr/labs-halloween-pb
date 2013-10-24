/*global define */
define([], function () {
    // 'use strict';

    var video = document.querySelector('video');
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');
	var stream = null;

    var App = {

	    validation: {
	    	hasGetUserMedia: function (){
	            // Note: Opera is unprefixed.
				return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
				          navigator.mozGetUserMedia || navigator.msGetUserMedia);
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

	    	transition:{
	    		goToStep1:function(){
	    			$(".step5").hide();
	    			$(".step1").show();	
	    		}
	    	}


	    },

	    flow: {

	    	step1: function() {
	    		App.controller.camera.takePicture();
	    		$(".step1").hide();
	    		$(".step5").show();
	    	},
	    	step2: function() {

	    	},
	    	step3: function() {

	    	},

	    }

    };

    return App;
});