$(document).ready(function() {
    $.getScript( "scripts/main.js", function( data, textStatus, jqxhr ) {
    console.log( "Load was performed." );
  });
  /* Making an AJAX call to the OpenSourceWeather API */
  $('.search button').on('click', function(e){
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";


    e.preventDefault();
    $('.container.first').addClass('push-up');
    $('.search h1').css('font-size', '35px');
    $('.search form').css('margin-top', '20px');
    var search = $('.search .form-control').val();
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + search + "&APPID=17f62b6dbcccbfc5051fd5af0e7a8c05",
    function(data) {
      /*optional stuff to do after success */
      console.log(data);
      var text = '';
        text += '<div class="col-sm-6 col-md-4 outer">';
        text += '<div class="thumbnail">';
        //text += '<img src="http://openweathermap.org/img/w/10d.png" alt="...">';
        text += '<div class="caption">';
          text += '<h3 id="name">' + data.name +'</h3>';
          text += '<div class="row">';
            text += '<div class="col-md-4">';
              text += '<h1 id="temp">' + (data.main.temp - 273.15).toFixed() + ' &deg;</h1>';
            text += '</div>';
            text += '<div class="col-md-4">';
            if(data.weather[0].main === "Rain"){
              text += '<img src="images/rain.png" width="70px" height="70px"/>';
            } else if (data.weather[0].main === "Clear") {
              text += '<img src="images/sun.png" width="70px" height="70px"/>';
            } else if (data.weather[0].main === "Thunderstorm") {
              text += '<img src="images/thunder.png" width="70px" height="70px"/>';
            } else if (data.weather[0].main === "Snow") {
              text += '<img src="images/snow.png" width="70px" height="70px"/>';
            } else {
              text += '<img src="images/cloud.svg" width="70px" height="70px"/>';
            }
            text += '</div>';
          text += '</div>';
          text += '<h1>' + weekday[d.getDay()] + " " +  d.getDate() +  '<sup>th</sup></h1>';
        text += '</div>';
        text += '</div>';
        text += '</div>';
      $('.widget .row').html(text);
    });
  });
});
