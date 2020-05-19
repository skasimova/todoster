let form = document.getElementById('form');
let inputForm = document.getElementById('creation_field');

form.addEventListener('submit', event => {
    event.preventDefault();
    createTask(inputForm.value);

    saveToLocalStorage(inputForm.value);

    inputForm.value = '';
});

let taskList = document.getElementById('task_list');

function createTask(inputText) {
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

    let savedTasksArray;

    if (localStorage.getItem('completed_tasks') === null) {
        savedTasksArray = [];
    } else {
        savedTasksArray = JSON.parse(localStorage.getItem('completed_tasks'));
    }

    savedTasksArray.push(inputText);

    localStorage.setItem('completed_tasks', JSON.stringify(savedTasksArray));
}

function saveToLocalStorage(inputText) {

    let savedTasksArray;

    if (localStorage.getItem('added_tasks') === null) {
        savedTasksArray = [];
    } else {
        savedTasksArray = JSON.parse(localStorage.getItem('added_tasks'));
    }

    savedTasksArray.push(inputText);

    localStorage.setItem('added_tasks', JSON.stringify(savedTasksArray));
}


function removeFromLocalStorage(inputText) {
    let savedTasks = JSON.parse(localStorage.getItem('added_tasks'));

    if (savedTasks) {
        savedTasks.some(function (oneTaskText, index) {
            if (oneTaskText === inputText) {
                savedTasks.splice(index, 1);
                return true;
            }
        });
        localStorage.setItem('added_tasks', JSON.stringify(savedTasks));
    }
}

function extractFromLocalStorage() {
    let savedTasks = JSON.parse(localStorage.getItem('added_tasks'));

    if (savedTasks) {
        savedTasks.forEach(function (oneTaskText) {
            createTask(oneTaskText);
        });
    }
}

extractFromLocalStorage();

