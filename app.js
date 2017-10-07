      // Initial array of cartoons
  var cartoons = ["Ducktales", "Adventure Time", "Transformers", "GI Joe" , "Mickie Mouse Clubhouse" , "Teen Titans Go" , "Darkwing Duck" , "Gummi Bears" , "Tailspin" , "The Jetsons" , "The Flintstones" , "Mask" , "Spongebob Squarepants" , "Dexter's Laboratory" , "He-man"];
     
      
 

  function renderButtons() {

        $("#buttons-view").empty();
        // Loops through the array of cartoons
        for (var i = 0; i < cartoons.length; i++) {

          var a = $("<button>");

          a.addClass("cartoons");

          a.attr("id", cartoons[i]);

          a.attr("data-name", cartoons[i]);
          // Provided the initial button text
          a.text(cartoons[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        };
      };

renderButtons();
 

 

function apiData(){
 //   $("button").on("click", function() {
      $("#cartoons-view").empty();
      var query = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        query + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;


          console.log(response.data);
      for(var k = 0; k < results.length;k++){ 
         var cartoonDiv = $('<div>');
         var p = $('<p>');
         var cartoonImage = $('<img>');

         var stillData = results[k].images.fixed_width_still.url;
         var animateData = results[k].images.fixed_width.url;
         var imageSrc = stillData;
         var rating = "Rating: " + results[k].rating;

         cartoonImage = cartoonImage.addClass('gif');
         cartoonImage = cartoonImage.attr('src' , imageSrc);
         cartoonImage = cartoonImage.attr('data-state' , 'still');
         cartoonImage = cartoonImage.attr('data-animate' , animateData );
         cartoonImage = cartoonImage.attr('data-still' , stillData );

         p = p.text(rating);

         cartoonDiv = cartoonDiv.addClass('padding');
         cartoonDiv = cartoonDiv.append(cartoonImage);
         cartoonDiv = cartoonDiv.prepend(p);

         $('#cartoons-view').prepend(cartoonDiv);
       };
        });
 //});

   
      };
     // This function handles events where the add movie button is clicked
      $("#add-cartoon").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var cartoonNew = $("#cartoon-input").val().trim();

        if (cartoonNew === ""){

        } else {
        cartoons.push(cartoonNew);


        renderButtons();
      }
      });


function gifClick(){
   //  $('.gif').on('click' , function() {

        var state = $(this).attr('data-state');

        var animateSrc = $(this).attr('data-animate');

        var stillSrc = $(this).attr('data-still');
        
        if (state === 'still'){
          $(this).attr('src' , animateSrc);
          $(this).attr('data-state' , 'animate');
        } else if (state === 'animate'){
          $(this).attr('src' , stillSrc);
          $(this).attr('data-state' , 'still');
        };
  //    });
   };

//The code below adds onClick event listeners to dynamically added dom elements
$(document).on("click", ".gif", gifClick);
$(document).on("click", ".cartoons", apiData);