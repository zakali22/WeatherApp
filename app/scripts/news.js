$(document).ready(function() {
    $.getScript( 'scripts/main.js', function( data, textStatus, jqxhr ) {
    console.log( 'Load was performed.' );
  });

    $.getJSON('https://newsapi.org/v1/sources?language=en&category=general', function(data) {
        /*optional stuff to do after success */
        var sourceArr = [];
        var random = parseInt(Math.floor((Math.random() * 23) + 0));
        console.log(data);
        $.each(data.sources, function(index, val) {
          sourceArr.push(val.id);
        });
        console.log(sourceArr);

        $.getJSON('https://newsapi.org/v1/articles?source=' + sourceArr[random] +'&sortBy=top&apiKey=14613ad2a71d44acb0e4cab6cef1c265',
          function(data) {
            /*optional stuff to do after success */
          console.log(data.articles);
            var output = '';
            $.each(data.articles, function(index, val) {
              if(val.url){
              output += '<a href="' + val.url + '"><div class="art col-md-12">';
                output += '<div class="row">';
                  output += '<div class="col-md-6">';
                    output += '<h1>'  + val.title + '</h1>';
                  output += '</div>';
                  output += '<div class="col-md-6">';
                    output += '<img class="img-responsive" src="' + val.urlToImage + '"/>';
                  output += '</div>';
                output += '</div>';
              output += '</div></a>';
              }
            });
            $('.articles').html(output);
        });
    });


    /* ----------------------------------------------------------------------------------------------
        Fetch headlines based on what was clicked
    -----------------------------------------------------------------------------------------------*/

    $('.nav').click(function(event) {
      /* Act on the event */
      $.getJSON('https://newsapi.org/v1/sources?&category=' + event.target.id + '&language=en',
        function(data) {
          /*optional stuff to do after success */
          var sourceArr = [];
          $.each(data.sources, function(index, val) {
            sourceArr.push(val.id);
          });
          var random = parseInt(Math.floor((Math.random() * parseInt(sourceArr.length)) + 0));

          $.getJSON('https://newsapi.org/v1/articles?source=' + sourceArr[random] +'&sortBy=top&apiKey=14613ad2a71d44acb0e4cab6cef1c265',
            function(data) {
              /*optional stuff to do after success */
              console.log(data.articles);
              var output = '';
              $.each(data.articles, function(index, val) {
                output += '<a href="' + val.url + '"><div class="art col-md-12">';
                  output += '<div class="row">';
                    output += '<div class="col-md-6">';
                      output += '<h1>' + val.title + '</h1>';
                    output += '</div>';
                    output += '<div class="col-md-6">';
                      output += '<img class="img-responsive" src="' + val.urlToImage + '"/>';
                    output += '</div>';
                  output += '</div>';
                output += '</div></a>';

              });
              $('.articles').html(output);
          });
      });
    });









});
