const form = document.querySelector("form");
const inputForm = document.getElementById("input");
const listUL = document.getElementById("list");

// All data to build into ul > li elements
let todoElements = [];

// Listen for form submition and adding element.
form.addEventListener("submit", function (event) {
  event.preventDefault();
  addElement();
});

// Validate data before adding and building list
function addElement() {
  const text = inputForm.value.trim();
  if (text.length > 0) {
    todoElements.push(text);
    rebuildList(todoElements, todoElements.length - 1);
    inputForm.value = "";
  }
}


// Delete existing list, Rebuild it, add listeners to all delete buttons to delete list item.
function rebuildList(elements, length) {
  while (listUL.firstChild) {
    listUL.removeChild(listUL.firstChild);
  }

// Rebuild List
  elements.forEach((item, index) => {
    const newElement = createItem(item, index);
    listUL.append(newElement);
  });

// Add listeners to all buttons
  const buttons = document.querySelectorAll('.delete-button');
  buttons.forEach(button => {
    button.addEventListener("click", function() {
        const removeIndex = parseInt(button.previousElementSibling.getAttribute('for').split('-')[1]);
        todoElements.splice(removeIndex, 1);
        rebuildList(todoElements, todoElements.length - 1);
    })
  })

}


// Create a new li item
function createItem(element, index) {
  const newItem = document.createElement("li");
  newItem.setAttribute("class", "todo");
  newItem.innerHTML = `
              <input type="checkbox" id="item-${index}" />
          <label class="checkbox-custom" for="item-${index}">
            <svg
              fill="transparent"
              xmlns="http://www.w3.org/2000/svg"
              height="25px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label for="item-${index}" class="todo-text">${element}</label>
          <button class="delete-button">
            <svg
              fill="var(--secoundary-color)"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
    `;
  return newItem;
}
