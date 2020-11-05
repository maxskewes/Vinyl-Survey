console.log("PCC Housing Survey");

function Question(title, text)  {
  this.title = title;
  this.text = text;
  this.toHTML = function()  {
    var result = "";

    result += "<h3>" + this.number + ". " + this.title + "</h3>\n";
    result += "<p>" + this.text + "</p>\n";
    return result;
  };
  this.getAnswers = function () {
    return {};
  };
  this.getAnswers = function()  {
    return {};
  };
}

function MultipleChoiceQuestion(title, text, options) {
  Question.call(this, title, text);

  var superToHTML = this.toHTML;

  this.toHTML = function() {
    var result = superToHTML.call(this);

    result += '<ol id="' + title + '" type="a">\n'
    for (var i = 0; i < options.length; i++)  {
      result += '<li><input type="radio" name="' + title + '" value="' + options[i] + '">' + options[i] + '</li>\n';  
    }
    result += "</ol>\n";
    return result;
  };
  this.getAnswers = function()  {
    var answers = {};
    var inputs = document.getElementById(title).getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
      answers[inputs[i].value] = inputs[i].checked;
    }
    return answers;
  };
}

function MultipleChoiceOtherQuestion(title, text, options) {
  MultipleChoiceQuestion.call(this, title, text, options);

  var superToHTML = this.toHTML;
  var superGetAnswers = this.getAnswers;

  this.toHTML = function() {
    var result = superToHTML.call(this);

    result += '<p>Other: <input id="' + title + '_other" type="text" name="Other"></p>\n';
    return result;
  };
  this.getAnswers = function()  {
    var answers = superGetAnswers.call(this);
    var input = document.getElementById(title + "_other");
    answers["Other"] = input.value;

    return answers;
  };
}

function MultipleSelectQuestion(title, text, options) {
  Question.call(this, title, text);

  var superToHTML = this.toHTML;

  this.toHTML = function() {
    var result = superToHTML.call(this);

    result += '<ol id="' + title + '" type="a">\n'
    for (var i = 0; i < options.length; i++)  {
      result += '<li><input type="checkbox" name="' + title + '" value="' + options[i] + '">' + options[i] + '</li>\n';  
    }
    result += "</ol>\n";
    return result;
  };
  this.getAnswers = function()  {
    var answers = {};
    var inputs = document.getElementById(title).getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
      answers[inputs[i].value] = inputs[i].checked;
    }
    return answers;
  };
}

function MultipleSelectOtherQuestion(title, text, options) {
  MultipleSelectQuestion.call(this, title, text, options);

  var superToHTML = this.toHTML;
  var superGetAnswers = this.getAnswers;

  this.toHTML = function() {
    var result = superToHTML.call(this);

    result += '<p>Other: <input id="' + title + '_other" type="text" name="Other"></p>\n';
    return result;
  };
  this.getAnswers = function()  {
    var answers = superGetAnswers.call(this);
    var input = document.getElementById(title + "_other");
    answers["Other"] = input.value;

    return answers;
  };
}

function ShortAnswerQuestion(title, text) {
  Question.call(this, title, text);

  var superToHTML = this.toHTML;

  this.toHTML = function() {
    var result = superToHTML.call(this);

    result += '<p>Please type your answer here: <input id="' + title + '" type="text" name="' + title + '"></p>\n';
    return result;
  };
  this.getAnswers = function() {
    var answers = {};
    var input = document.getElementById(title);

    answers[title] = input.value;
    
    return answers;
  };
}

function QuestionSection(title, questions)  {
  this.title = title;
  this.toHTML = function()  {
    var result = "<h2>Section " + this.number + ": " + title + "</h2>\n";

    for (var i = 0; i < questions.length; i++)  {
      result += questions[i].toHTML();
    }
  return result;
  };
  this.getAnswers = function()  {
    var answers = {};

    for (var i = 0; i < questions.length; i++)  {
      answers[questions[i].title] = questions[i].getAnswers();
    }
    return answers;
  };
}

function Survey(title, sections)  {
  this.toHTML = function()  {
    var result = "<h1>" + title + "</h1>\n";

    for (var i = 0; i < sections.length; i++)  {
      result += sections[i].toHTML();
    }
  result += '<input id="submit" type="button" value="SUBMIT">\n';
  return result;
  };
  this.getAnswers = function()  {
    var answers = {};

    for (var i = 0; i < sections.length; i++)  {
      answers[sections[i].title] = sections[i].getAnswers();
    }
    return answers;
  }; 
}

window.addEventListener("load", function()  {
  var survey = createSurveyQuestions();

  function submit() {
    var answers = survey.getAnswers();
    console.log(answers);
    var form =  document.createElement('form');
    form.method = 'POST';
    form.action = 'submit_vinyl.php';
    form.innerHTML = '<input type="hidden" name="answers" values="' + encodeURIComponent(JSON.stringify(answers)) + '">';
    document.getElementsByTagName('body')[0].appendChild(form);
    // form.submit();
  }
  document.getElementById("survey").innerHTML = survey.toHTML();
  document.getElementById("submit").addEventListener("click", submit);
});
