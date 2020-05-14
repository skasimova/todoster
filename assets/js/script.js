// ищу форму в ДОМе (в первом случае form это просто моё название)
let form = document.getElementById('form');

// ищу текстовое поле в ДОМе (inputForm это опять же просто моё название)
let inputForm = document.getElementById('entrybox');

// добавила событие к форме (браузер по нажатию enter/кнопки сам создаёт сабмит, а я добавила своё действие по сабмиту)
form.addEventListener('submit', event => {
    event.preventDefault();
    // вызываю функцию по созданию todoшки и передаю туда значение inputForm (а оно соответствует введённому в entrybox)
    createToDo(inputForm.value);

    saveToLocalStorage(inputForm.value);

    // удаляю введённый текст из формочки
    inputForm.value = "";
});

// ищу list_container в ДОМе, чтобы в него потом вставить засабмиченные тудушки
let listContainer = document.getElementById('list_container');

// inputText - название того текста (это я сама его так назвала), который мне придёт
function createToDo(inputText) {
    // создаём новые элементы (на данный момент они никуда не поставлены на странице)
    let todoElement = document.createElement("div");
    todoElement.setAttribute("class", "todo_element");

    let todoElementContainer = document.createElement("div");
    todoElementContainer.setAttribute("class", "todo_element_container");

    let todoCheckbox = document.createElement("div");
    todoCheckbox.setAttribute("class", "todo_checkbox");

    let closeButton = document.createElement("div");
    closeButton.setAttribute("class", 'closebutton');

    // создаю событие на отмечание todoшки галочкой
    todoElement.addEventListener('click', event => {
        event.preventDefault();

        todoElement.setAttribute("class", "todo_element completed");

        setTimeout(function() {
            // если checkbox (event.target это checkbox) отмечен галочкой, тооо...
            // убираем всю todoшку (и текст, и контейнер, и чекбокс и тд).
            todoElement.remove();

            // удаляем элемент из local storage
            removeFromLocalStorage(inputText);
        }, 300);
    })

    let todoElementText = document.createElement("div");
    todoElementText.setAttribute("class", "todo_element_text");

    // заполнила вышестоящий div текстом, который мне пришёл
    todoElementText.innerHTML = inputText;

    // вставила созданные элементы (toDoCheckbox, todoElementText) на страницу (в todoElementContainer) (выше я их как бы придумала, а теперь вставила на страницу)
    todoElementContainer.appendChild(todoCheckbox);
    todoElementContainer.appendChild(todoElementText);

    // и пошло-поехало по аналогии дальше
    todoElement.appendChild(todoElementContainer);
    todoElement.appendChild(closeButton);

    listContainer.appendChild(todoElement);
}

// сохраняем текст ОДНОЙ тудушки в local storage. added_todos это я обозначила новый ключ, типа, название ячейки,
// в которой будут храниться добавленные тудушки
function saveToLocalStorage(inputText) {

    // три этапа: 1) берём текст тудушек из локал хранилища
    // преобразуем его в массив (тк в строку не сможем добавить новую, это как бы "бумажка", а нам нужна
    // "пачка" бумажек (вся нижеприведённая функция нужна для того чтобы преобразовать строку к массиву)

    let savedTodosArray;

    if (localStorage.getItem('added_todos') === null) {
        savedTodosArray = [];
    } else {
        savedTodosArray = JSON.parse(localStorage.getItem('added_todos'));
    }

    // 2) добавляем ещё одну бумажку (тудушку) в пачку бумажек (массив тудушек)
    savedTodosArray.push(inputText);

    // 3) преобразую весь массив обратно к строке и сохраняю его с ключом added_todos (типа закрыли папочку и засунули обратно)
    localStorage.setItem('added_todos', JSON.stringify(savedTodosArray));
}


// функция, чтобы элемент удалялся из local storage
function removeFromLocalStorage(inputText) {
    let savedTodos = JSON.parse(localStorage.getItem("added_todos"));

    if (savedTodos) {
        savedTodos.some(function (oneTodoText, index) {
            if (oneTodoText === inputText) {
                savedTodos.splice(index, 1);
                return true;
            }
        });
        // запихала обратно тудушки, которые не надо удалять (неудалённые тудушки)
        localStorage.setItem('added_todos', JSON.stringify(savedTodos));
    }
}

// извлекаем массив с тудушками из local storage при открытии страницы
function extractFromLocalStorage() {
    let savedTodos = JSON.parse(localStorage.getItem("added_todos"));

    if (savedTodos) {
        savedTodos.forEach(function (oneTodoText) {
            createToDo(oneTodoText);
        });
    }
}

// если здесь не написать вызов функции, то при открытии страницы ничего не экстрактнется
extractFromLocalStorage();

