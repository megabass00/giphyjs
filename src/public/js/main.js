$(document).ready(function(){

    // initialize datatables
    $('.datatable-js').DataTable( {
        "columnDefs": [
            { "orderable": false, "targets": [1,3] }
        ]
    });

    // enable tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // initialize buttons to copy to clipboard
    var buttons = document.querySelectorAll('.btn-clipboard');
    var clipboard = new ClipboardJS('button');
    clipboard.on('success', (e) => {
        setTooltip('Copied!');
        hideTooltip();
    });
    clipboard.on('error', (e) => {
        setTooltip('Failed!');
        hideTooltip();
    });
    console.log(clipboard);
    
    
    // form focus
    $('.input-focus').focus(() => {
        $(this).css('border-bottom', '2px solid #51ce00');
        console.log($(this));
    });
  
    $(".input-focus").focusout(() => {
        $(this).css('border-bottom', '1px solid #ced4da');
    });


    // FUNCTIONS //
    function setTooltip(message) {
        console.log('adkladlaksmdlka');
        $('.btn-clipboard').tooltip('hide')
            .attr('data-original-title', message)
            .tooltip('show');
    }

    function hideTooltip() {
        setTimeout(function() {
            $('.btn-clipboard').tooltip('hide');
        }, 1000);
    }
});
