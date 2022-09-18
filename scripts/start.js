( function( $ ) {

  var effectsArray = $.getJSON("../data/joke_wheel.json");

  console.log(effectsArray);


  var jsonObject = jQuery.parseJSON(effectsArray);

  var deletedEffects = [];

      function getRandom(max, min) {
        return Math.random() * (max - min) + min;
      }

      function playSound(name) {
        var soundFile = document.createElement("audio");
        soundFile.src = "src/audio/horror/" + name + ".mp3";
        soundFile.play();
      }

      function doWheel(data) {

        const $wheel = $( '.wheel .wheel__inner' );
        const $wheelSpinClass = $( '.wheel__inner' );
        let items = jsonObject.length;
        let diameter = $wheel.height();
        let radius = diameter / 2;
        let angle = 360 / items;
        let circumference = Math.PI * diameter;
        let height = 80;
        let width = (circumference / items) + 1;

        for ( let i = 0; i < jsonObject.length; i++ ) {

            var transform = `rotateY(${ angle * i }deg) translateZ(${ radius }px)`;
            $( '<div>', {class: 'wheel__segment'} )
            .html( `<span> <img src="src/assets/wheel_horror/icons/` + jsonObject[i].pic + `" width="60" height="60"> </span>` ).appendTo( $wheel )
            .css( {'transform': transform,'height': height, 'width': width, 'background-image': 'url(src/assets/wheel_img/buff_allgreen.png)'} )

        }
        $wheel.css('margin-top','-'+height+'px');
        $wheel.css('margin-left','-'+width/2+'px');

        $( ".wheel_button input[type=submit]" ).click(function( event ) {

          $( '.wheel__inner' ).empty()

          let result = [];
          $.grep(jsonObject, function(item) {
            if ($.inArray(item, deletedEffects) == -1) result.push(item);
          });

          jsonObject = result;

          let items = jsonObject.length;
          let diameter = $wheel.height();
          let radius = diameter / 2;
          let angle = 360 / items;
          let circumference = Math.PI * diameter;
          let height = 80;
          let width = (circumference / items) + 1;

          for ( let i = 0; i < result.length; i++ ) {
              var transform = `rotateY(${ angle * i }deg) translateZ(${ radius }px)`;

              $( '<div>', {class: 'wheel__segment'} )
              .html( `<span> <img src="src/assets/wheel_horror/icons/` + jsonObject[i].pic + `" width="60" height="60"> </span>` ).appendTo( $wheel )
              .css( {'transform': transform,'height': height, 'width': width, 'background-image': 'url(src/assets/wheel_img/buff_allgreen.png)'} )
              .click(function() {

                deletedEffects.push(jsonObject[i]);
                playSound("crow");
                console.log(jsonObject[i]);
              });
          }
          $wheel.css('transform-origin','100% 100%');
          $wheel.css('margin-top','-'+height+'px');
          $wheel.css('margin-left','-'+width/2+'px');

          $wheel.change();

          $("#descriptionName").text('');
          $("#descriptionText").text('');
          $("#descriptionLegendary").text('');

          playSound("spin/" + spinSounArray[Math.floor(getRandom(spinSounArray.length,0))]);

          $wheelSpinClass.addClass('wheelAnimation');

            var rotateDeg = getRandom(360,angle/2);

            var currentPosition = (360 - (rotateDeg-(angle/2)))/angle;
            var roundedPosition = Math.floor(currentPosition);

            $wheelSpinClass.css('transform', 'rotateY(' + rotateDeg + 'deg)');

            // console.log("rotated: " + rotateDeg + " current: " + currentPosition + " roundedPosition: " + roundedPosition);
            console.log("rotated: " + rotateDeg + " current: " + currentPosition + " " + jsonObject[roundedPosition].name);

            setTimeout(function(){
              $wheelSpinClass.removeClass('wheelAnimation');

              $("#descriptionName").text(jsonObject[roundedPosition].name);
              $("#descriptionText").text(jsonObject[roundedPosition].description);

              playSound("effects/" + posSFXArray[Math.floor(getRandom(posSFXArray.length,0))]);

            }, 9300);
         });

      }

      doWheel(jsonObject);

} )( jQuery );
