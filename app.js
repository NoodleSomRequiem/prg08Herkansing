import {DecisionTree} from "./libraries/decisiontree.js"

//HTML
const display = document.getElementById("display");
const gradeBtn = document.querySelector("#grade");

gradeBtn.addEventListener("click", () => loadSavedModel() && console.log("Loading model.."));

//saved model word geladen uit de json
function loadSavedModel() {
    fetch("./model/model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))
}

//model is geladen
function modelLoaded(model) {
    let decisionTree = new DecisionTree(model)

    let phValue = document.getElementById('ph').value;
    let fatValue = document.getElementById('fat').value;
    let turbidityValue = document.getElementById('turbidity').value;
    console.log(phValue, fatValue, turbidityValue)

    //prediction word gemaakt hier
    let data = { pH: phValue, Fat: fatValue, Turbidity: turbidityValue }
    console.log(data)
    let prediction = decisionTree.predict(data)
    console.log("Predicted: " + prediction)

    //text displayed na ingevoerde waarden.
    if (prediction == "low") {
        display.innerText = `Your milk is not good anymore.`
    }
    if (prediction == "medium") {
        display.innerText = `Your milk is in pretty good condition!`
    }
    if (prediction == "high") {
        display.innerText = `Your milk is in perfect state, almost impossible...`
    }
}

