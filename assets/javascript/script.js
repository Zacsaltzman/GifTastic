//Institute Variables
var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
var test = true;

//Functions

	function renderButtons () {
		$(".buttons-view").empty();
		for (var i = 0; i < topics.length; i++) {
			var newButton = $("<button>");
			newButton.addClass("topic");
			newButton.attr("data-name", topics[i]);
			newButton.text(topics[i]);
			$(".buttons-view").append(newButton);
		}
	};

	$("#add-topic").on("click", function (event) {
		event.preventDefault();
		var topic = $("#topic-input").val().toLowerCase().trim();
		topics.push(topic);
		renderButtons();
	});

	function displayGifs () {
		var topic = $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=20";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(response);

          $(".gifs-view").empty();
          for (var i = 0; i < response.data.length; i++) {
          	var gifDiv = $("<div>");
          	gifDiv.addClass("gifDiv");
          	gifDiv.html("<p>Rating: " + response.data[i].rating + "</p>");
          	var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
          	gifImage.addClass("gif");
          	var imageDiv = $("<div>");
          	imageDiv.addClass("play");
          	imageDiv.attr("flag", "0");
          	imageDiv.attr("data-number", i);
          	imageDiv.attr("data-name", topic);
          	$(imageDiv).append(gifImage);
          	$(gifDiv).append(imageDiv);
          	$(".gifs-view").append(gifDiv);
          }

        });
	};

	function playGif () {

		var topic = $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=20";
		var topicNumber = $(this);

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

		if ($(topicNumber).attr("flag") == "0") {
			$(topicNumber).html("<img src='" + response.data[$(topicNumber).attr("data-number")].images.fixed_height.url + "'>");
			$(topicNumber).attr("flag", "1");
			console.log("working");
		}
		else {
			$(topicNumber).html("<img src='" + response.data[$(topicNumber).attr("data-number")].images.fixed_height_still.url + "'>");
			$(topicNumber).attr("flag", "0");
		}

		});
	};


	$(document).on("click", ".topic", displayGifs);
	$(document).on("click", ".play", playGif);

//Running Code
renderButtons();