class Storage {
    constructor(storageKey) {
        this.storage = localStorage;
        this.storageKey = storageKey;
    }

    getTasks() {
        let tasks = [];

        if (this.storage.getItem(this.storageKey) !== null) {
            tasks = JSON.parse(this.storage.getItem(this.storageKey));
        }

        return tasks;
    }

    saveTasks(tasks) {
        this.storage.setItem(this.storageKey, JSON.stringify(tasks));
    }

    addTask(taskText) {
        let tasks = this.getTasks();

        tasks.push(taskText);

        this.saveTasks(tasks);
    }

    deleteTask(taskText) {
        let tasks = this.getTasks();

        if (tasks) {
            tasks.some(function (currentTaskText, index) {
                if (currentTaskText === taskText) {
                    tasks.splice(index, 1);
                    return true;
                }
            });

            this.saveTasks(tasks);
        }
    }
}

const storage = new Storage('added_tasks');
const storageCompleted = new Storage('completed_tasks');

let tasksPage = document.getElementById('tasks_page');

if (tasksPage !== null) {
    let form = document.getElementById('form');
    let inputForm = document.getElementById('creation_field');

    form.addEventListener('submit', event => {
        event.preventDefault();
        createTaskOnFirstPage(inputForm.value);

        storage.addTask(inputForm.value);

        inputForm.value = '';
    });

    let taskList = document.getElementById('task_list');

    function createTaskOnFirstPage(inputText) {
        let task = document.createElement('div');
        task.setAttribute('class', 'task');

        task.addEventListener('click', event => {
            event.preventDefault();

            task.setAttribute('class', 'task completed');

            setTimeout(function () {
                task.remove();

                storage.deleteTask(inputText);
                storageCompleted.addTask(inputText);
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
                    storage.deleteTask(inputText);
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

    function extractFromLocalStorageFirstPage() {
        let tasks = storage.getTasks();

        if (tasks) {
            tasks.forEach(function (oneTaskText) {
                createTaskOnFirstPage(oneTaskText);
            });
        }
    }

    extractFromLocalStorageFirstPage();
}

let completedTasksPage = document.getElementById('completed_tasks_page');

if (completedTasksPage !== null) {
    let taskList = document.getElementById('task_list');

    function completedCount() {
        let countedElements = document.getElementsByClassName('task').length;
        let counter = document.getElementById('completed_count');

        counter.innerText = countedElements === 0 ? 'none' : countedElements;
    }

    function createTaskOnSecondPage(inputText) {
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

                storageCompleted.deleteTask(inputText);
                storage.addTask(inputText);

                completedCount();
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

                    storageCompleted.deleteTask(inputText);

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

    function extractFromLocalStorageSecondPage() {
        let tasks = storageCompleted.getTasks();

        if (tasks) {
            tasks.forEach(function (oneTaskText) {
                createTaskOnSecondPage(oneTaskText);
            });
        }

        completedCount();

    }

    extractFromLocalStorageSecondPage();
}
