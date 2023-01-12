const form = document.querySelector("form")
const list = document.getElementById("list")
const submit = document.getElementById("submit")
const clear = document.getElementById("clear")
const help = document.getElementById("help")

// var currentList = []
// var listItems = JSON.parse(localStorage.getItem("list")) || []



/* -------------------------------------------------------------------------- */
/*                               onclick events                               */
/* -------------------------------------------------------------------------- */

/* ------------ submit input to the list and update local storage ----------- */

submit.addEventListener('click', e => {
  e.preventDefault();
  let input = document.getElementById("input").value;
  let newItem = document.createElement("li");

  // Check if input is true
  if(input === ""){
    alert("Write Something")
    return
  }

  newItem.textContent = input;
  list.appendChild(newItem);
  let currentList = JSON.parse(localStorage.getItem("list")) || [];
  currentList.push(input);
  localStorage.setItem("list", JSON.stringify(currentList));
})


/* ----------------------- 1 click on li for completed ---------------------- */
// var ul = document.querySelector("ul")
// var lis = list.querySelectorALL("li")

list.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    // do something
    console.log("hello")
    e.target.classlist.add("completed")
  }
});

/* --------------------- double click on li for removal --------------------- */

list.addEventListener('dblclick', e => {
  if (e.target.tagName === 'LI') {
    // do something
    console.log("hello")
    list.removeChild(e.target)
  }
});


/* --------------------- Clear local storage with button -------------------- */

clear.addEventListener('click', () => {
  // e.preventDefault()
  localStorage.clear()
})

/* -------------------------------------------------------------------------- */
/*                                list display                                */
/* -------------------------------------------------------------------------- */

const savedList = JSON.parse(localStorage.getItem("list")) || [];

savedList.forEach(item => {
  //* Create a new li element
  const newItem = document.createElement("li");

  //* Add the input value as the text content of the new li element
  newItem.textContent = item;

  //* Add the new li element to the list
  list.appendChild(newItem);
});
