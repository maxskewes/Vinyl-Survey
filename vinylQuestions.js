console.log("PCC Housing Survey Quetions");

function createSurveyQuestions()  {
  var q1 = new MultipleChoiceQuestion("Age", "To which age group do you belong?", ["0 - 10 years", "11 - 15 years", "16 - 20 years", "21 - 25 years", "26 - 30 years", "31 - 40 years", "41 - 50 years", "51 - 60 years", "61 - 70 years", "70 - 80 years", "80 years or above", "I prefer not to say."]);
  var q2 = new MultipleChoiceQuestion("Continent", "On which continent do you currently reside?", ["Africa", "Antartica", "Asia", "Australia", "Europe", "North America", "South America"]);
  var q3 = new MultipleChoiceQuestion("Income", "Which income bracket did you fall under in the previous year?", ["under $10,000", "$10,000 - 20,000", "$20,001 - 30,000", "Australia", "Europe", "North America", "South America"]);
  var q4 = new MultipleChoiceOtherQuestion(
    "Genre",
    "Which genre of music do you listen most?", 
    [
      "House",
      "Condominium",
      "Townhouse",
      "Apartment",
      "Duplex",
      "Mobile Home",
      "Homeless (if yes skip to #16)",
      "Other ____________"
    ]
  );
  var qx = new MultipleSelectOtherQuestion(
    "Status", 
    "What is your your status at PCC? (select more than one if applicable)", 
    [
      "Full time student",
      "Part time student",
      "GED student",
      "High School dual enrollment",
      "International Student",
      "Work Study",
      "Full time Faculty",
      "Part time Faculty",
      "Full time staff",
      "Part time staff",
      "Management"
    ]
  );
  var qy = new MultipleSelectQuestion(
    "Campus", 
    "What location do you primarily spend your time when at PCC? (IF equally split between campuses – circle both", 
    [
      "Cascade Campus",
      "Rock Creek Campus",
      "Southeast Campus", 
      "Sylvania Campus",
      "Online courses only",
      "Other PCC Center/location"
    ]
  );
  var qz = new ShortAnswerQuestion("Zip Code", "What is your zip code?");
  var qw = new MultipleChoiceOtherQuestion(
    "Current Housing Type", 
    "What type of housing do you currently live in?",
    [
      "House",
      "Condominium",
      "Townhouse",
      "Apartment",
      "Duplex",
      "Mobile Home",
      "Homeless (if yes skip to #16)",
      "Other ____________"
    ]
  );
  var qv = new MultipleChoiceQuestion("Housing Ownership", "Is your living space rented or owned?", ["Rent", "Own"]);
  
  var allQuestions = [q1, q2, q3, q11, q12];

  for (var i = 0; i < allQuestions.length; i++)  {
    allQuestions[i].number = i + 1;
  }

  var s1 = new QuestionSection("Demographics", [q1, q2, q3]); 
  var s2 = new QuestionSection("Housing Information", [q11, q12]);

  var allSections = [s1, s2];

  for (var i = 0; i < allSections.length; i++)  {
    allSections [i].number = i + 1;
  }
  
  return new Survey("PCC Housing Insecurity Survey", [s1, s2]);
}
