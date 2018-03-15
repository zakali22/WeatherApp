$(document).ready(function() {
    $.getScript( 'scripts/main.js', function( data, textStatus, jqxhr ) {
      console.log( 'Load was performed.' );
    });

      $('.tlt').textillate({ 
        inEffects: [ 'fadeIn' ],
        // custom set of 'out' effects
        outEffects: [ 'fadeOut' ],
        in: { 
          effect: 'fadeIn'
        },
        out: {
          effect: 'fadeOut'
        },
        loop: true, 
        autoStart: true
      });



    /* Making an AJAX call to the OpenSourceWeather API */
    $('.jumbotron .btn').on('click', function(e){
      var d = new Date();
      var weekday = new Array(7);
      weekday[0] =  'Sunday';
      weekday[1] = 'Monday';
      weekday[2] = 'Tuesday';
      weekday[3] = 'Wednesday';
      weekday[4] = 'Thursday';
      weekday[5] = 'Friday';
      weekday[6] = 'Saturday';


      e.preventDefault();
      var search = $('.form-control').val();
      $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + search + '&APPID=17f62b6dbcccbfc5051fd5af0e7a8c05',
      function(data) {
        console.log(data);
        
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var day = d.getDay();
        var degree = (data.main.temp - 273.15);

        var output = '<h1>Forecast for <span style="color: coral;">' + data.name + '</span></h1>';
        output += '<div class="row">';
        output += '<div class="col-md-12">';
        if(data.weather[0].description.includes('rain') || data.weather[0].description.includes('shower') || data.weather[0].description.includes('light intensity drizzle')){
          output += '<img src="../static/rainy-1.svg"/>';
        } else if(data.weather[0].description.includes('clear sky')){
          output += '<img src="../static/day.svg"/>';
        } else if(data.weather[0].description.includes('broken clouds') || data.weather[0].description.includes('scattered clouds')){
          output += '<img src="../static/cloudy-day-1.svg"/>';
        } else if(data.weather[0].description.includes('snow')){
          output += '<img src="../static/snowy-1.svg"/>';
        } else if(data.weather[0].description.includes('mist')){
          output += '<img src="../static/cloudy.svg"/>';
        }
        output += '</div>';
        output += '</div>';
        output += '<div class="row">';
        output += '<div class="col-sm-4">';
        output += '<h1>' + weekday[day] + '</h1>';
        output += '</div>';
        output += '<div class="col-sm-4">';
        output += '<h1>' + hours + ':' + minutes + '</h1>';
        output += '</div>';
        output += '<div class="col-sm-4">';
        output += '<h1>' + degree.toFixed(1) + '<span style="color: coral;">C<sup>o</sup></span></h1>';
        output += '</div>';
        output += '</div>';
        output += '<h4 style="float:left; margin-top:30px;"><a style="font-family:"Poiret One", sans-serif;" href="weather.html"><i class="fas fa-arrow-circle-left"></i> Back</a></h4>'
        $('.jumbotron .container').html(output);
    });
  });
});
