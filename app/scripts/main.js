require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrapAffix: '../bower_components/sass-bootstrap/js/affix',
        bootstrapAlert: '../bower_components/sass-bootstrap/js/alert',
        bootstrapButton: '../bower_components/sass-bootstrap/js/button',
        bootstrapCarousel: '../bower_components/sass-bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/sass-bootstrap/js/collapse',
        bootstrapDropdown: '../bower_components/sass-bootstrap/js/dropdown',
        bootstrapModal: '../bower_components/sass-bootstrap/js/modal',
        bootstrapPopover: '../bower_components/sass-bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/sass-bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/sass-bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/sass-bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/sass-bootstrap/js/transition'
    },
    shim: {
        bootstrapAffix: {
            deps: ['jquery']
        },
        bootstrapAlert: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapButton: {
            deps: ['jquery']
        },
        bootstrapCarousel: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapCollapse: {
            deps: ['bootstrapTransition']
        },
        bootstrapDropdown: {
            deps: ['jquery']
        },
        bootstrapModal:{
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapPopover: {
            deps: ['jquery', 'bootstrapTooltip']
        },
        bootstrapScrollspy: {
            deps: ['jquery']
        },
        bootstrapTab: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapTooltip: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapTransition: {
            deps: ['jquery']
        }
    }
});

require(['app', 'jquery', 'bootstrapCollapse', 'bootstrapCarousel', 'bootstrapTooltip'], function (App, $) {
    'use strict';    

    //---------------------- Active Camera ----------------------
    if(App.validation.hasGetUserMedia){  

        if(navigator.getUserMedia) { // Standard

            navigator.getUserMedia(App.config.video, function(stream) {
                
                App.controller.camera.setStream(stream);
                App.obj.video.src = stream;
                App.obj.video.play();
                $(".glyphicon-camera").css("display", "block");

            }, App.validation.errorCallback);

        } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed

            navigator.webkitGetUserMedia(App.config.video, function(stream){

                App.controller.camera.setStream(stream);
                App.obj.video.src = window.webkitURL.createObjectURL(stream);
                App.obj.video.play();
                $(".glyphicon-camera").css("display", "block");

            }, App.validation.errorCallback);
        }
                    
    } else {
        alert('getUserMedia() is not supported in your browser');
    }

    //---------------------- BTN Filters ----------------------

    $('.filter .btn-main').on("click", function () {    
        $(App.obj.photo).removeClass();
        var filter = $(this).attr("data-filter");
        $(App.obj.photo).addClass(filter);
        App.controller.utils.setFilter(filter);
        $(".filter .btn-main-selected").removeClass("btn-main-selected");
        $(this).addClass("btn-main-selected");
    });

    $('.filter .btn-reset').on("click", function () {    
        $("." + App.config.filter).removeClass(App.config.filter);
        $(".filter .btn-main-selected").removeClass("btn-main-selected");
        App.controller.utils.setFilter("");
    });    

    //---------------------- BTN Events ----------------------

    $(".next").on("click", function(){
        App.controller.utils.nextStep();
    });

    $(".back").on("click", function(){
        App.controller.utils.backStep();
    });

    $(".glyphicon-share").on("click", function(){
        App.controller.utils.shareFacebook();
    });

    $(".clear-all").on("click", function(){
        $('.img-part-content').find("img").attr("src", "");
    });

    $(".accordion-toggle").on("click", function(){
        $(".panel-heading .btn-main-selected").removeClass("btn-main-selected");
        $(this).addClass("btn-main-selected");
    });

    $(".messages").find(".btn-main").on("click", function(){
        $(".messages .btn-main-selected").removeClass("btn-main-selected");
        $(this).addClass("btn-main-selected");
        $(".headline img").attr("src", "/images/headlines/" + $(this).attr("data-file") + ".png"); 
    });

    $(".messages").find(".btn-reset").on("click", function(){
        $(".messages .btn-main-selected").removeClass("btn-main-selected");
        $(".headline img").attr("src","");
    });

    $('body').keyup(function(e){
       if(e.keyCode == 32){
           App.controller.utils.nextStep();
       }
    });

    document.getElementById('download').addEventListener('click', function() {
        App.controller.utils.downloadCanvas(this, 'final-canvas', 'myscaryface.png'); 
    }, false);

    //$(".glyphicon-download").on("click", function(){
    //    App.controller.utils.downloadCanvas($(this), 'final-canvas', 'myscaryface.png'); // <- this can be a dynamic name
    //});
    
    //---------------------- Bootstrap Utils ----------------------
    
   // $(".collapse").collapse();
    $('#accordion').collapse({
        toggle: true
    });

    $('.carousel').carousel({
      interval: false
    })


    // console.log(app);
    // console.log('Running jQuery %s', $().jquery);
});
