const pronouns = document.getElementById("pronouns");
const generateBtn = document.getElementById("generate-btn");
const prompts = document.getElementById("prompts");
const solution = document.getElementById("solution");
const negativeCheckbox = document.getElementById("negative-checkbox");

function selectRandomPronoun() {
    let pronounsArray = [];
    for (const child of pronouns.children) {
        if (child.checked) {
            pronounsArray.push(child.value);
        }
    }
    const randInt = Math.floor(Math.random()*pronounsArray.length);
    return pronounsArray[randInt];
}

function selectRandomVerb(pronoun) {
    const randInt = Math.ceil(Math.random()*verbData.length-1);
    return verbData[randInt];
}

function printOutput() {
    let pronoun = selectRandomPronoun();
    let verbForms = selectRandomVerb(pronoun);
    let isThirdPerson = false;
    let promptText = "";
    let solutionText = "";

    promptText = pronoun + "\n" + verbForms[0];
    if (pronoun === "He" || pronoun === "She" || pronoun === "It") {
        isThirdPerson = true;
        solutionText = pronoun + " __NEG" + " " + verbForms[3];
    } else {
        solutionText = pronoun + " __NEG" + " " + verbForms[0];
    }
    
    if (negativeCheckbox.checked) {
        promptText += "\nnegative";
        solutionText = isThirdPerson ? solutionText.replace("__NEG", "doesn't") : solutionText.replace("__NEG", "don't");
    } else {
        solutionText = solutionText.replace("__NEG", "");
    }

    prompts.innerText = promptText;
    solution.innerText = solutionText;
}

generateBtn.addEventListener("click", printOutput);
document.documentElement.addEventListener("keypress", (e)=>{
    if (e.key === "Enter") {
        printOutput();
    }
})

// myData[0] = ['stem', 'past', 'past participle', '3 SG', 'ing']
let verbData = [];
 fetch("1k_verbs.csv")
  .then((res) => res.text())
  .then((text) => {
    // do something with "text"
    let lines = text.split('\n');
    verbData = lines.map(str => (str.substr(0,str.length-1)).split("\t"));
   })
  .catch((e) => console.error(e));



// This is what I should probably use eventually, so the data is not available to the user
/*
const csv = require("csv-parset");
const fs = require("fs");
const results = [];

fs.createReadStream('1k_verbs.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);
    });
*/