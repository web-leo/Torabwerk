;$(function(){

    var pxs_url = 'img/maket.jpg';
    var pxs_height = '20000px';
    var pxs_opacity_control = true;

//===============================================================================================================================================================================================================

    $('body').append('<div class="screen" style="background:url('+pxs_url+') no-repeat center top; position: absolute; left: 0; right: 0; top: 0; height: '+pxs_height+'; z-index: 9999999999; pointer-events: none; display: none;"></div>')
    $('body').append('<div class="screen_control" style="position: fixed; right: 20px; top: 20px; z-index: 9999999999;"><button class="screen_switch">On</button> </div>');

    $('.screen_switch').bind('click', function(){
        console.log('ok')
        if($(this).hasClass('active')){
            $('.screen').hide();
            $(this).text('ON').removeClass('active');
        }
        else{
            $('.screen').show();
            $(this).text('OFF').addClass('active');
        }
    });

    if(pxs_opacity_control == true){

        $('.screen_control').append('<button data-opacity=".5">.5</button> <button data-opacity=".6">.6</button> <button data-opacity=".7">.7</button> <button data-opacity=".8">.8</button> <button data-opacity=".9">.9</button> <button data-opacity="1">1</button>')
        $('.screen_control button[data-opacity]').bind('click', function(){
            var opacity = $(this).data('opacity');
            $(this).attr('disabled');
            $(this).siblings().removeAttr('disabled');
            $('.screen').css({'opacity': opacity});
        }).last().click();
    }

});