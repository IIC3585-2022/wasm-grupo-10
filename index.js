import partition from './jsSolver.js';

const jsRunner = (arr) => {
  const secondsJS = new Date().getTime();
  const result = partition(arr)
  const javascripTime = (new Date().getTime()) - secondsJS;
  return [result, javascripTime];
}
const addToTable = (resultArr) => {
  const table = document.getElementById("results");
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = `${resultArr[0]} ms`;
  //cell2.innerHTML = `${resultArr[1]} ms`;
}

const onSubmit = (event) => {
  event.preventDefault();
  const value = $("#input").val()
  const array = value.split(",").map(e => +e)
  const [result, jsTime] = jsRunner(array)
  if (result) {
    addToTable([jsTime])
  }
  else {
    alert('El conjunto no puede ser particionado')
  }
}
$(document).ready(function(){
  $("#button").click(function(){        
      $("#form").submit(onSubmit); 
  });
});