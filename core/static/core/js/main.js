/*  ---------------------------------------------------
    Template Name: Amin
    Description:  Amin magazine HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    // Humberger Menu
    $(".humberger-open").on('click', function () {
        $(".humberger-menu-wrapper").addClass("show-humberger-menu");
        $(".humberger-menu-overlay").addClass("active");
        $(".nav-options").addClass("humberger-change");
    });

    $(".humberger-menu-overlay").on('click', function () {
        $(".humberger-menu-wrapper").removeClass("show-humberger-menu");
        $(".humberger-menu-overlay").removeClass("active");
        $(".nav-options").removeClass("humberger-change");
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });
    
    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    // Login Form
    $('.login-switch').on('click', function () {
        $('.login-section').fadeIn(400);
    });
    
    $('.login-close').on('click', function () {
        $('.login-section').fadeOut(400);
    });

    // Sign Up Form
    $('.signup-switch').on('click', function () {
        $('.signup-section').fadeIn(400);
    });
    
    $('.signup-close').on('click', function () {
        $('.signup-section').fadeOut(400);
    });
    
    // Switch from login to sign up
    $('.switch-to-signup').on('click', function (e) {
        e.preventDefault(); // Prevent the default link action
        $('.login-section').fadeOut(400, function () {
            $('.signup-section').fadeIn(400);
        });
    });



    $('.signup-form').on('submit', function (event) {
        event.preventDefault(); // Evita el envío del formulario por ahora
        const form = $(this);
        const url = form.attr('action');
        
        $.ajax({
            url: url,
            type: 'POST',
            data: new FormData(form[0]),
            contentType: false,
            processData: false,
            success: function (response) {
                // Verifica si el registro fue exitoso, usando un mensaje de éxito o el redireccionamiento
                if (response.success) {
                    // Cierra el formulario de registro y abre el de login
                    $('.signup-section').fadeOut(400, function () {
                        $('.login-section').fadeIn(400);
                    });
                } else {
                    // Muestra el mensaje de error
                    alert(response.error_message); // Asegúrate que el error se muestra
                }
            },
            error: function () {
                alert('Ocurrió un error al procesar el registro. Intenta nuevamente.');
            }
        });
    });




    // alertas del login 
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita el envío tradicional del formulario
    
        const form = e.target;
        const formData = new FormData(form);
    
        // Limpia mensajes de error anteriores
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
    
        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest' // Indica que es una solicitud AJAX
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect_url || '/';
            } else {
                const fieldError = form.querySelector(`input[name="${data.error_field}"] ~ .error-message`);
                if (fieldError) {
                    fieldError.style.display = 'inline';
                    fieldError.textContent = data.error_message;
                } else {
                    console.error('No se encontró el contenedor de error para:', data.error_field);
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });






    // Alertas de feedback
    $(document).ready(function () {
        // Maneja el evento submit del formulario de feedback
        $('.feedback-form').on('submit', function (event) { 
            event.preventDefault(); // Evita el envío tradicional del formulario
    
            const form = $(this);
            const url = form.attr('action');
            
            $.ajax({
                url: url,
                type: 'POST',
                data: new FormData(form[0]),
                contentType: false,
                processData: false,
                success: function (response) {
                    // Si la respuesta es exitosa, muestra un mensaje
                    if (response.success) {
                        alert(response.message || '¡Gracias por tu feedback!');
                        location.reload();
                    } else {
                        // Si no está logueado, muestra el formulario de login
                        if (response.message || 'Debes iniciar sesión para enviar feedback.') {
                            $('.login-section').fadeIn(400); 
                        } else {
                            alert(response.error_message); // Muestra otro mensaje de error
                        }
                    }
                },
                error: function () {
                    alert('Ocurrió un error al procesar el feedback. Intenta nuevamente.');
                }
            });
        });

        // Mostrar la sección de login cuando se haga clic en el botón de login
        $('.login-switch').on('click', function () {
            $('.login-section').fadeIn(400);
        });
    
        // Cerrar la sección de login al hacer clic en el botón de cerrar
        $('.login-close').on('click', function () {
            $('.login-section').fadeOut(400);
        });
    });



    //ALERTAS DE COMENTARIOS
    $(document).ready(function () {
        // Maneja el evento submit del formulario de comentarios
        $('#comentario-form').on('submit', function (event) {
            event.preventDefault(); // Evita el envío tradicional del formulario
        
            const form = $(this);
            const url = form.attr('action');
            
            $.ajax({
                url: url,
                type: 'POST',
                data: new FormData(form[0]),
                contentType: false,
                processData: false,
                success: function (response) {
                    // Si la respuesta es exitosa, muestra un mensaje
                    if (response.success) {
                        alert(response.message || '¡Comentario guardado con éxito!');
                        // Refrescar la página para mostrar los comentarios más recientes
                        location.reload();
                    } else {
                        // Si no está logueado, muestra el formulario de login o redirige
                        if (response.error_message || 'Debes iniciar sesión para comentar.') {
                            $('.login-section').fadeIn(400);
                        } else {
                            alert(response.error_message || 'Ocurrió un error al enviar el comentario.');
                        }
                    }
                },
                error: function () {
                    alert('Ocurrió un error al procesar el comentario. Intenta nuevamente.');
                }
            });
        });
    });


    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
    var hero_s = $(".hero-slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });

    /*------------------
        Trending Slider
    --------------------*/
    $(".trending-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------------
        Latest Review Slider
    --------------------------*/
    $(".lp-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: true,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        smartSpeed: 1200,
        autoHeight: false,
        dotsEach: 2,
        autoplay: true,
        responsive: {
            320: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });

    /*------------------------
        Update News Slider
    --------------------------*/
    $(".un-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        smartSpeed: 1200,
        autoHeight: false,
        dotsEach: 2,
        autoplay: true
    });

    /*------------------------
        Video Guide Slider
    --------------------------*/
    $(".vg-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------------
        Gallery Slider
    --------------------------*/
    $(".dg-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Barfiller
    --------------------*/
    $('#bar-1').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar-2').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar-3').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar-4').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar-5').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar-6').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });

    /*------------------
        Circle Progress
    --------------------*/
    $('.circle-progress').each(function () {
        var cpvalue = $(this).data("cpvalue");
        var cpcolor = $(this).data("cpcolor");
        var cpid = $(this).data("cpid");

        $(this).append('<div class="' + cpid + '"></div><div class="progress-value"></div>');

        if (cpvalue < 100) {

            $('.' + cpid).circleProgress({
                value: '0.' + cpvalue,
                size: 40,
                thickness: 2,
                startAngle: -190,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        } else {
            $('.' + cpid).circleProgress({
                value: 1,
                size: 40,
                thickness: 5,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        }
    });

    $('.circle-progress-1').each(function () {
        var cpvalue = $(this).data("cpvalue");
        var cpcolor = $(this).data("cpcolor");
        var cpid = $(this).data("cpid");

        $(this).append('<div class="' + cpid + '"></div><div class="progress-value"></div>');

        if (cpvalue < 100) {

            $('.' + cpid).circleProgress({
                value: '0.' + cpvalue,
                size: 60,
                thickness: 2,
                startAngle: -190,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        } else {
            $('.' + cpid).circleProgress({
                value: 1,
                size: 60,
                thickness: 5,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        }
    });

    $('.circle-progress-2').each(function () {
        var cpvalue = $(this).data("cpvalue");
        var cpcolor = $(this).data("cpcolor");
        var cpid = $(this).data("cpid");

        $(this).append('<div class="' + cpid + '"></div><div class="progress-value"></div>');

        if (cpvalue < 100) {

            $('.' + cpid).circleProgress({
                value: '0.' + cpvalue,
                size: 200,
                thickness: 5,
                startAngle: -190,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        } else {
            $('.' + cpid).circleProgress({
                value: 1,
                size: 200,
                thickness: 5,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        }
    });

})(jQuery);