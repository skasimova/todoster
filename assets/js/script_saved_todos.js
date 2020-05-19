let taskList = document.getElementById('task_list');

function completedCount() {
    let countedElements = document.getElementsByClassName('task').length;
    let counter = document.getElementById('completed_count');

    counter.innerText = countedElements === 0 ? 'none' : countedElements;
}

function createTask(inputText) {
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
    let savedTasks = JSON.parse(localStorage.getItem('completed_tasks'));

    if (savedTasks) {
        savedTasks.some(function (oneTaskText, index) {
            if (oneTaskText === inputText) {
                savedTasks.splice(index, 1);
                return true;
            }
        });
        localStorage.setItem('completed_tasks', JSON.stringify(savedTasks));

    }
}

function saveToSecondLocalStorage(inputText) {

    let savedTasksArray;

    if (localStorage.getItem('added_tasks') === null) {
        savedTasksArray = [];
    } else {
        savedTasksArray = JSON.parse(localStorage.getItem('added_tasks'));
    }

    savedTasksArray.push(inputText);

    localStorage.setItem('added_tasks', JSON.stringify(savedTasksArray));
}

function extractFromLocalStorage() {
    let savedTasks = JSON.parse(localStorage.getItem('completed_tasks'));

    if (savedTasks) {
        savedTasks.forEach(function (oneTaskText) {
            createTask(oneTaskText);
        });
    }

    completedCount();

}

extractFromLocalStorage();
