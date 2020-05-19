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

class MainPage {
    constructor() {
        this.page = document.getElementById('tasks_page');

        this.storage = new Storage('added_tasks');
        this.storageCompleted = new Storage('completed_tasks');

        this.form = document.getElementById('form');
        this.inputForm = document.getElementById('creation_field');
    }

    submitForm() {
        this.form.addEventListener('submit', event => {
            event.preventDefault();

            this.createTask(this.inputForm.value);

            this.storage.addTask(this.inputForm.value);

            this.inputForm.value = '';
        });
    }

    createTask(taskText) {
        let task = document.createElement('div');
        task.setAttribute('class', 'task');

        task.addEventListener('click', event => {
            event.preventDefault();

            task.setAttribute('class', 'task completed');

            setTimeout(() => {
                task.remove();

                this.storage.deleteTask(taskText);
                this.storageCompleted.addTask(taskText);
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

            setTimeout(() => {
                task.remove();
                this.storage.deleteTask(taskText);
            }, 200);
        })

        let taskTextDiv = document.createElement('div');
        taskTextDiv.setAttribute('class', 'task_text');
        taskTextDiv.innerHTML = taskText;

        taskArea.appendChild(checkbox);
        taskArea.appendChild(taskTextDiv);

        task.appendChild(taskArea);
        task.appendChild(deleteButton);

        let taskList = document.getElementById('task_list');

        taskList.appendChild(task);
    }

    isAvailable() {
        return this.page !== null;
    }

    createPage() {
        this.submitForm();

        let tasks = this.storage.getTasks();

        if (tasks) {
            tasks.forEach(taskText => {
                this.createTask(taskText);
            });
        }
    }
}

class CompletedTasksPage {
    constructor() {
        this.page = document.getElementById('completed_tasks_page');

        this.storage = new Storage('added_tasks');
        this.storageCompleted = new Storage('completed_tasks');
    }

    completedCount() {
        const countedElements = document.getElementsByClassName('task').length;
        let counter = document.getElementById('completed_count');

        counter.innerText = countedElements === 0 ? 'none' : countedElements;
    }

    createTask(taskText) {
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

            setTimeout(() => {
                task.remove();

                this.storageCompleted.deleteTask(taskText);
                this.storage.addTask(taskText);

                this.completedCount();
            }, 300);
        })

        let deleteButton = document.createElement("div");
        deleteButton.setAttribute('class', 'task_delete');
        deleteButton.innerHTML = 'del';

        deleteButton.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();

                task.setAttribute('class', 'task deleted');

                setTimeout(() => {
                    task.remove();

                    this.storageCompleted.deleteTask(taskText);

                    this.completedCount();

                }, 200);
            }
        )

        let taskTextDiv = document.createElement('div');
        taskTextDiv.setAttribute('class', 'task_text');
        taskTextDiv.innerHTML = taskText;

        taskArea.appendChild(undoButton);
        taskArea.appendChild(taskTextDiv);

        task.appendChild(taskArea);
        task.appendChild(deleteButton);

        let taskList = document.getElementById('task_list');

        taskList.appendChild(task);
    }

    isAvailable() {
        return this.page !== null;
    }

    createPage() {
        let tasks = this.storageCompleted.getTasks();

        if (tasks) {
            tasks.forEach(taskText => {
                this.createTask(taskText);
            });
        }

        this.completedCount();
    }
}

const mainPage = new MainPage();

if (mainPage.isAvailable()) {
    mainPage.createPage();
}

const completedTasksPage = new CompletedTasksPage();

if (completedTasksPage.isAvailable()) {
    completedTasksPage.createPage();
}