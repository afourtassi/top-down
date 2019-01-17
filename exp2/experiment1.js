
// ## Helper functions

// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.

function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}

// Get a random integer less than n.
//function randomInteger(n) {
//	return Math.floor(Math.random()*n);
//}

//shuffle an array
function shuffleArray(a) {

    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a;
}


// Get a random element from an array (e.g., <code>random_element([4,8,7])</code> could return 4, 8, or 7). This is useful for condition randomization.
function randomElement(array) {
  return array[randomInteger(array.length)];
}

var task1 = new $('<img>').attr('src','images/task1.png').height(130).width(400);

var task2 = new $('<img>').attr('src','images/task2.png').height(130).width(400);



var MyInstruct = {
  
    "obj_inst" :"In this survey, you will be shown two objects, for example two apples or an apple and a sandwich (see pictures below). You will be asked to type the most specific word describing both objects.  In the first example, the most specific word that describes both objects is 'apple'. In the second example, the most specific word that describes both objects is 'food'. </br> </br> It is not always easy to find such a word, and for some objects you may not find any word. So, you will also be asked to evaluate the difficulty you had to come up spontaneousely with an answer.",
    
    "obj_inst_prac" : "You will now start a practice session. It is made of the two previously mentioned examples. The purpose of this session is to get you familiarized with the task, and the questions that will be asked.",
    
    "obj_inst_real" : "Now you will start the real task!",
    
    "sound_inst" :"In this second and last part of the survey, you will rate the similarity between pairs of random sounds.  In each trial you, will hear two sounds (e.g., 'lif' vs. 'neem') and your task is to determine the degree to which the these sounds are similar or different by a selecting a value from 1 to 7. </br></br> Note that some sounds are not in English, and that we are interested in your <i>subjective</i> similarity rating.",
    
    "sound_inst_prac" : "You will now start a practice session. The purpose of this session is to get you familiarized with the sounds and the range of similarities you will encounter later. We encourage you to develop a consistent way of using the ratings. Moreover, try to use the entire 1-7 scale and spread your judgements out evenly as much as possible.",
    
    "real_inst" :"</br></br></br></br></br>Now you will start the real session!"
    
    
}
var startTime
var endTime

var indices = shuffleArray([0,1,2,3,4])

//Pre-task
var Pre =['apple1', 'apple2','sandwich']
var pre_pics = new Array();
for (i=0; i < Pre.length; i++){
pre_pics.push($('<img>').attr('src','images/'+Pre[i]+'.jpg').height(170).width(170));
}

//Stimuli
var Stim1 = ['cow']
var Stim2 = ['cow1','buffle', 'deer','bird','car'];

//Preloading the stimuli:
var concept1 = new Array();
concept1.push($('<img>').attr('src','images/'+Stim1[0]+'.jpg').height(170).width(250));

var concept2 = new Array();
for (i=0; i < Stim2.length; i++){
concept2.push($('<img>').attr('src','images/'+Stim2[i]+'.jpg').height(170).width(250));
}

var myTrials=[];

//Instructions 1
myTrials.push(myTrial={
        trial_number: 0,
        trial_type: "obj_inst",

        });

myTrials.push(myTrial={
        trial_number: 0,
        trial_type: "obj_inst_prac",
        });


//Pre-task
for (i=0; i < Pre.length-1; i++){    
    myTrial = {
        trial_number: i+1,
        trial_type: "test_2",
        concept_l:pre_pics[0],
        concept_r:pre_pics[i+1],
        conName_l:Pre[0],
        conName_r:Pre[i+1],
        concept_dist:i+1
    }
    myTrials.push(myTrial);
    
    myTrial = {
        trial_number: i+1,
        trial_type: "test",
        concept_l:pre_pics[0],
        concept_r:pre_pics[i+1],
        conName_l:Pre[0],
        conName_r:Pre[i+1],
        concept_dist:i+1
    }
    myTrials.push(myTrial);
}

myTrials.push(myTrial={
        trial_number: 0,
        trial_type: "obj_inst_real",
        });

for (i=0; i < Stim2.length; i++){    
    myTrial = {
        trial_number: i+1,
        trial_type: "test_2",
        concept_l:concept1[0],
        concept_r:concept2[indices[i]],
        conName_l:Stim1[0],
        conName_r:Stim2[indices[i]],
        concept_dist:indices[i]+1
    }
    myTrials.push(myTrial);
    
    myTrial = {
        trial_number: i+1,
        trial_type: "test",
        concept_l:concept1[0],
        concept_r:concept2[indices[i]],
        conName_l:Stim1[0],
        conName_r:Stim2[indices[i]],
        concept_dist:indices[i]+1
    }
    myTrials.push(myTrial);
}


myTrials.push(myTrial={
        trial_number: '',
        trial_type: "briefing",
  
        });
/////////////////////////////////////
//THIS IS WHERE THE EXPERIMENT STARTS
////////////////////////////////////


showSlide("instructions");

// ## The main event

var experiment = {
    
  //Objets to be submitted:
    
  brief:{
    native:[],
    problem:[],
    ifproblem:[],
    comment:[]
  },
  data :{
    cat:[],
    dist: [],  
    rating:[],
    text:[],
    rt:[]
  },
    
  // Parameters for this sequence.
  trials: myTrials,
  // Experiment-specific parameters - which keys map to odd/even
  // The function that gets called when the sequence is finished.
  end: function() {
    // Show the finish slide.
    showSlide("finished");
    setTimeout(function() { 
        
        turk.submit(experiment) }, 1500);
  },
    
  // log response:
  log_response: function() {

	var response_logged = false;

	
	//Array of radio buttons
	var radio = document.getElementsByName("judgment");
	
	// Loop through radio buttons
	for (i = 0; i < radio.length; i++) {
	    if (radio[i].checked) {
		experiment.data.rating.push(radio[i].value);
		response_logged = true;		    
	    }
	}
	
	
	if (response_logged) {
	   nextButton_Att.blur();
	    
	    // uncheck radio buttons
	    for (i = 0; i < radio.length; i++) {
		radio[i].checked = false
	    }
	    experiment.next();
	} else {
	    $("#testMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
    },
    
    log_text: function() {

    var code = $('#text_code').val()
	if (code != "") {
	   experiment.data.text.push(code);
        endTime = Date.now();
       //var endTime = (new Date()).getTime()
       experiment.data.rt.push(endTime - startTime)
	   experiment.next();
       nextButton_text.blur();
  
        
	} else {
	    $("#testMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
    },
    
  // The work horse of the sequence - what to do on every trial.
  next: function() {
    // If the number of remaining trials is 0, we're done, so call the end function.
    if (experiment.trials.length == 0) {
      experiment.end();
      return;
    }
    
    $("#testMessage_att").html(''); 
    $("#text_code").val('');// clear the test message
    // Get the current trial - <code>shift()</code> removes the first element of the array and returns it.
    var current_trial = experiment.trials.shift();
      
    if (current_trial.trial_type ==  "obj_inst_prac" || "obj_inst_real")
        {
            showSlide("instructions2");
   $("#instruct_dyn").html(MyInstruct[current_trial.trial_type])
   
   $('#pic_task1').empty();
   $('#pic_task2').empty();
        }
      
    if (current_trial.trial_type == "obj_inst" )
        {
            showSlide("instructions2");
            $("#instruct_dyn").html(MyInstruct[current_trial.trial_type])
            
            $("#pic_task1").html(task1);
            $("#pic_task2").html(task2);
        }
      

      if (current_trial.trial_type == "test_2"){
          
        var current_concept_l= current_trial.concept_l;
        var current_concept_r= current_trial.concept_r;
          
          
        showSlide("availability");
          $('#object_left').empty();
          $('#object_right').empty();
          
        $('#object_left').html(current_concept_l);
        $('#object_right').html(current_concept_r);
          
    //Here create a Reaction time measure
          startTime = Date.now();
          
      }
      
      if (current_trial.trial_type == "test"){
          
        var current_concept_l= current_trial.concept_l;
        var current_concept_r= current_trial.concept_r;
          
              
          showSlide("stage");
          $('#object_test').empty(); 
          $('#obj_0').empty();
          $('#obj_1').empty(); 
        
            $("#sound_ext0").html("");
            $("#sound_ext1").html("");
          
          $('#obj_left').html(current_concept_l);
          $('#obj_right').html(current_concept_r);
          
          //experiment.data.tri_number.push(current_trial.trial_number);
          //experiment.data.tri_type.push(current_trial.trial_type);
          experiment.data.cat.push(current_trial.conName_r);
          experiment.data.dist.push(current_trial.concept_dist);
          
          
      }

     
      
      else if (current_trial.trial_type == "briefing")
        {
            showSlide("briefing");
            
            $( "#nextButton_brief" ).click(function() {
            experiment.brief.native.push(document.getElementById("native").value);
                
            experiment.brief.problem.push(document.getElementById("problem").value);
            experiment.brief.ifproblem.push(document.getElementById("ifproblem").value);
                
            experiment.brief.comment.push(document.getElementById("comment").value);

                
            });
        
        }


    }
  
}

