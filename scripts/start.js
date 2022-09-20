( function( $ ) {

  var effectsArray = $.getJSON("../data/joke_wheel.json", function(jd) {
                  console.log(jd[0].type);
               });
  // console.log(effectsArray);
  // var jsonObject = jQuery.parseJSON(effectsArray);
  // console.log(jsonObject);
  // console.log(jsonObject);

} )( jQuery );
