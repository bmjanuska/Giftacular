
//============ Array ==============

//page preloaded gifs
var gifs = ["mo graphics", "typography", "art", "calligraphy", "illustration" ];


//============ Functions ==============

	//function that adds the array of gifs we have and what we will add
	function displayGIF() {
		var gifDisp = $(this).attr("data-gif");

		//============ API ==============
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		gifDisp + "&api_key=dc6zaTOxFJmzC&limit=4&rating=pg";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response){

			console.log(response);

			var results = response.data;
			
			//for loop that uses already made array of items and items we will make
			for (var i = 0; i < results.length; i++) {

		 //======= New DIVS ==========

		 //creating div tag
          var gifDiv = $("<div class='col-md-3'>");

          //creating paragraph tag with the result items rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          //Creating and storing and image tag
          var gifImage = $("<img>");

          //attribute for still for later
          gifImage.attr("data-still", results[i].images.original_still.url);

          //attribute for animate for later
          gifImage.attr("data-animate", results[i].images.fixed_height.url);

          //setting the src attribute of the image to a property pullled off the result item
          gifImage.attr("src", results[i].images.original_still.url);

          //storing state. on load it is still
          gifImage.attr("data-state", "still");

          //giving image a class of gif to gifImage so the click attr can latch onto this
          gifImage.attr("class", "gif");


          //appednign the paragraph and image tag ot he gifDiv
          gifDiv.append(p);
          gifDiv.append(gifImage);

          //prepending to page
          $("#imageHuddle").prepend(gifDiv);
      }
  });
	}

	// to render buttons when people make them 
	//render btn
	function renderButtons(){
		$("#buttonHuddle").empty();

		for (var i = 0; i < gifs.length; i++){

			var button = $("<button>");

			button.addClass("gifs");

			button.attr("data-gif", gifs[i]);

			button.text(gifs[i]);

			$("#buttonHuddle").append(button);
		}
	}
	
	//add click listener to elements 	
	$("#add-button").on("click", function(event){
		event.preventDefault();

		var newGif = $("#button-input").val().trim();

		blankSpace = $("#button-input").val("");

	//prevent making blank buttons
	if (newGif != ("")){
		gifs.push(newGif);

		renderButtons();
	}


});

	$(document).on("click", ".gifs", displayGIF);

//initial three on load
renderButtons();



//============ Pause that GIF! ==============
	//var that determies state of gif
	//if and else to determine the state activated and what state it can switch to
    $(document).on("click",".gif", function() {

      //variable named state
      var state = $(this).attr("data-state");

      // checking the condition if the state is clicked or not

      if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }


 
    });

