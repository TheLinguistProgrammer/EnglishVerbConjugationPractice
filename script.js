const pronouns = document.getElementById("pronouns");
const generateBtn = document.getElementById("generate-btn");
const prompts = document.getElementById("prompts");
const solution = document.getElementById("solution");
const negativeCheckbox = document.getElementById("negative-checkbox");
const tenseSelect = document.getElementById("tense-select");
// prompt
const promptPronoun = document.getElementById("prompt-pronoun");
const promptModal = document.getElementById("prompt-modal");
const promptNegative = document.getElementById("prompt-negative");
const promptVerb = document.getElementById("prompt-verb");
const cover = document.getElementById("cover");

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

// LAYOUT: __PRONOUN + __MODAL + __NEG + __VERB
function printOutput() {
    let layout = "__PRONOUN __MODAL __NEG __VERB";
    const tenseList = ["present simple", "past simple", "future simple", "present continuous", "past continuous", "present perfect", "past perfect"];
    let promptText = "";
    let solutionText = "";
    let isThirdPerson = false;
    let pronoun = selectRandomPronoun();
    let verbForms = selectRandomVerb(pronoun);
    layout = layout.replace("__PRONOUN", pronoun);
    if (pronoun === "He" || pronoun === "She" || pronoun === "It") {isThirdPerson = true;} else {isThirdPerson = false;}
    isNegative = negativeCheckbox.checked;
    if (!isNegative) {layout = layout.replace("__NEG", "")};
    switch(tenseSelect.value) {
        case "all":
            // This does not work //
            console.log("all");
        case "present simple":
            layout = layout.replace("__MODAL", "");
            if (isThirdPerson && !isNegative) {layout = layout.replace("__VERB", verbForms[3])} 
            else if (!isThirdPerson && !isNegative) {layout = layout.replace("__VERB", verbForms[0])}
            else if (!isThirdPerson && isNegative) {layout = layout.replace("__NEG", "don't"); layout = layout.replace("__VERB", verbForms[0])} 
            else if (isThirdPerson && isNegative) {layout = layout.replace("__NEG", "doesn't"); layout = layout.replace("__VERB", verbForms[0])};
            break;
        case "past simple":
            layout = layout.replace("__MODAL", "");
            if (!isNegative) {layout = layout.replace("__VERB", verbForms[1])} 
            else if (isNegative) {layout = layout.replace("__NEG", "didn't"); layout = layout.replace("__VERB", verbForms[0])} 
            break;
        case "future simple":
            layout = layout.replace("__MODAL", "will");
            layout = layout.replace("__VERB", verbForms[0]);
            if (isNegative) {layout = layout.replace("__NEG", "not")};
            break;
        case "present continuous":
            if (isThirdPerson) {layout = layout.replace("__MODAL", "is")}
            else if (pronoun === "I") {layout = layout.replace("__MODAL", "am")}
            else if (pronoun === "You" || pronoun === "We" || pronoun === "You (Plural)" || pronoun === "They") {layout = layout.replace("__MODAL", "are")};
            layout = layout.replace("__VERB", verbForms[4]);
            if (isNegative) {layout = layout.replace("__NEG", "not")};
            break;
        case "past continuous":
            if (isThirdPerson || pronoun === "I") {layout = layout.replace("__MODAL", "was")}
            else {layout = layout.replace("__MODAL", "were")};
            layout = layout.replace("__VERB", verbForms[4]);
            if (isNegative) {layout = layout.replace("__NEG", "not")};
            break;
        case "present perfect":
            if (isThirdPerson) {layout = layout.replace("__MODAL", "has")}
            else {layout = layout.replace("__MODAL", "have")};
            layout = layout.replace("__VERB", verbForms[2]);
            if (isNegative) {layout = layout.replace("__NEG", "not")};
            break;
        case "past perfect":
            layout = layout.replace("__MODAL", "had");
            layout = layout.replace("__VERB", verbForms[2]);
            if (isNegative) {layout = layout.replace("__NEG", "not")};
            break;
    }
    solutionText = layout;
    promptPronoun.innerText = pronoun;
    promptNegative.innerText = isNegative ? "NEGATIVE" : "POSITIVE";
    promptVerb.innerText = verbForms[0];
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