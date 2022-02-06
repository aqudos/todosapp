// selectors
const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const todoFilter=document.querySelector(".filter-todo");

// event listners
document.addEventListener('DOMContentLoaded', getTodo)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',delTodo);
todoFilter.addEventListener('click',filterTodo);
// functions
function addTodo(event){
event.preventDefault();
// todo div
  const todoDiv=document.createElement("div");
todoDiv.classList.add("todo");
// list
const todoLi = document.createElement("li");
todoLi.innerText= todoInput.value;
todoLi.classList.add("todo-item");
todoDiv.appendChild(todoLi);
saveLocal(todoInput.value);
// completed button
const compltbtn= document.createElement("button");
compltbtn.innerHTML = '<i  class="fa fa-check"></i>';
compltbtn.classList.add("complte-btn");
todoDiv.appendChild(compltbtn);
// trash button
const trashbtn=document.createElement("button");
trashbtn.innerHTML='<i class="fa fa-trash"></i>';
trashbtn.classList.add("trash-btn");
todoDiv.appendChild(trashbtn);
// append to div
todoList.appendChild(todoDiv); 
todoInput.value= "";
}
function delTodo(e){
	const item = e.target;
	if(item.classList[0]==='trash-btn'){
		const todo=item.parentElement;
		todo.classList.add('fall');
		removeLocal(todo);
		todo.addEventListener('transitioned', function(){
			todo.remove();
		});
	}
	// check mark
	if(item.classList[0]==='complte-btn'){
		const todo=item.parentElement;
		todo.classList.toggle("completed");
	}
}
function filterTodo(e){
	const todos=todoList.childNodes;
	todos.forEach(function(todo){
		switch(e.target.value){
			case "all":
			todo.style.display = "flex";
			break;
			case "completed":
			if(todo.classList.contains("completed")){
				todo.style.display = "flex";
			} 
			else{
				todo.style.display = "none";
			}
			break;
			case "uncompleted":
			if(!todo.classList.contains("completed")){
				todo.style.display = "flex";
			}
			else{
				todo.style.display = "none"
			}
			break;
		}
	});
}
function saveLocal(todo){
	console.log(todo);
	let todos;
	if(localStorage.getItem("todos") === null){
		todos = [];
	}
	else{
		todos = JSON.parse(localStorage.getItem("todos"))
	}
	console.log(todos);
	 todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodo(){
	let todos;
	if(localStorage.getItem("todos")=== null){
		todos = [];
	}
	else{
		todos = JSON.parse(localStorage.getItem("todos"))
	}
	todos.forEach(function(todo){
		const todoDiv=document.createElement("div");
todoDiv.classList.add("todo");
// list
const todoLi = document.createElement("li");
todoLi.innerText= todo;
todoLi.classList.add("todo-item");
todoDiv.appendChild(todoLi);

// completed button
const compltbtn= document.createElement("button");
compltbtn.innerHTML = '<i  class="fa fa-check"></i>';
compltbtn.classList.add("complte-btn");
todoDiv.appendChild(compltbtn);
// trash button
const trashbtn=document.createElement("button");
trashbtn.innerHTML='<i class="fa fa-trash"></i>';
trashbtn.classList.add("trash-btn");
todoDiv.appendChild(trashbtn);
// append to div
todoList.appendChild(todoDiv);
	});
}
function removeLocal(todo){
	let todos;
	if(localStorage.getItem("todos")=== null){
		todos = [];
	}
	else{
		todos = JSON.parse(localStorage.getItem("todos"))
	}
	const todoIndex = todo.children[0].innerHTML;
	todos.splice(todos.indexOf(todoIndex),1);
	localStorage.setItem("todos",JSON.stringify(todos))
}