let allTodos = document.querySelectorAll('.todos .todo');
const containers = document.querySelectorAll('.container');
let currentTodo = null;
let currentContainer = null
const addMoreBtns = document.querySelectorAll('.add-more')
let cardAddBtn = document.querySelectorAll('.add')
let taskText = document.querySelectorAll('.upper-todo input')
let deleteTodoBtn = document.querySelectorAll('.delete-btn')
let editTodoBtn = document.querySelectorAll('.edit-btn')
console.log(editTodoBtn);



function refresh() {
    allTodos = document.querySelectorAll('.todos .todo');
    cardAddBtn = document.querySelectorAll('.add')
    taskText = document.querySelectorAll('.upper-todo input')
    deleteTodoBtn = document.querySelectorAll('.delete-btn')
    editTodoBtn = document.querySelectorAll('.edit-btn')
    dragAndDrop()
    cardAdder()
    deleteTodoFunc()
    editTodoFunc()
    console.log(editTodoBtn);
}



// --------------------------------------------
// Code for drag and drop


function dragAndDrop(){

//bottom code is for iterating all the todos in 'allTodos' ⬇️

allTodos.forEach((todo) => {

    todo.addEventListener('dragstart', () => {
        console.log(todo);
        
        todo.classList.add('dragging');     // just a class for lowering the opacity to 50% to give the feedback/vibe
        todo.classList.remove('dragged');   // and 'dragged' is for 100% opacity
        currentTodo = todo;

    });
    
    todo.addEventListener('dragend', () => {

        todo.classList.remove('dragging');  
        todo.classList.add('dragged');      
        currentTodo = null;

    });
});


//bottom code is for iterating all the containers on which our todo is hovering and going to drop ⬇️

containers.forEach((container) => {

    container.addEventListener('dragover', (e) => {

        e.preventDefault();                         //just used to enable dragging, bs karna ha

        currentContainer = container    //this stores the current container into the variable which remains null
        Object.assign(currentContainer.style, {     
            border: 'none'                          //yeh style bs feel ke liye taki remove hote hue dikhe from the old container
        })

        const todosDiv = container.querySelector('.todos');  //isme it's appending the todo into the container but because of the 'dragging' class, it's opacity is low (feedback ha bhai bs) 
        if (currentTodo && todosDiv) {
            todosDiv.appendChild(currentTodo);
        }
        
    });
    
    container.addEventListener('drop', (e) => {
        
        e.preventDefault();             // ---> jaruri ha bhai
        currentContainer = container    //this stores the current container into the variable which remains null
        
        currentTodo.children[1].children[0].children[2].setAttribute('src', './images/edit.png')
        
        Object.assign(currentContainer.style, {     // feedback ke liye bro
            // border: '4px solid orange'
        })

    });

});
}
dragAndDrop()


// --------------------------------------------
// --------------------------------------------
// Code for 'add-buttons'


addMoreBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        const lastChildCount = btn.parentElement.children[1].childElementCount
        console.log(lastChildCount);

        if(lastChildCount == 0){
            addTodo(btn)
        }else{
            const lastChild = btn.parentElement.children[1].children[lastChildCount-1].children[0].children[1]
            console.log(lastChild);
            
            if(lastChild.value != ''){
                console.log(btn.children[0].innerHTML);
                addTodo(btn)
            }else{
                btn.classList.add('red')
                setInterval(() => {
                    btn.classList.remove('red')
                }, 1000);
            }
        }

    })
})

//logic for adding Todo

function addTodo(btn) {
    const parentTodos = btn.parentElement.children[1]
    console.log("todos => ",parentTodos);
    
    const newTodo = document.createElement('div')
    newTodo.classList.add('todo', 'dragged')
    newTodo.setAttribute('draggable', 'true')

    console.log(newTodo);
    

    const upperTodo = document.createElement('div')
    upperTodo.classList.add('upper-todo')
    
    const taskArrow = document.createElement('p')
    taskArrow.innerHTML = '›'
    const taskInput = document.createElement('input')
    taskInput.setAttribute('type', 'text')
    taskInput.setAttribute('placeholder', 'Enter task...')
    const addTaskBtn = document.createElement('button')
    addTaskBtn.classList.add('add')
    addTaskBtn.innerHTML = 'Add'

    upperTodo.appendChild(taskArrow)
    upperTodo.appendChild(taskInput)
    upperTodo.appendChild(addTaskBtn)
    newTodo.appendChild(upperTodo)
    

    const lowerTodo = document.createElement('div')
    lowerTodo.classList.add('lower-todo')
    
    const todoOptions = document.createElement('div')
    todoOptions.classList.add('todo-options')
    lowerTodo.appendChild(todoOptions)
    const deleteImg = document.createElement('img')
    deleteImg.setAttribute('src', './images/delete.png')
    deleteImg.classList.add('delete-btn')
    todoOptions.appendChild(deleteImg)
    const editImg = document.createElement('img')
    editImg.setAttribute('src', './images/edit.png')
    editImg.classList.add('edit-btn')
    todoOptions.appendChild(editImg)
    // const statusImg = document.createElement('img')
    // statusImg.setAttribute('src', './images/todo-status.png')
    // statusImg.classList.add('status')
    // todoOptions.appendChild(statusImg)
    
    newTodo.appendChild(lowerTodo)
    console.log('newtodo => ',newTodo);

    parentTodos.append(newTodo)
    refresh()
    
}


// --------------------------------------------
// --------------------------------------------


//card adder to todo list - functionlity


function cardAdder() {

    cardAddBtn.forEach((add)=>{
        
        add.addEventListener('click', ()=>{
            console.log('thodi der rukke',add);
            const lowerTodo = add.parentElement.parentElement.children[1]
            console.log(lowerTodo);
            
            if(add.parentElement.children[1].childElementCount == 0){
                add.remove()
                lowerTodo.style.display = 'block';
            }else{
                
                if(add.parentElement.children[1].value != ''){
                    add.remove()
                    lowerTodo.style.display = 'block';
                }
            }
            
        })
    })
    
}


// --------------------------------------------
// --------------------------------------------

//delete Button func

function deleteTodoFunc(params) {
    
    deleteTodoBtn.forEach((btn)=>{
        // console.log(btn);
        
        
        btn.addEventListener('click', ()=>{
            // console.log('jadhjasd',btn.parentElement.parentElement.parentElement);
            
            btn.parentElement.parentElement.parentElement.remove()
        })

    })

}


// --------------------------------------------
// --------------------------------------------

//edit Button func

function editTodoFunc(params) {

    console.log('entered edit func');
    
    
    editTodoBtn.forEach((btn)=>{
        btn.addEventListener('click', ()=>{

            console.log('yeh rha edit button',btn);
            
            
            const lowerTodo = btn.parentElement.parentElement
            // console.log(lowerTodo);
            const upperTodo = lowerTodo.parentElement.children[0]
            
            if(lowerTodo.style.display == 'block'){
                lowerTodo.style.display = 'none';
                const addTaskBtn = document.createElement('button')
                addTaskBtn.classList.add('add')
                addTaskBtn.innerHTML = 'Add'
                addTaskBtn.setAttribute('onclick', 'cardAdder()')
                console.log('done bhai');
                upperTodo.append(addTaskBtn)
                refresh()
            }

        })
    })


}
