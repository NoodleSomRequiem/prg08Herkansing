import {DecisionTree} from "./libraries/decisiontree.js"
import {VegaTree} from "./libraries/vegatree.js"

const csvFile = "data/milk.csv"
const trainingLabel = "Grade"
const ignored = ["Grade", "Temperature","Taste","Odor", "Colour"]

const display = document.getElementById("display");

const lowLow = document.getElementById("lowLow");
const lowMed = document.getElementById("lowMed");
const lowHigh = document.getElementById("lowHigh");
const medLow = document.getElementById("medLow");
const medMed = document.getElementById("medMed");
const medHigh = document.getElementById("medHigh");
const highLow = document.getElementById("highLow");
const highMed = document.getElementById("highMed");
const highHigh = document.getElementById("highHigh");

function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)
    })
}

function trainModel(data) {
    data.sort(() => (Math.random() - 0.5));
    let trainData = data.slice(0, Math.floor(data.length * 0.8));
    let testData = data.slice(Math.floor(data.length * 0.8) + 1);
    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainData,
        categoryAttr: trainingLabel,
        maxTreeDepth: 4
    })

    let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON())

    let amountCorrect = 0;
    let predictedHighButLow = 0;
    let predictedHighButMed = 0;
    let predictedHighButHigh = 0;

    let predictedMedButLow = 0;
    let predictedMedButMed = 0;
    let predictedMedButHigh = 0;

    let predictedLowButLow = 0;
    let predictedLowButMed = 0;
    let predictedLowButHigh = 0;

    for (let row of testData) {
        let prediction = decisionTree.predict(row)
        if (prediction == row.Grade) {
            amountCorrect++}
        if (prediction == "low" && row.Grade == "low") {
            predictedLowButLow++}
        if (prediction == "low" && row.Grade == "medium") {
            predictedLowButMed++}
        if (prediction == "low" && row.Grade == "high") {
            predictedLowButHigh++}
        if (prediction == "medium" && row.Grade == "low") {
            predictedMedButLow++}
        if (prediction == "medium" && row.Grade == "medium") {
            predictedMedButMed++}
        if (prediction == "medium" && row.Grade == "high") {
            predictedMedButHigh++}
        if (prediction == "high" && row.Grade == "low") {
            predictedHighButLow++}
        if (prediction == "high" && row.Grade == "medium") {
            predictedHighButMed++}
        if (prediction == "high" && row.Grade == "high") {
            predictedHighButHigh++}
    }

    let accuracy = amountCorrect / testData.length
    console.log(accuracy)
    display.innerText = `Accuracy: ${accuracy}`;

    lowLow.innerHTML = predictedLowButLow;
    lowMed.innerHTML = predictedLowButMed;
    lowHigh.innerHTML = predictedLowButHigh;

    medLow.innerHTML = predictedMedButLow;
    medMed.innerHTML = predictedMedButMed;
    medHigh.innerHTML = predictedMedButHigh;

    highLow.innerHTML = predictedHighButLow;
    highMed.innerHTML = predictedHighButMed;
    highHigh.innerHTML = predictedHighButHigh;

    let json = decisionTree.stringify()
    console.log(`JSON: ${json}`)
}


loadData()