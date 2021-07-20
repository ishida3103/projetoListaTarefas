// VARIÁVEIS

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// EVENT LISTENERS

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)
document.addEventListener('DOMContentLoaded', getTodos)


// FUNÇÕES

function addTodo(event){

    //Prevent form from submitting

    event.preventDefault()

    // Todo DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    //Create LI
    const newTodo = document.createElement('li')
    newTodo.innerHTML = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    
    // Add todo to localStorage

    saveLocalTodos(todoInput.value)

    //Check Mark Button

    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class = "fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)

    //Check Trash Button

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    //Append to list
    todoList.appendChild(todoDiv)

    //Clear todo Input value
    todoInput.value = ''
}

function deleteCheck(e){
    const item = e.target
    
    // DELETAR TAREFA
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;

        // ANIMACAO
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    //Check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = 'none'
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = 'none'
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    // CHECK --> Hey Do i already have things in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    // CHECK --> Hey Do i already have things in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // Todo DIV
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        //Create LI
        const newTodo = document.createElement('li')
        newTodo.innerHTML = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        //Check Mark Button

        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class = "fas fa-check"></i>'
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton)

        //Check Trash Button

        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class = "fas fa-trash"></i>'
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton)

        //Append to list
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

// TESTANDO ANIMAÇÕES COM O CONTAINER

document.addEventListener('DOMContentLoaded', function(){
    const container = document.querySelector('.container')
    container.className = 'container-animado'
})