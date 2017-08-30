//   Trivia Game JavaScript

$(document).ready(function() {
    /* Global Variables */
    var wins = 0;
    var losses = 0;
    var scoreToMatch = 0;
    var theirScore = 0;
    var gameOver = true;
    var number = 30;
    var intervalId; //Variable that will hold our interval ID when we execute
    
    //Custom Object to contain Question Information
    var Question = function(question, answers, correctIdx){
        this.question = question;
        this.answers = answers;
        this.correctIdx = correctIdx;
    };

/*  $.extend(Question.prototype, {
        AssignNewValue: function() {
            //Random between 1 and 12
            this.points = Math.floor((Math.random() * 12) + 1);
        }
    });
 */
    var questionArray = [];

    questionArray.push(new Question("Fastest Animal on Earth?", ["Elephant", "Snail", "Gazelle", "Cheetah"], 4));
    questionArray.push(new Question("Which Dimension is Time?", ["1", "2", "3", "4"], 4));
    questionArray.push(new Question("Where do you find Loopholes?", ["Knitting", "Taxes", "Crochet", "Quantum Physics"], 2));
    questionArray.push(new Question("What is the Most Popular Auto Color in America?", ["White", "Black", "Yellow", "Green"], 1));
    questionArray.push(new Question("Which Is The Furthest From Earth?", ["Jupiter", "Uranus", "Pluto", "Titan"], 3));

    var currQuestion = 0;
    var currAnswer = 0;

    $("#answer1").on("click", function() {
        // alert("It Works and ID: " + $(this).attr('id'));
        ResolveAnswer(1);
    });
    $("#answer2").on("click", function() {
        // alert("It Works and ID: " + $(this).attr('id'));
        ResolveAnswer(2);
    });
    $("#answer3").on("click", function() {
        // alert("It Works and ID: " + $(this).attr('id'));
        ResolveAnswer(3);
    });
    $("#answer4").on("click", function() {
        // alert("It Works and ID: " + $(this).attr('id'));
        ResolveAnswer(4);
    });

    //  The RunTimer function sets an interval
    //  that runs the decrement function once a second.
    function RunTimer() {
        intervalId = setInterval(decrement, 1000);
    }

    function DelayGame() {
        setTimeout(NextQuestion, 3000);
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
            $("#winloseimg").attr('src', 'https://media.giphy.com/media/sFZ7jXF6KHu8g/giphy.gif');
            DelayGame();
        }
    }

    function ResolveAnswer(answerNum) {
        StopTimer();
        if (answerNum == questionArray[currQuestion - 1].correctIdx) {
            //WINNER!
            //alert("GOOD JOB!!");
            $("#winlose").text("You Win!!");
            $("#winloseimg").attr('src', 'https://media.giphy.com/media/26tPcgtbhhbU88U2A/giphy.gif'); //<iframe src="https://giphy.com/embed/sFZ7jXF6KHu8g" width="480" height="354" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/sFZ7jXF6KHu8g">via GIPHY</a></p>
        } else {
            //alert("SORRY!");
            $("#winlose").text("Sorry, Incorrect!!");
            $("#winloseimg").attr('src', 'https://media.giphy.com/media/sFZ7jXF6KHu8g/giphy.gif');
            console.log("questionArray[currQuestion - 1].correctIdx", questionArray[currQuestion - 1].correctIdx);
            switch(questionArray[currQuestion - 1].correctIdx) {
                case 1:
                    $("#answer1").blink({
                        delay: 200
                    });
                    break;
                case 2:
                    $("#answer2").blink({
                        delay: 200
                    });
                    break;
                case 3:
                    $("#answer3").blink({
                        delay: 200
                    });
                    break;
                default:
                    $("#answer4").blink({
                        delay: 200
                    });
            }; //Switch
/*         $('#stop').click(function() {
            $('.blink').unblink();
        });
        $('#stop2').click(function() {
            $('.blink2').unblink();
        });
 */
        } // Else
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

    function StartGame() {
        currQuestion = 1;

        ShowQuestion();

        //  Set our number counter to 100.
        number = 30;

        //  Execute the run function.
         RunTimer();
    
    };

    function NextQuestion() {
        currQuestion ++;
        
        //Done with All Questions?
        if (currQuestion >= questionArray.length) {
            //Done!
            StopTimer();
            alert("Thanks for Playing!");
            return;
        }

        ShowQuestion();

        //  Set our number counter to 100.
        number = 30;
        $("#winlose").text("Good Luck!");
        $("#winloseimg").attr('src', 'https://media.giphy.com/media/88EvfARM1YaCQ/giphy.gif');

        //  Execute the run function.
        RunTimer();
    
    };

    StartGame();

})
