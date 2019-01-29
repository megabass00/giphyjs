$(document).ready(function(){

    $('.input-focus').focus(function(){
        $(this).css('border-bottom', '2px solid #51ce00');
        console.log($(this));
    });
  
    $(".input-focus").focusout(function(){
        $(this).css('border-bottom', '1px solid #ced4da');
    });
});