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


    // initialize preview giphy fields
    $('.preview-giphy input').focusout((e) => {
        var url = e.target.value;
        if (validUrl(url)) {
            console.log($(this));
        }
    });
    
    
    
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

    function validUrl(url) {
        if (!url) return false;
        var pattern =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        return pattern.test(url);
    }
});
