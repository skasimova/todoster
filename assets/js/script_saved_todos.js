let listContainer = document.getElementById('list_container');

function completedCount() {
    let countedElements = document.getElementsByClassName('todo_element').length;
    let counter = document.getElementById('completed_count');

    counter.innerText = countedElements;
}

function createToDo(inputText) {
    let todoElement = document.createElement('div');
    todoElement.setAttribute('class', 'todo_element');

    let todoElementContainer = document.createElement("div");
    todoElementContainer.setAttribute("class", "todo_element_container");

    let undoButton = document.createElement("div");
    undoButton.setAttribute("class", "undo_button");
    undoButton.innerHTML = 'undo';

    undoButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();

        todoElement.setAttribute("class", 'todo_element undone');

        setTimeout(function () {

            todoElement.remove();

            removeFromLocalStorage(inputText);

            completedCount();

            saveToSecondLocalStorage(inputText);
        }, 300);
    })

    let deleteButton = document.createElement("div");
    deleteButton.setAttribute("class", 'deletebutton');
    deleteButton.innerHTML = 'del';

    deleteButton.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();

            todoElement.setAttribute("class", 'todo_element deleted');

            setTimeout(function () {
                todoElement.remove();
                removeFromLocalStorage(inputText);

                completedCount();

            }, 200);
        }
    )

    let todoElementText = document.createElement("div");
    todoElementText.setAttribute("class", "todo_element_text");

    todoElementText.innerHTML = inputText;

    todoElementContainer.appendChild(undoButton);
    todoElementContainer.appendChild(todoElementText);
    todoElementContainer.appendChild(deleteButton);

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

function saveToSecondLocalStorage(inputText) {

    let savedTodosArray;

    if (localStorage.getItem('added_todos') === null) {
        savedTodosArray = [];
    } else {
        savedTodosArray = JSON.parse(localStorage.getItem('added_todos'));
    }

    savedTodosArray.push(inputText);

    localStorage.setItem('added_todos', JSON.stringify(savedTodosArray));
}

function extractFromLocalStorage() {
    let savedTodos = JSON.parse(localStorage.getItem("completed_todos"));

    if (savedTodos) {
        savedTodos.forEach(function (oneTodoText) {
            createToDo(oneTodoText);
        });
    }

    completedCount();
}

extractFromLocalStorage();
