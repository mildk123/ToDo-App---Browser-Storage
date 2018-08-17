var listEl = document.getElementById('task-list');
var userInput = document.getElementById('user-input');
var todos;
var todosArray = [];
var todoNum = 0;


// Global Functions

function addNode(elName, text, classNm) {
    var el = document.createElement(elName);
    if (text !== '') {
        var textNode = document.createTextNode(text);
        el.appendChild(textNode);
    }
    
    el.className = classNm;
    return el;
}


function addInputNode(elName, text, type, classNm, num) {
    var el = document.createElement(elName);
    if (text !== '') {
        el.setAttribute('value', text);
    }
    el.setAttribute('type', type);
    el.className = classNm;
    return el;
}





// Call function taskAdd on Enter (Keyboard Press)
userInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        taskAdd();
    }
});


// Save Todo in local storage
function saveTodos() {
    if (localStorage.getItem('todos') !== null) {
        todosArray = JSON.parse(localStorage.getItem('todos'));
    } else {
        todosArray = [];
    }
    todosArray.push(userInput.value);
    localStorage.setItem('todos', JSON.stringify(todosArray));
}

// Get Todos from local storage
function getTodos() {
    if (localStorage.getItem('todos') !== null) {
        // get task and convert it in array 
        todos = JSON.parse(localStorage.getItem('todos'));

        //Render task on DOM
        for (var i = 0; i < todos.length; i++) {
            var newLi = addNode('li', todos[i], 'list-group-item');
            var newSpan = addNode('span', '', 'float-right');
            var delBtn = addInputNode('input', 'Delete', 'button', 'btn btn-danger');
            var editBtn = addInputNode('input', 'Edit', 'button', 'btn btn-info');
            var targetEl = listEl.childNodes[0];
            userInput.value = '';
            listEl.insertBefore(newLi, targetEl);
            newSpan.appendChild(editBtn);
            newSpan.appendChild(delBtn);
            newLi.appendChild(newSpan);

            delBtn.addEventListener('click', deleteNode);
            editBtn.addEventListener('click', editNode);
        }
    }
}

function taskAdd() {
    if (userInput.value !== '') {
        saveTodos();
        var newLi = addNode('li', userInput.value, 'list-group-item');
        var newSpan = addNode('span', '', 'float-right');
        var delBtn = addInputNode('input', 'Delete', 'button', 'btn btn-danger');
        var editBtn = addInputNode('input', 'Edit', 'button', 'btn btn-info');
        var targetEl = listEl.childNodes[0];
        userInput.value = '';
        listEl.insertBefore(newLi, targetEl);
        newSpan.appendChild(editBtn);
        newSpan.appendChild(delBtn);
        newLi.appendChild(newSpan);

        delBtn.addEventListener('click', deleteNode);
        editBtn.addEventListener('click', editNode);

        todoNum++;
    } else {
        alert(`You Must Write Something First!`)
    }
}


function deleteAllNodes() {
    var listElNodes = listEl.childNodes;
    for (var i = 0; i < listElNodes.length;) {
        listEl.removeChild(listElNodes[i]);
    }
    localStorage.removeItem('todos');
}
function deleteNode() {
    nodeTodel = this.parentNode.parentNode;
    var arrayTodos = JSON.parse(localStorage.getItem('todos'));
    var indexNo = arrayTodos.indexOf(nodeTodel.innerText);
    arrayTodos.splice(indexNo, 1);
    localStorage.setItem('todos', JSON.stringify(arrayTodos));
    listEl.removeChild(nodeTodel);

}

function editNode() {
    var liEl = this.parentNode.parentNode;
    var prevText = liEl.innerText;
    var newDiv = addNode('div', '', 'input-group');
    var newInput = addInputNode('input', prevText, 'text', 'form-control');
    var newbtn = addInputNode('input', 'Done', 'button', 'btn btn-info');
    liEl.innerText = '';

    newDiv.appendChild(newInput);
    newDiv.appendChild(newbtn);
    liEl.appendChild(newDiv);

    newbtn.addEventListener('click', function () {
        var delBtn = addInputNode('input', 'Delete', 'button', 'btn btn-danger');
        var editBtn = addInputNode('input', 'Edit', 'button', 'btn btn-info');
        var newSpan = addNode('span', '', 'float-right');

        if (newInput.value !== '') {
            todosArray = editLocalData(prevText, newInput.value);
            liEl.innerText = newInput.value;
        } else {
            liEl.innerText = prevText;
        }

        newSpan.appendChild(editBtn);
        newSpan.appendChild(delBtn);
        liEl.appendChild(newSpan);
        delBtn.addEventListener('click', deleteNode);
        editBtn.addEventListener('click', editNode);
    });


}

// Take data from local storage changes it and then save it to local storage
function editLocalData(prevTask, newTask) {
    var arrayTodos = JSON.parse(localStorage.getItem('todos'));
    var indexNo = arrayTodos.indexOf(prevTask);
    arrayTodos.splice(indexNo, 1, newTask);
    localStorage.setItem('todos', JSON.stringify(arrayTodos));
}


