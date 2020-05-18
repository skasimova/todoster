let taskList = document.getElementById('task_list');

function completedCount() {
    let countedElements = document.getElementsByClassName('task').length;
    let counter = document.getElementById('completed_count');

    counter.innerText = countedElements === 0 ? 'none' : countedElements;
}

function createToDo(inputText) {
    let task = document.createElement('div');
    task.setAttribute('class', 'task');

    let taskArea = document.createElement("div");
    taskArea.setAttribute('class', 'task_area');

    let undoButton = document.createElement('div');
    undoButton.setAttribute('class', 'task_undo');
    undoButton.innerHTML = 'undo';

    undoButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();

        task.setAttribute('class', 'task undone');

        setTimeout(function () {

            task.remove();

            removeFromLocalStorage(inputText);

            completedCount();

            saveToSecondLocalStorage(inputText);
        }, 300);
    })

    let deleteButton = document.createElement("div");
    deleteButton.setAttribute('class', 'task_delete');
    deleteButton.innerHTML = 'del';

    deleteButton.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();

        task.setAttribute('class', 'task deleted');

            setTimeout(function () {
                task.remove();
                removeFromLocalStorage(inputText);

                completedCount();

            }, 200);
        }
    )

    let taskText = document.createElement('div');
    taskText.setAttribute('class', 'task_text');
    taskText.innerHTML = inputText;

    taskArea.appendChild(undoButton);
    taskArea.appendChild(taskText);
    taskArea.appendChild(deleteButton);

    task.appendChild(taskArea);

    taskList.appendChild(task);

}

function removeFromLocalStorage(inputText) {
    let savedTodos = JSON.parse(localStorage.getItem('completed_todos'));

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
    let savedTodos = JSON.parse(localStorage.getItem('completed_todos'));

    if (savedTodos) {
        savedTodos.forEach(function (oneTodoText) {
            createToDo(oneTodoText);
        });
    }

    completedCount();

}

extractFromLocalStorage();
