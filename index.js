let mainContainer = document.querySelector("main");
let addButton = document.getElementById("addBtn");
let todoInput = document.getElementById("todoInput");
let todoList = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList")).todoList
  : [];

function paintUI() {
  let newInnerHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    newInnerHTML += `<div class="todoItem">
                            <p>${todo}</p>
                            <div class="actionsContainer">
                                <button onclick="editTodo(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button onclick="deleteTodo(${i})"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>`;
  }
  mainContainer.innerHTML = newInnerHTML;
  saveData();
}

paintUI();

function addTodo() {
  let currentTodo = todoInput.value;
  if (!currentTodo) {
    return;
  }

  todoList.push(currentTodo);
  paintUI();
}

addButton.addEventListener("click", addTodo);

function deleteTodo(index) {
  let newTodoList = todoList.filter((currentValue, currentIndex) => {
    return currentIndex !== index;
  });

  todoList = newTodoList;
  paintUI();
}

function editTodo(index) {
  let currentTodo = todoList[index];
  todoInput.value = currentTodo;

  deleteTodo(index);
}

function saveData() {
  localStorage.setItem(
    "todoList",
    JSON.stringify({
      todoList,
    })
  );
}
