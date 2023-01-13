
const container = document.querySelector(".container")
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todolists = document.getElementById("lists");
const message = document.getElementById("message");

//adding lestners

const todobutton = document.querySelector("#addTodoButton");




// showmassge

function showmeesege(text, status) {
    // console.log("ki");

    message.textContent = text
    message.classList.add(`message1-${status}`);
    setTimeout(() => {
        message.textContent = "";
        message.classList.remove(`message1-${status}`);
    }, 1000);
}

// createtodo

const createTodo = (todoId, todovalue) => {
    const todoelement = document.createElement("li");
    todoelement.id = todoId;
    todoelement.classList.add("li-style");
    todoelement.innerHTML = `<span> ${todovalue} </span> 
    <span><button class="btn" id="deleteButton">
    <i class="fa fa-trash"></i></button></span>
    
    
    `;

    todolists.appendChild(todoelement);
    const deleteButton = todoelement.querySelector("#deleteButton");
    //console.log(deleteButton.id);
    deleteButton.addEventListener("click", deletTodo);


}
// deletTodo

const deletTodo = (event) => {
    const selectTodo = event.target.parentElement.parentElement.parentElement;
    todolists.removeChild(selectTodo);
    showmeesege("todo is deleted", "delte");
    const todoid = selectTodo.id;
    //localStorage.setItem('ek',todoid);
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== todoid);
    localStorage.setItem("mytodos", JSON.stringify(todos));

}

// getTodosFromLocalStorage

function getTodosFromLocalStorage() {
    return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
}

// addtodo
const addtodo = (event) => {
    event.preventDefault();

    const todovalue = todoInput.value;

    // unique id 

    const todoId = Date.now().toString();
    createTodo(todoId, todovalue);

    showmeesege("todo is created", "add");

    // adding value local storage 
    const todos = getTodosFromLocalStorage();
    todos.push({ todoId, todovalue });
    //console.log(todos);
    localStorage.setItem("mytodos", JSON.stringify(todos));
    todoInput.value = "";

};

// load Todos
function loadTodos() {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todovalue))
};

todoForm.addEventListener("submit", addtodo);

window.addEventListener("DOMContentLoaded", loadTodos);
