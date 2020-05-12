// ищу форму в ДОМе (в первом случае form это просто моё название)
let form = document.getElementById('form');

// ищу текстовое поле в ДОМе (inputForm это опять же просто моё название)
let inputForm = document.getElementById('entrybox');

// добавила событие к форме (браузер по нажатию enter/кнопки сам создаёт сабмит, а я добавила своё действие по сабмиту)
form.addEventListener('submit', event => {
    event.preventDefault();
    // вызываю функцию по созданию todoшки и передаю туда значение inputForm (а оно соответствует введённому в entrybox)
    createToDo(inputForm.value);

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

    let todoCheckbox = document.createElement("input");
    todoCheckbox.setAttribute("class", "todo_checkbox");
    todoCheckbox.setAttribute("type", "checkbox");

    // создаю событие на отмечание todoшки галочкой
    todoCheckbox.addEventListener('change', event => {
        // если checkbox (event.target это checkbox) отмечен галочкой, тооо...
        if (event.target.checked) {
            // убираем всю todoшку (и текст, и контейнер, и чекбокс и тд).
            // a через closest я ищу ближайшего подходящего родителя, т.е. того, который совпадает с тем, что в скобках)
            // и удаляю родителя (то есть всю todoшку) вместе со всеми его детьми (брр)
            event.target.closest(".todo_element").remove();
        }
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

    listContainer.appendChild(todoElement);
}

