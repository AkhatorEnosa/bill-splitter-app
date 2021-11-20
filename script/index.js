var billInput = document.querySelector(".bill-input");
var options = document.querySelector(".options");
var custom = document.querySelector(".custom");
var peopleInput = document.querySelector(".people-input");
var errorMsg1 = document.querySelector(".error1");
var errorMsg2 = document.querySelector(".error2");
var tipAmount = document.querySelector(".tip-right");
var totalAmount = document.querySelector(".total-right");
var resetButton = document.querySelector(".reset-btn");
var tipValue;
var billInputVal;
var peopleInputVal;

function defaultVal() {
  tipAmount.innerText = "$0.00";
  totalAmount.innerText = "$0.00";
}

function getBillInput() {
  billInputVal = billInput.value;
  
  if(billInputVal > 0 && tipValue != "" && peopleInputVal > 0){
    billInputVal;
    getResult()
    errorMsg1.innerText = "";
    errorMsg1.style.color = "#26C2AE"
    billInput.style.border = "2px solid #26C2AE"
  } else if(billInputVal < 1 && billInputVal !== "") {
    defaultVal();
    errorMsg1.innerText = "Can't be zero";
    errorMsg1.style.color = "#E17052"
    billInput.style.border = "2px solid #E17052"
  } else{
    billInput.style.border = "none"
    errorMsg1.innerText = "";
    defaultVal();
  }
}

function getTipValue(e){
   if(e.target.matches(".custom")){
    custom.type = "number";
    custom.style = "width: 77px; padding: 0px 20px 0px 20px; text-align: right;";
    // custom.style = "width: 77px";
    // custom.style = "padding: 0px 20px 0px 20px";

    var customInputVal = e.target.value;
      if(customInputVal > -1){
        tipValue = customInputVal;
        getResult()
      } else {
        defaultVal();
      }
    } else if(!e.target.matches("div.options") && !e.target.classList.contains("selected")){
        
        e.target.classList.add("selected");
        tipValue = e.target.value;

        if(billInputVal > 0 && peopleInputVal > 0){
          getResult();
        } else {
          defaultVal();
        }

        var notSelected = document.querySelectorAll("button.option:not(.selected)");
        notSelected.forEach(x => {
          x.disabled = true;
          x.style.opacity = 0.8;
          x.style.cursor = "not-allowed"
        });

      } else if(e.target.classList.contains("selected")){
        tipValue = "";
        e.target.classList.remove("selected");
        var notSelected = document.querySelectorAll("button.option");
        notSelected.forEach(x => {
          x.disabled = false;
          x.style.opacity = 1;
        });
      }
      return tipValue;
    }


function getPeopleInput() {
  getBillInput();
  
  peopleInputVal = peopleInput.value;
  if(peopleInputVal > 0){
    getResult()
    errorMsg2.innerText = "";
    errorMsg2.style.color = "#26C2AE"
    peopleInput.style.border = "2px solid #26C2AE"
  } else if(peopleInputVal < 1 && peopleInputVal !== "") {
    defaultVal();
    errorMsg2.innerText = "Can't be zero";
    errorMsg2.style.color = "#E17052"
    peopleInput.style.border = "2px solid #E17052"
  } else {
    errorMsg2.innerText = "";
    peopleInput.style.border = "none"
    tipAmount.innerText = "$0.00";
    totalAmount.innerText = "$0.00";
  }
}

function getResult(){
  if(tipValue === undefined){
    defaultVal();
  } else{
    if(billInputVal > 0 && tipValue != "" && peopleInputVal > 0){
      resetButton.classList.add("reset-btn-active");
      resetButton.disabled = false
      // resetButtonActive.disabled = false;
      var tipPerPerson = (Number(billInputVal) * (Number(tipValue)/100))/Number(peopleInputVal);
      tipPerPerson = tipPerPerson.toString();
      tipPerPerson = tipPerPerson.slice(0, (tipPerPerson.indexOf("."))+3);
    
      var totalPerPerson = ((Number(billInputVal) * (Number(tipValue)/100)) + Number(billInputVal))/ Number(peopleInputVal);
    
      tipAmount.innerText = "$" + Number(tipPerPerson);
      totalAmount.innerText = "$" + totalPerPerson.toFixed(2);
    } else {
      defaultVal();
    }
  }
}

function reset(){
  billInput.value = peopleInput.value = "";
  billInputVal = peopleInputVal = "";

  if(custom.type = "number"){
    custom.type = "button";
    custom.value = "Custom";
    custom.style.textAlign = "center";
  }

  var option = document.querySelectorAll(".option");
  option.forEach(x => {
    if(x.classList.contains("selected")){
      x.classList.remove("selected");
    }

    if(x.disabled == true){
      x.disabled = false
      x.style.opacity = 1;
    }

    tipValue = "";
    resetButton.classList.remove("reset-btn-active");
    resetButton.disabled = true;
  });
  defaultVal();

  peopleInput.style.border = "none";
  billInput.style.border = "none";
}

billInput.addEventListener("keyup", getBillInput);
options.addEventListener("click", getTipValue);
custom.addEventListener("keyup", getTipValue);
peopleInput.addEventListener("keyup", getPeopleInput);
resetButton.addEventListener("click", reset);
