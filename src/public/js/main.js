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
    var clipboard = new ClipboardJS('button', {
        target: (trigger) => trigger.nextElementSibling
    });
    clipboard.on('success', (e) => {
        const identifier = $(e.trigger).attr('id');
        setTooltip('Copied!', identifier);
        hideTooltip(identifier);
    });
    clipboard.on('error', (e) => {
        setTooltip('Failed!', identifier);
        hideTooltip(identifier);
    });


    // initialize preview giphy fields
    $('.preview-giphy input').focusout((e) => {
        var url = e.target.value;
        if (validUrl(url)) {
            var $input = $(e.target);
            var $img = $input.parent().find('img');
            $img.attr('src', url);
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
});

// FUNCTIONS //
function setTooltip(message, identifier = null) {
    let selector = '.btn-clipboard';
    if (identifier) selector = '#' + identifier;
    $(selector).tooltip('hide')
        .attr('data-original-title', message)
        .tooltip('show');
}

function hideTooltip(identifier = null) {
    let selector = '.btn-clipboard';
    if (identifier) selector = '#' + identifier;
    setTimeout(function() {
        $(selector).tooltip('hide');
    }, 1000);
}

function validUrl(url) {
    if (!url) return false;
    var pattern =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return pattern.test(url);
}
