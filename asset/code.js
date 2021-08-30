var button_A = document.getElementById("btn_a");
var button_B = document.getElementById("btn_b");
var button_C = document.getElementById("btn_c");
var button_D = document.getElementById("btn_d");
var correct;
var current_index = 0;
var end_ = document.getElementById("end");
var final_scores = document.getElementById("final_score");
var first_page = document.getElementById("first_page");
var quiz_ = document.getElementById("quiz");
var questions_ = document.getElementById("questions");
var results = document.getElementById("result");
var score = 0;
var start_Button = document.getElementById("start_btn");
var submit_button = document.getElementById("submit_btn");
var time_left = 60;
var time = 0;
var _timer = document.getElementById("timer");
var user_name = document.getElementById("name");
var quiz_questions = [{
question: "What planet is closest to the sun?",
  a: "Earth",
  b: "Mars",
  c: "Mercury",
  d: "Saturn",
  correct_answer: "c"
  },{
  question: "Bill Gates is a founder of?",
  a: "Apple",
  b: "Microsoft",
  c: "BoostMobile",
  d: "Blackberry",
  correct_answer: "b"
  },{
  question: "Who is the founder of Facebook?",
  a: "Justin bieber",
  b: "Bill Gates",
  c: "Mark Zuckerberg",
  d: "Jeff Bezos",
  correct_answer: "c"
  },{
    question: "What day is Christmas?",
    a: "July 25",
    b: "March 10",
    c: "June 2",
    d: "December 25",
    correct_answer: "d"
    },{
    question: "Who is the current President?",
    a: "Joe Biden",
    b: "John Cena",
    c: "Barack Obama",
    d: "George Washington",
    correct_answer: "a"
        },];
var question_index = quiz_questions.length;
function check_answer(answers){
    correct = quiz_questions[current_index].correct_answer;
    if (answers === correct && current_index !== question_index){
        score++;
        alert("Correct");
        current_index++;
        make_question();
    }
    else if (answers !== correct && current_index !== question_index){
        alert("Incorrect")
        current_index++;
        make_question();
    }
    else{
        show_score();
}}
function make_question(){
  end_.style.display = "none";
    if (current_index === question_index){
        return show_score();
    }
    var current_question = quiz_questions[current_index];
    questions_.innerHTML = "<p>" + current_question.question + "</p>";
    button_A.innerHTML = current_question.a;
    button_B.innerHTML = current_question.b;
    button_C.innerHTML = current_question.c;
    button_D.innerHTML = current_question.d;
}
function start_quiz(){
    first_page.style.display = "none";
    end_.style.display = "none";
    quiz_.style.display = "block";
    make_question()
    time = setInterval(function() {
        time_left--;
        _timer.textContent = "Time left: " + time_left;
    }, 1000);
}
function generate_scores(){
    var _scores = JSON.parse(localStorage.getItem("save_scores")) || [];
    for (i=0; i < _scores.length; i++){
        var _name = document.createElement("li");
        var new_score = document.createElement("li");
        _name.textContent = _scores[i].name;
        new_score.textContent = _scores[i].score;
}}
submit_btn.addEventListener("click", function score(){
   if(user_name.value === "") {
       alert("Please enter something");
       return false;
   }
   else {
      var current_user = user_name.value.trim();
      var current_highscore = {
          name : current_user,
          score : score };
      var save_scores = JSON.parse(localStorage.getItem("save_scores")) || [];
      save_scores.push(current_highscore);
      localStorage.setItem("save_scores", JSON.stringify(save_scores));
      end_.style.display = "none";
      final_scores.style.display = "block";
      generate_scores();
 }});
function show_score(){
    final_scores.innerHTML = "You got " + score + " out of " + quiz_questions.length + " correct!";
    quiz_.style.display = "none"
    end_.style.display = "flex";
    user_name.value = "";
}
start_Button.addEventListener("click",start_quiz);
