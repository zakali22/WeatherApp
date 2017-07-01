$(document).ready(function() {
    $.getScript( "scripts/main.js", function( data, textStatus, jqxhr ) {
    console.log( "Load was performed." );
  });

  $.getJSON('https://newsapi.org/v1/sources?language=en',
    function(data) {
      /*optional stuff to do after success */
      $.each(data.sources, function(index, val) {
        $.getJSON('https://newsapi.org/v1/articles?source=' + val.id + '&sortBy=top&apiKey=14613ad2a71d44acb0e4cab6cef1c265',
          function(data) {
            /*optional stuff to do after success */
            console.log(data.articles);
            var output = '';
            $.each(data.articles, function(index, val) {
              output += '<div class="art col-md-12">';
                output += '<h1>' + val.title + '</h1>';
                output += '<div class="row">';
                  output += '<div class="col-md-8">';
                    output += '<h3>' + val.description + '</h3>';
                  output += '</div>';
                  output += '<div class="col-md-4">';
                    output += '<img src="' + val.urlToImage + '"/>';
                  output += '</div>';
                output += '</div>';
              output += '</div>';

            });
            $('.articles').html(output);
        });
      });
  });
});
