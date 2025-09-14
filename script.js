const pronouns = document.getElementById("pronouns");
const generateBtn = document.getElementById("generate-btn");
const prompts = document.getElementById("prompts");
const solution = document.getElementById("solution");
const negativeCheckbox = document.getElementById("negative-checkbox");
const mixCheckbox = document.getElementById("mix-checkbox");
const tenseSelect = document.getElementById("tense-select");
const showHideAnswerBtn = document.getElementById("show-hide-answer-btn");7
const cefrLevel = document.getElementById("cefr-level");
const tenseInfo = document.getElementById("tense-info");
const languageSelect = document.getElementById("language-select");
let hiddenStatus = false;
let tenseInfoSide = "";
currentTense = "";
let verbForms = [];
let verbSide = "english";

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

function selectRandomVerb(cefr, pronoun) {
    let dataFrame = [];
    switch (cefr) {
        case "A1":
            dataFrame = a1Verbs; break;
        case "A2":
            dataFrame = a2Verbs; break;
        case "B1":
            dataFrame = b1Verbs; break;
        case "B2":
            dataFrame = b2Verbs; break;
        case "other":
            dataFrame = otherVerbs; break;
        default:
            dataFrame = verbData; break;
    }
    const randInt = Math.ceil(Math.random()*dataFrame.length-1);
    return dataFrame[randInt];
}


// LAYOUT: __PRONOUN + __MODAL + __NEG + __VERB
function printOutput() {
    let layout = "__PRONOUN __MODAL __NEG __VERB";
    const tenseList = ["present simple", "past simple", "future simple", "present continuous", "past continuous", "present perfect", "past perfect"];
    let promptText = "";
    let solutionText = "";
    let isThirdPerson = false;
    let pronoun = selectRandomPronoun();
    verbForms = selectRandomVerb(cefrLevel.value, pronoun);
    layout = layout.replace("__PRONOUN", pronoun);
    if (pronoun === "He" || pronoun === "She" || pronoun === "It") {isThirdPerson = true;} else {isThirdPerson = false;}
    isNegative = negativeCheckbox.checked;
    if (mixCheckbox.checked) {isNegative = Math.random() < 0.5 ? false : true;}
    if (!isNegative) {layout = layout.replace("__NEG", "")};

    currentTense = tenseSelect.value;
    if (tenseSelect.value === "all") {
        currentTense = tenseList[Math.floor(Math.random()*tenseList.length)]
    }
    switch(currentTense) {
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
    tenseInfo.innerText = currentTense;
    tenseInfoSide = "tense";
    tenseInfo.style.fontStyle = "normal";
}

function showTenseInfo (side=tenseInfoSide) {
    const explanations = {
        "present simple": "VERB (base form)",
        "past simple": "VERB in past form (past form)",
        "future simple": "Will + verb (base form)",
        "present continuous": "am/is/are + gerund (verb + ing)",
        "past continuous": "was/were + gerund (verb + ing)",
        "present perfect": "have/has + past participle (Verb 3)",
        "past perfect": "had + past participle (Verb 3)"
    };
    if (tenseInfoSide === "tense") {
        tenseInfo.innerText = explanations[currentTense];
        tenseInfo.style.fontStyle = "italic";
        tenseInfoSide = "explanation";
    } else if (tenseInfoSide === "explanation") {
        tenseInfo.innerText = currentTense;
        tenseInfo.style.fontStyle = "normal";
        tenseInfoSide = "tense";
    }
}

generateBtn.addEventListener("click", printOutput);
document.documentElement.addEventListener("keypress", (e)=>{
    if (e.key === "Enter") {
        printOutput();
    }
})
tenseInfo.addEventListener("click", showTenseInfo);

promptVerb.addEventListener("click", showTranslation);

function showTranslation() {
    let languageIndex = 0;
    switch (languageSelect.value) {
        case "Turkish":
            languageIndex = 6; break;
        case "Chinese":
            languageIndex = 7; break;
    }

    if (verbSide === "english") {
        verbSide = "translation";
        promptVerb.innerText = verbForms[languageIndex];
    } else if (verbSide === "translation") {
        verbSide = "english";
        promptVerb.innerText = verbForms[0];
    }
}

function showHideAnswer() {
    if (hiddenStatus) {
        cover.style.display = "";
        showHideAnswerBtn.style.backgroundColor = "#c6c3c3";
        hiddenStatus = false;
    } else {
        cover.style.display = "none";
        showHideAnswerBtn.style.backgroundColor = "white";
        hiddenStatus = true;
    }
}

showHideAnswerBtn.addEventListener("click", showHideAnswer);
// myData[0] = ['stem', 'past', 'past participle', '3 SG', 'ing', 'cefr', 'tr', 'zh']
let verbData = [];
let a1Verbs = [];
let a2Verbs = [];
let b1Verbs = [];
let b2Verbs = [];
let otherVerbs = [];
// "https://raw.githubusercontent.com/TheLinguistProgrammer/sentencePrompt/refs/heads/main/1k_verbs_cefr2.csv"
 fetch("https://raw.githubusercontent.com/TheLinguistProgrammer/sentencePrompt/refs/heads/main/verbs_cefr_tr_zh.csv")
  .then((res) => res.text())
  .then((text) => {
    // do something with "text"
    let lines = text.split('\n');
    verbData = lines.map(str => (str.substr(0,str.length-1)).split("\t")); 
    for (i=0; i<verbData.length; i++) {
        if (verbData[i][5] === "A1") {
            a1Verbs.push(verbData[i]);
        } else if (verbData[i][5] === "A2") {
            a2Verbs.push(verbData[i]);
        } else if (verbData[i][5] === "B1") {
            b1Verbs.push(verbData[i]);
        } else if (verbData[i][5] === "B2") {
            b2Verbs.push(verbData[i]);
        } else if (verbData[i][5] === "") {
            otherVerbs.push(verbData[i]);
        }
    }
   })
  .catch((e) => console.error(e));

