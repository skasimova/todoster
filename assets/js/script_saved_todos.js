let listContainer = document.getElementById('list_container');

function createToDo(inputText) {
    let todoElement = document.createElement('div');
    todoElement.setAttribute('class', 'todo_element');

    let todoElementContainer = document.createElement("div");
    todoElementContainer.setAttribute("class", "todo_element_container");

    let todoElementText = document.createElement("div");
    todoElementText.setAttribute("class", "todo_element_text");

    todoElementText.innerHTML = inputText;

    todoElementContainer.appendChild(todoElementText);
    todoElement.appendChild(todoElementContainer);
    listContainer.appendChild(todoElement);

}


function extractFromLocalStorage() {
    let savedTodos = JSON.parse(localStorage.getItem("completed_todos"));

    if (savedTodos) {
        savedTodos.forEach(function (oneTodoText) {
            createToDo(oneTodoText);
        });
    }
}

extractFromLocalStorage();
