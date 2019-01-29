$(document).ready(function(){

    // initialize datatables
    $('.datatable-js').DataTable( {
        "columnDefs": [
            { "orderable": false, "targets": 3 }
        ]
    });

    // enable tooltips
    $('[data-toggle="tooltip"]').tooltip();
    
    // form focus
    $('.input-focus').focus(function(){
        $(this).css('border-bottom', '2px solid #51ce00');
        console.log($(this));
    });
  
    $(".input-focus").focusout(function(){
        $(this).css('border-bottom', '1px solid #ced4da');
    });
});