// Get references to the form and list elements
const form = document.querySelectorAll("form")
const list = document.getElementById("list")
const submit = document.getElementById("submit")
// var listItems = JSON.parse(localStorage.getItem("list")) || []

// Listen for form submissions
// Listen for form submissions
submit.addEventListener('click',  e => {
  e.preventDefault();
  
  // Get the value of the input field
  const input = document.getElementById("input").value;

  // Create a new li element
  const newItem = document.createElement("li");

  // Add the input value as the text content of the new li element
  newItem.textContent = input;

  // Add the new li element to the list
  list.appendChild(newItem);

  // Get the current list items
  const currentList = JSON.parse(localStorage.getItem("list")) || [];
  
  // Add the new item to the list
  currentList.push(input);

  // Save the updated list to local storage
  localStorage.setItem("list", JSON.stringify(currentList));
})


// Retrieve the to-do list from local storage
const savedList = JSON.parse(localStorage.getItem("list")) || [];

savedList.forEach(item => {
    // Create a new li element
    const newItem = document.createElement("li");
  
    // Add the input value as the text content of the new li element
    newItem.textContent = item;
  
    // Add the new li element to the list
    list.appendChild(newItem);
});



// Listen for clicks on the list items
list.addEventListener("click", event => {
  const target = event.target
  
  // If the click was on a list item
  if (target.tagName === "LI") {
    // Toggle the "completed" class on the list item
    target.classList.toggle("completed")
    
    // Save the updated list to local storage
    localStorage.setItem("list", list.innerHTML)
  }
})
