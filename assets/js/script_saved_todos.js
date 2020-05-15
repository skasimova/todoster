let listContainer = document.getElementById('list_container');

function createToDo(inputText) {
    let todoElement = document.createElement('div');
    todoElement.setAttribute('class', 'todo_element');

    let todoElementContainer = document.createElement("div");
    todoElementContainer.setAttribute("class", "todo_element_container");

    let todoCheckbox = document.createElement("div");
    todoCheckbox.setAttribute("class", "todo_checkbox");

    let closeButton = document.createElement("div");
    closeButton.setAttribute("class", 'closebutton');
    closeButton.innerHTML = 'del';

    closeButton.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();

            todoElement.setAttribute("class", 'todo_element deleted');

            setTimeout(function () {
                todoElement.remove();
                removeFromLocalStorage(inputText);
            }, 200);
        }
    )

    let todoElementText = document.createElement("div");
    todoElementText.setAttribute("class", "todo_element_text");

    todoElementText.innerHTML = inputText;

    todoElementContainer.appendChild(todoCheckbox);
    todoElementContainer.appendChild(todoElementText);
    todoElementContainer.appendChild(closeButton);

    todoElement.appendChild(todoElementContainer);

    listContainer.appendChild(todoElement);

}

function removeFromLocalStorage(inputText) {
    let savedTodos = JSON.parse(localStorage.getItem("completed_todos"));

    if (savedTodos) {
        savedTodos.some(function (oneTodoText, index) {
            if (oneTodoText === inputText) {
                savedTodos.splice(index, 1);
                return true;
            }
        });
        localStorage.setItem('completed_todos', JSON.stringify(savedTodos));

    }
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
