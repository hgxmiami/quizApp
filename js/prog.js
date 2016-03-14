$(document).ready(function(){
   findElement();
});
 
var customerAnswer = {};
var good = 0;
var bad = 0;
 
$("#validate").on("click", function(e){
    var counter = 0;
    for(var x in customerAnswer){
        $.ajax({
        url: "http://fvi-grad.com:4004/quiz-get-answer/"+x+"",
        success: function(resp, txt, xhr){
             var answer = eval(resp);
            if(customerAnswer[x] == answer)
                good += 1;
            else
                bad += 1;
               counter++;
        }
            
    });
    }
    if(counter >= 5)
        alert("you had " + good + " goods and " + bad + " bad");
})
 
 
$(".panel-body").on("click", "input", function(e){
    var id = $(this).attr("name");
    var value = $(this).val();
    if(!customerAnswer[id]){
        findAnswers(id);
    }
});
 
function findElement(){
    $.getJSON(
        "http://fvi-grad.com:4004/quiz",
        function(resp,txt,xhr){
           for (var x in resp){
               $(".panel-body").find("ul").append(`<li data-question-id='${resp[x].id}'>${resp[x].questionText}</li>`);
               $request = $(".panel-body").find("li");
               for(var y in resp[x].answers){
                    if(resp[x].id == $($request[x]).data("question-id")){
                       $($request[x]).append(`<p><label><input type='radio' name='${resp[x].id}' value='${(resp[x].answers)[y]}'>${(resp[x].answers)[y]}</label></p>`);
                    }
               }
           }
        }
    );
};
 
function findAnswers(id){
    $.ajax({
        url: "http://fvi-grad.com:4004/quiz-get-answer/"+id+"",
        success: function(resp,txt,xhr){
           customerAnswer[id]=resp;
        }
    });
}
