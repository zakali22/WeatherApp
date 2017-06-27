$(document).ready(function() {
    $.getScript( "scripts/main.js", function( data, textStatus, jqxhr ) {
    console.log( "Load was performed." );
  });

  /* Making an AJAX call to the OpenSourceWeather API */
  $('.search button').on('click', function(e){
    e.preventDefault();
    $('.container.first').animate({'margin-top': ;}, speed);
    $('.search h1').css('font-size', '35px');
    $('.search form').css('margin-top', '20px');
    var search = $('.search .form-control').val();
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + search + "&APPID=17f62b6dbcccbfc5051fd5af0e7a8c05",
    function(data) {
      /*optional stuff to do after success */
      console.log(data);
      var text = '';
      $.each(data.weather, function(key, val) {
        text += '<div class="col-sm-6 col-md-4">';
        text += '<div class="thumbnail">';
        //text += '<img src="http://openweathermap.org/img/w/10d.png" alt="...">';
        text += '<div class="caption">';
        text += '<h3>Thumbnail label</h3>';
        text += '</div>';
        text += '</div>';
        text += '</div>';
      });
      $('.widget .row').html(text);
    });
  });
});
