const form = document.querySelector("form")
const list = document.getElementById("list")
const submit = document.getElementById("submit")
const clear = document.getElementById("clear")
const help = document.getElementById("help")

/* -------------------------------------------------------------------------- */
/*                               onclick events                               */
/* -------------------------------------------------------------------------- */

/* ------------ submit input to the list and update local storage ----------- */

submit.addEventListener('click', e => {
  // Prevent "submit" from reloading the page
  e.preventDefault();
  let newItem = document.createElement("li");
  let input = document.getElementById("input").value

  // Get "list" from local storage and push input to the "list" array
  let currentList = JSON.parse(localStorage.getItem("list")) || []; 

  // Check if input is true
  if (input === ""){
    alert("Write Something")
    return
  }

  // Check to see if that value already exists in the array
  for (i = 0; i < currentList.length; i++){
    if (input === currentList[i].value){
      alert("That item is already on your list")
      return
    }
  }

  // Set text of 'li' to the input and append it to the displayed list
  newItem.textContent = input;
  list.appendChild(newItem);

  // Push the input as an object with a checked flag to save it to local storage
  currentList.push({value: input, checked: false});

  // Make "list" currentList to update the local storage
  localStorage.setItem("list", JSON.stringify(currentList));

  document.getElementById("input").value = ""

})

/* ----------------------- 1 click on li for completed ---------------------- */

// Make list items gain class "completed" onclick
list.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    let currentList = JSON.parse(localStorage.getItem("list"))

    // Find the first value in currentList that is equal to the event target text
    let index = currentList.findIndex(i => i.value === e.target.textContent)

    // Toggle "completed" class of event target in currentList by toggling the "checked" value in the object
    currentList[index].checked = !currentList[index].checked

    localStorage.setItem("list", JSON.stringify(currentList));
    e.target.classList.toggle("completed")
  }
})

/* --------------------- double click on li for removal --------------------- */

list.addEventListener('dblclick', e => {
  if (e.target.tagName === 'LI') {
    // Remove li from HTML
    list.removeChild(e.target)

    // Get the list from local storage and save it as a variable
    let storedValue = JSON.parse(localStorage.getItem("list"))

    // Loop through everything in stored value to find a match and remove it
    for (i = 0; i < storedValue.length; i++){
      // Checks if e.target is the storedValue[i].value then remove the object from the array 
      if (e.target.textContent === storedValue[i].value){
        console.log("removed " + storedValue[i].value)
        removeItem(i)
        return
      }
    }
  }
})

function removeItem(item) {
  // Get the array from local storage
  let storedValue = JSON.parse(localStorage.getItem("list"));

  // Use splice to remove the item at the specified index
  storedValue.splice(item, 1);

  // Save the updated array back to local storage
  localStorage.setItem("list", JSON.stringify(storedValue));
}

/* -------------------------- Display help message -------------------------- */

help.addEventListener('click', (e) => {
  e.preventDefault()
  alert(" Add items by writing in text box and clicking 'add'." + 
    "\n \n Check items off the list by clicking on them." + 
    "\n \n Remove individual items by double clicking on them." + 
    "\n \n Clear local storage and list with 'clear'.")
})

/* --------------------- Clear local storage with button -------------------- */

clear.addEventListener('click', () => {
  // Clear all local storage
  localStorage.clear()
})

/* -------------------------------------------------------------------------- */
/*                                list display                                */
/* -------------------------------------------------------------------------- */

const savedList = JSON.parse(localStorage.getItem("list")) || [];

savedList.forEach(item => {
  // Create a new li element
  const newItem = document.createElement("li");

  // Add the input value as the text content of the new li element
  newItem.textContent = item.value;

  // Give the li element the class of "checked" if the item object has been checked
  if(item.checked) newItem.classList.add("completed")

  // Add the new li element to the list
  list.appendChild(newItem);
});

