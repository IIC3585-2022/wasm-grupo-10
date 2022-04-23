import partition from './jsSolver.js';
import Module from './solverWASM.js';


const jsRunner = (arr) => {
  const secondsJS = new Date().getTime();
  const result = partition(arr)
  const javascripTime = (new Date().getTime()) - secondsJS;
  return [result, javascripTime];
}

const cRunner = (array,mymod) => {
  const secondsC = new Date().getTime();
  let arrPtr = makePtrOfArray(mymod, array);
  const cResult = mymod._Partition(arrPtr, array.length)
  const cTime = (new Date().getTime()) - secondsC;
  return [cResult,cTime];
}

const addToTable = (resultArr) => {
  const table = document.getElementById("results");
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = `${resultArr[0]} ms`;
  cell2.innerHTML = `${resultArr[1]} ms`;
}

const makePtrOfArray = (myModule, arr) => {
  const arrayPtr = myModule._calloc(arr.length, 4);
  arr.forEach((n,i)=> {
    myModule.setValue(arrayPtr + i * 4, n, "i32");
  })
  return arrayPtr;
}

const onSubmit = (event) => {
  event.preventDefault();

  Module().then((mymod) => {

    const value = $("#input").val()
    const array = value.split(",").map(e => +e)
    const [cResult, cTime] = cRunner(array, mymod)
    const [result, jsTime] = jsRunner(array)
    if (cResult) {

      addToTable([jsTime, cTime])
    }
    else {
      addToTable([jsTime, cTime])

      return alert('El conjunto no puede ser particionado')
    }
  })
}

$(document).ready(function(){
  $("#button").off('click').on('click', function(event) {
    event.stopImmediatePropagation();
    $("#form").submit(onSubmit(event)); 
  });
});