$(document).ready(function(){
   findElement();
});
 
var customerAnswer = {};
 
$("#validate").on("click", function(e){
    console.log(customerAnswer);
})
 
 
$(".panel-body").on("click", "input", function(e){
    var id = $(this).attr("name");
    var value = $(this).attr("value");
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
