/*global define */
define([], function () {
    // 'use strict';

    var App = {

	    validation: {
	    	hasGetUserMedia: function (){
	            // Note: Opera is unprefixed.
				return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
				          navigator.mozGetUserMedia || navigator.msGetUserMedia);
	    	}
	    },

	    logic: {


	    },

	    flow: {

	    	step1: function() {

	    	},
	    	step2: function() {

	    	},
	    	step3: function() {

	    	},

	    }

    };

    return App;
});