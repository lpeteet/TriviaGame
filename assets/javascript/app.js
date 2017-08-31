//   Trivia Game JavaScript

$(document).ready(function() {
    /* Global Variables */
    var number = 30;
    var intervalId; //Variable that will hold our interval ID when we execute
    
    //Custom Object to contain Question Information
    var Question = function(question, answers, correctIdx){
        this.question = question;
        this.answers = answers;
        this.correctIdx = correctIdx;
    };

    var questionArray = [];

    questionArray.push(new Question("Fastest Animal on Earth?", ["Elephant", "Snail", "Gazelle", "Cheetah"], 4));
    questionArray.push(new Question("Which Dimension is Time?", ["First", "Second", "Third", "Fourth"], 4));
    questionArray.push(new Question("Where do you find Loopholes?", ["Knitting", "Taxes", "Crochet", "Quantum Physics"], 2));
    questionArray.push(new Question("What is the Most Popular Auto Color in America?", ["White", "Black", "Yellow", "Green"], 1));
    questionArray.push(new Question("Which Is The Furthest From Earth?", ["Jupiter", "Uranus", "Pluto", "Titan"], 3));

    var currQuestion = 0;
    var currAnswer = 0;
    $('.start').on("click", function() {
        //alert("It Works and ID: " + $(this).attr('id'));
        console.log("ReStart Button Clicked!");
        StartGame();
    });

    $("#answer1").on("click", function() {
        // alert("It Works and ID: " + $(this).attr('id'));
        if (currAnswer > 0) {
            //Currently Clicks are NOT Enabled
            return;
        }
        ResolveAnswer(1);
        currAnswer = 1;
    });
    $("#answer2").on("click", function() {
        // alert("It Works and ID: " + $(this).attr('id'));
        if (currAnswer > 0) {
            //Currently Clicks are NOT Enabled
            return;
        }
        ResolveAnswer(2);
        currAnswer = 2;
    });
    $("#answer3").on("click", function() {
        // alert("It Works and ID: " + $(this).attr('id'));
        if (currAnswer > 0) {
            //Currently Clicks are NOT Enabled
            return;
        }
        ResolveAnswer(3);
        currAnswer = 3;
    });
    $("#answer4").on("click", function() {
        // alert("It Works and ID: " + $(this).attr('id'));
        if (currAnswer > 0) {
            //Currently Clicks are NOT Enabled
            return;
        }
        ResolveAnswer(4);
        currAnswer = 4;
    });

    //******** FUNCTIONS  ********/

    //  The RunTimer function sets an interval
    //  that runs the decrement function once a second.
    function RunTimer() {
        intervalId = setInterval(decrement, 1000);
    }

    function DelayGame() {
        setTimeout(NextQuestion, 4000); //4 Seconds
    }

    //  The stop function
    function StopTimer() {
        
              //  Clears our intervalId
              //  We just pass the name of the interval
              //  to the clearInterval function.
              clearInterval(intervalId);
              intervalId = -1;
    }

    //  The decrement function.
    function decrement() {
        
        //  Decrease number by one.
        number--;

        //  Show the number in the #time tag.
        $("#time").html("<h2>" + number + "</h2>");


        //  Once number hits zero...
        if (number === 0) {
            //  ...run the stop function.
            StopTimer();

            //  Alert the user that time is up.
            $("#winlose").text("Time Up!!");
            $("#winlose").css('color', 'red');
            $("#winlose").blink({
                delay: 200
            });
            $("#winloseimg").attr('src', 'https://media.giphy.com/media/sFZ7jXF6KHu8g/giphy.gif');
            $("#answer" + questionArray[currQuestion - 1].correctIdx).blink({
                delay: 200
            });
            DelayGame();
        }
    }

    function ResolveAnswer(answerNum) {
        StopTimer();

        if (answerNum == questionArray[currQuestion - 1].correctIdx) {
            //WINNER!
            //alert("GOOD JOB!!");
            $("#winlose").text("You Win!!");
            $("#winlose").css('color', 'greenyellow');
            $("#winloseimg").attr('src', 'https://media.giphy.com/media/26tPcgtbhhbU88U2A/giphy.gif'); //<iframe src="https://giphy.com/embed/sFZ7jXF6KHu8g" width="480" height="354" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/sFZ7jXF6KHu8g">via GIPHY</a></p>
        } else {
            //alert("SORRY!");
            $("#winlose").text("Sorry, Incorrect!!");
            //DEBUGGING
            $("#winlose").css('color', 'red');
            //$("#winlose").addclass("text-success");
            //$("#winlose").addclass("text-danger");
            $("#winloseimg").attr('src', 'https://media.giphy.com/media/sFZ7jXF6KHu8g/giphy.gif');
            console.log("questionArray[currQuestion - 1].correctIdx", questionArray[currQuestion - 1].correctIdx);
            $("#answer" + questionArray[currQuestion - 1].correctIdx).blink({
                delay: 200
            });
        } // Else

        $("#winlose").blink({
            delay: 200
        });

        DelayGame();

    } //function ResolveAnswer(answerNum) {

    function ShowQuestion() {
        console.log("Current Question", questionArray[currQuestion - 1].question);
        $("#question").text(questionArray[currQuestion - 1].question);
        $("#answer1").text(questionArray[currQuestion - 1].answers[0]);
        $("#answer2").text(questionArray[currQuestion - 1].answers[1]);
        $("#answer3").text(questionArray[currQuestion - 1].answers[2]);
        $("#answer4").text(questionArray[currQuestion - 1].answers[3]);
    }

    function NextQuestion() {
        $("#winlose").unblink();
        $("#winlose").css('color', 'white');
        
        
        $("#answer1").unblink();
        $("#answer2").unblink();
        $("#answer3").unblink();
        $("#answer4").unblink();
        currQuestion ++;
        
        //Done with All Questions?
        if (currQuestion > questionArray.length) {
            //Done!
            StopTimer();
            alert("Thanks for Playing!");
            return;
        }

        //Re-Enable Text Click Events
        currAnswer = 0;
        ShowQuestion();

        //  Set our number counter to 100.
        number = 30;
        $("#winlose").text("Good Luck!");
        $("#winloseimg").attr('src', 'https://media.giphy.com/media/88EvfARM1YaCQ/giphy.gif');

        //  Execute the run function.
        RunTimer();
    
    };

    function StartGame() {
        currQuestion = 1;
        if (intervalId > 0) {
            StopTimer();
        }
        ShowQuestion();

        //  Set our number counter to 100.
        number = 30;

        //  Execute the run function.
         RunTimer();
    
    };

    StartGame();

})
