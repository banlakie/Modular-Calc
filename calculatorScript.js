var tmpResult, tmpNumber, operand, display;
var isFirst, isNewInputNumber, isFirstOperator, endOfCalculation;

function init(){
	isFirst= true;
	isNewInputNumber = true;
	isFirstOperator = true;
	display = "";
	document.getElementById('output').value = display;
	endOfCalculation = false;
}

function getNumber(inputNumber) {
	
  if(endOfCalculation){
	  cleanDisplay();
  }
	
  let input = document.getElementById(inputNumber).value;
  if(isFirst){
	tmpNumber = input;
	isFirst = false; 
	isNewInputNumber = false;
	display = input;
  }else{
    if(isNewInputNumber){
		tmpNumber = input;
		isNewInputNumber = false;
		display += input;
	}else{
	  if(tmpNumber != 0){
			tmpNumber += input;
			display += input;
	  }
	}
  }
 
  document.getElementById('output').value = display;
}

function getOperand(inputOperand) {

	if (isFirst){
		alert("Select a number firstly, please");
		return null;
	}
	
	if(endOfCalculation){
		continueCalculation();
	}
	
	if(isFirstOperator){
		operand = document.getElementById(inputOperand).value;
		display += operand;		
		document.getElementById('output').value = display;	

		tmpResult = tmpNumber;	
		tmpNumber = null;	 
		isFirstOperator = false;
		isNewInputNumber = true;
	}else{
		let lastElementOfDisplay = display.slice(-1);
		if(lastElementOfDisplay == "+" || lastElementOfDisplay == "*" || lastElementOfDisplay == "/"){
			alert("Select a number, please");
		}else{
			tmpResult = calculate(tmpResult, tmpNumber, operand);
			operand = document.getElementById(inputOperand).value;
			display += operand;		
			document.getElementById('output').value = display;
			tmpNumber = null;	
			isNewInputNumber = true;
		}
	}	
}

function continueCalculation(){
		endOfCalculation = false;
		isFirst = false;
		isFirstOperator =true;
		tmpResult = operand = null;
		
		let tmpArray = display.split("=");
		display = "";
		tmpNumber = tmpArray[tmpArray.length - 1];
		isNewInputNumber = false;
		
		display += tmpNumber;
		document.getElementById('output').value = display;
}

function calculate(tmpResult, tmpNumber, operand) {
	let result;
	switch(operand) {
	   case "+":
		  result = add(tmpResult, tmpNumber);
		  return result;
	   case "*":
		  result = multiple(tmpResult, tmpNumber);
		 return result;
	   case "/":
		  result = divide(tmpResult, tmpNumber);
		 return result;
	   default:
		  alert("error");
		  break;
	 }	 	 
}

function add(tmpResult, tmpNumber){	
	 return tmpResult = parseInt(tmpResult) + parseInt(tmpNumber);	
}

function multiple(tmpResult, tmpNumber){	
	 return tmpResult = parseInt(tmpResult) * parseInt(tmpNumber);	
}

function divide(tmpResult, tmpNumber){	
	 return tmpResult = parseInt(tmpResult) / parseInt(tmpNumber);	
}

function equals(inputOperand){
	let lastElementOfDisplay = display.slice(-1);
	
	if(lastElementOfDisplay == "+" || lastElementOfDisplay == "*" || lastElementOfDisplay == "/"){
  	  alert("Select a number, please");
	}
	else{
  	  let endResult = calculate(tmpResult, tmpNumber, operand);
	  operand = document.getElementById(inputOperand).value;
	  display += operand;	
	  display += endResult;	
	  document.getElementById('output').value = display;
	  endOfCalculation = true;
	}
}

function cleanDisplay(){
	display = "";
	document.getElementById('output').value = display;
	tmpResult = tmpNumber = operand = null;
	isFirst = isNewInputNumber = isFirstOperator =true;
	endOfCalculation = false;
}