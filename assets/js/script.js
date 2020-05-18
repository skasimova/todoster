let form = document.getElementById('form');
let inputForm = document.getElementById('creation_field');

form.addEventListener('submit', event => {
    event.preventDefault();
    createToDo(inputForm.value);

    saveToLocalStorage(inputForm.value);

    inputForm.value = '';
});

let taskList = document.getElementById('task_list');

function createToDo(inputText) {
    let task = document.createElement('div');
    task.setAttribute('class', 'task');

    task.addEventListener('click', event => {
        event.preventDefault();

        task.setAttribute('class', 'task completed');

        setTimeout(function () {
            task.remove();

            removeFromLocalStorage(inputText);

            saveToSecondLocalStorage(inputText);
        }, 300);
    })

    let taskArea = document.createElement('div');
    taskArea.setAttribute('class', 'task_area');

    let checkbox = document.createElement('div');
    checkbox.setAttribute('class', 'task_check');

    let deleteButton = document.createElement('div');
    deleteButton.setAttribute('class', 'task_delete');
    deleteButton.innerHTML = 'del';

    deleteButton.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();

            task.setAttribute('class', 'task deleted');

            setTimeout(function () {
                task.remove();
                removeFromLocalStorage(inputText);
            }, 200);
        }
    )

    let taskText = document.createElement('div');
    taskText.setAttribute('class', 'task_text');

    taskText.innerHTML = inputText;

    taskArea.appendChild(checkbox);
    taskArea.appendChild(taskText);
    taskArea.appendChild(deleteButton);

    task.appendChild(taskArea);

    taskList.appendChild(task);
}


function saveToSecondLocalStorage(inputText) {

    let savedTodosArray;

    if (localStorage.getItem('completed_todos') === null) {
        savedTodosArray = [];
    } else {
        savedTodosArray = JSON.parse(localStorage.getItem('completed_todos'));
    }

    savedTodosArray.push(inputText);

    localStorage.setItem('completed_todos', JSON.stringify(savedTodosArray));
}

function saveToLocalStorage(inputText) {

    let savedTodosArray;

    if (localStorage.getItem('added_todos') === null) {
        savedTodosArray = [];
    } else {
        savedTodosArray = JSON.parse(localStorage.getItem('added_todos'));
    }

    savedTodosArray.push(inputText);

    localStorage.setItem('added_todos', JSON.stringify(savedTodosArray));
}


function removeFromLocalStorage(inputText) {
    let savedTodos = JSON.parse(localStorage.getItem('added_todos'));

    if (savedTodos) {
        savedTodos.some(function (oneTodoText, index) {
            if (oneTodoText === inputText) {
                savedTodos.splice(index, 1);
                return true;
            }
        });
        localStorage.setItem('added_todos', JSON.stringify(savedTodos));
    }
}

function extractFromLocalStorage() {
    let savedTodos = JSON.parse(localStorage.getItem('added_todos'));

    if (savedTodos) {
        savedTodos.forEach(function (oneTodoText) {
            createToDo(oneTodoText);
        });
    }
}

extractFromLocalStorage();

