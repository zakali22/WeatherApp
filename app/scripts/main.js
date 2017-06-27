$(document).ready(function() {
  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
  $('.navicon').on('click', function(){
    $('#mySidenav').css({
      'width': '250px'
    });
    $('#main').css({
      'margin-left': '250px'
    });
  });


  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  $('.closebtn').on('click', function(){
    $('#mySidenav').css({
      'width': '0px'
    });
    $('#main').css({
      'margin-left': '0px'
    });
  });
});
