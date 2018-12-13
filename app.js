$(function() {

	//declare variables
	var myArray;
	var inputLength;
	var reading = false;
	var counter;
	var action;
	var frequency = 200;
	//on page load hide elements we dont need, leave only text , area and start button
	$("#new").hide();
	$("#pause").hide();
	$("#resume").hide();
	$("#controls").hide();
	$("#result").hide();
	$("#error").hide();

	//click on Start Reading
	$("#start").click(function() {
		// get text and split it to words inside an array
		//\s matches spaces, tabs, new lines, etc, and * means one or more.
		myArray = $("#userInput").val().split(/\s+/);

		//get the no of words
		inputLength = myArray.length;

		//checking the words in input
		if(inputLength> 1) {

			//move to the reading mode
			reading = true;

			//hide start button/ error message/userinput, show new/pause/controls
			$("#start").hide();
			$("#error").hide();
			$("#userInput").hide();
			$("#new").show();
			$("#pause").show();
			$("#controls").show();

			//set progress slider max
			$("#progressslider").attr("max" , inputLength-1);

			//start the counter at 0
			counter = 0;

			//show reading box with the first word
			$("#result").show();
			$("#result").text(myArray[counter]);

			//starting reading from the first word
			action = setInterval(read , frequency);

		} else {
			$("#error").show();
	
		}
	});

	//click on new
	$("#new").click(function() {
		location.reload();
	});
	//click on pause
	$("#pause").click(function() {
	//stop reading aand switch to non reading mode
	clearInterval(action);
	reading = false;

	//hide pause and show resume
	$("#pause").hide();
	$("#resume").show();

	});
	//click on Resume
    $("#resume").click(function() {
	//start reading aand switch to non reading mode
	action = setInterval(read, frequency)
	reading = true;

	//show pause and hide resume
	$("#pause").show();
	$("#resume").hide();

	});

	//change fontsize
	$("#fontsizeslider").on("slidestop" , function(event , ui) {
		// refresh the slider
		$("fontsizeslider").slider("refresh");

		//get the value of slider
		var slidervalue = parseInt($("#fontsizeslider").val());

		$("#result").css("fontSize" , slidervalue);
		$("#fontsize").text(slidervalue);
	});

	//change speed
	$("#speedslider").on("slidestop" , function(event , ui) {
		// refresh the slider
		$("speedslider").slider("refresh");

		//get the value of slider
		var slidervalue = parseInt($("#speedslider").val());

		$("#speed").text(slidervalue);

		//stop the reading
		clearInterval(action);

		//change frequency
		frequency = 60000/slidervalue;

		//resume reading if we r in reading mode
		if(reading) {
			action = setInterval(read, frequency);
		}

	});

	//progress slider
	$("#progressslider").on("slidestop" , function(event , ui) {
		// refresh the slider
		$("progressslider").slider("refresh");

		//get the value of slider
		var slidervalue = parseInt($("#progressslider").val());

		//stop the reading
		clearInterval(action);

		//change counter 
		counter = slidervalue;

		//change the word
		$("#result").text(myArray[counter]);

		//change value of progress
		$("#percentage").text(Math.floor(counter/(inputLength-1)*100)); 

		//resume reading if we r in reading mode
		if(reading) {
			action = setInterval(read, frequency);
		}

	});

	//functions

	function read() {
		if(counter == inputLength-1) { //last word
			clearInterval(action);
			reading = false;
			$("#pause").hide();
		} else {
			//counter goes up by one
			counter++;

			//get word
			$("#result").text(myArray[counter]);

			//change progress slider value and refresh 
			$("#progressslider").val(counter);
			$("#progressslider").slider('refresh');

			//change the text of percentage 
			$("#percentage").text(Math.floor(counter/(inputLength-1)*100));
		}
	}
});










