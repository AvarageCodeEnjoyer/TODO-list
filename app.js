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
  // Check if input is true
  if(input === ""){
    alert("Write Something")
    return
  }

  // Set text of 'li' to the input and append it to the displayed list
  newItem.textContent = input;
  list.appendChild(newItem);

  // Get "list" from local storage and push input to the "list" array
  let currentList = JSON.parse(localStorage.getItem("list")) || [];
  currentList.push(input);

  // Make "list" currentList to update the local storage
  localStorage.setItem("list", JSON.stringify(currentList));

})


/* ----------------------- 1 click on li for completed ---------------------- */

// Make list items gain class "completed" onclick
list.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    // do something
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
      // Checks if e.target is NOT storedValue[i] then do nothing 
      if (e.target.textContent !== storedValue[i]){
        console.log("don't remove")
      }
      // If it IS storedValue[i] then call the function removeItem with e.target as the input 
      else{
        console.log("remove")
        removeItem(e.target.textContent)
        return
      }
    }

  }
})

function removeItem(item) {
  // Get the array from local storage
  let storedValue = JSON.parse(localStorage.getItem("list"));
  let index = storedValue.indexOf(item);

  // Use splice to remove the item at the specified index
  storedValue.splice(index, 1);

  // Save the updated array back to local storage
  localStorage.setItem("list", JSON.stringify(storedValue));
}


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
  newItem.textContent = item;

  // Add the new li element to the list
  list.appendChild(newItem);
});
