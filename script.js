// let main = document.createElement('main')
// main.className = 'container'

// document.body.prepend(main)

// let projectName = document.createElement('h1')
// projectName.innerHTML = 'To do list'
// main.append(projectName)

// let listBlock = document.createElement('div')
// listBlock.className = 'mainBlock'
// main.append(listBlock)

// let firsDiv = document.createElement('div')
// listBlock.append(firsDiv)

// let texIn = document.createElement('input')
// texIn.className = 'texIn'
// texIn.setAttribute('placeholder', 'Gonna do...')
// firsDiv.append(texIn)

// let setDate = document.createElement('input')
// setDate.className = 'setDate'
// setDate.setAttribute('type', 'date')
// firsDiv.append(setDate)

// let addBtn = document.createElement('button')
// addBtn.innerHTML = 'ADD'
// addBtn.id = 'addBtn'
// firsDiv.append(addBtn)

// let list = document.createElement('ul')
// listBlock.append(list)

// let todosArray = [
//     {   id: 1, 
//         text: 'код жазуу', 
//         date: '20-01-2024', 
//         cheked: true },

//     {   id: 1, 
//         text: 'китеп окуу', 
//         date: '20-01-2024', 
//         cheked: true },

//     {
//         id: 1,
//         text: 'семинар',
//         date: '20-01-2024',
//         cheked: false,
//     },
// ]

// const renderTodoItem = () => {
//     todosArray.map((todo, id) => {
//         let li = document.createElement('li')
//         li.className = 'taskItem'

//         let doneBtn = document.createElement('img')
//         doneBtn.src = 'done.png'
//         doneBtn.className = 'btn'
//         doneBtn.d = 'Done'
//         // doneBtn.addEventListener('click', () => {
//         // 	li.classList.toggle('completed')
//         doneBtn.addEventListener('click', complateTodo)

//         let deleteBtn = document.createElement('img')
//         deleteBtn.src = 'delete.png'
//         deleteBtn.className = 'btn'
//         deleteBtn.d = 'Delete'
//         // deleteBtn.addEventListener('click', () => {
//         // 	li.remove()
//         deleteBtn.addEventListener('click', deleteTodo)

//         let label = document.createElement('label')
//         label.append(todo.text + ' - ' + todo.date)
//         li.append(label)
//         li.append(doneBtn)
//         li.append(deleteBtn)
//         list.append(li)
//     })
// }

// const addTodo = () => {
//     let newTask = texIn.value
//     let date = setDate.value

//     if (newTask != '') {
//         texIn.value = ''
//         setDate.value = ''
//     }
// }

// const complateTodo = e => {
//     //  e.target.parentNode.classList.toggle('done')

//     let isDone = e.target.parentNode.classList.contains('done')

//     isDone
//         ? e.target.parentNode.classList.remove('done')
//         : e.target.parentNode.classList.add('done')
// }
// const deleteTodo = e => {
//     e.target.parentNode.remove(e.parentNode)
// }
// renderTodoItem()
// addBtn.addEventListener('click', addTodo)



let main = document.createElement('main')
main.className = 'container'
document.body.prepend(main)

let projectName = document.createElement('h1')
projectName.innerHTML = 'To do list'
main.append(projectName)

let listBlock = document.createElement('div')
listBlock.className = 'mainBlock'
main.append(listBlock)

let firsDiv = document.createElement('div')
listBlock.append(firsDiv)

let texIn = document.createElement('input')
texIn.className = 'texIn'
texIn.setAttribute('placeholder', 'Gonna do...')
firsDiv.append(texIn)

let setDate = document.createElement('input')
setDate.className = 'setDate'
setDate.setAttribute('type', 'date')
firsDiv.append(setDate)

let addBtn = document.createElement('button')
addBtn.innerHTML = 'ADD'
addBtn.id = 'addBtn'
firsDiv.append(addBtn)

let list = document.createElement('ul')
listBlock.append(list)

let todosArray = JSON.parse(localStorage.getItem('todos')) || [
	{ id: 1, text: 'код жазуу', date: '2024-01-20', checked: true },
	{ id: 2, text: 'китеп окуу', date: '2024-01-20', checked: true },
	{ id: 3, text: 'семинар', date: '2024-01-20', checked: false },
]

const saveTodos = () => {
	localStorage.setItem('todos', JSON.stringify(todosArray))
}

const renderTodoItem = () => {
	list.innerHTML = ''
	todosArray.forEach((todo, index) => {
		let li = document.createElement('li')
		li.className = 'taskItem'
		if (todo.checked) {
			li.classList.add('done')
		}

		let doneCheckbox = document.createElement('input')
		doneCheckbox.type = 'checkbox'
		doneCheckbox.checked = todo.checked
		doneCheckbox.className = 'btn'
		doneCheckbox.addEventListener('change', () => {
			completeTodo(todo.id)
		})

		let deleteBtn = document.createElement('img')
		deleteBtn.src = 'delete.png'
		deleteBtn.className = 'btn'
		deleteBtn.alt = 'Delete'
		deleteBtn.addEventListener('click', () => {
			deleteTodo(todo.id)
		})

		let label = document.createElement('label')
		label.append(todo.text + ' - ' + todo.date)
		li.append(doneCheckbox)
		li.append(label)
		li.append(deleteBtn)
		list.append(li)
	})
}

const addTodo = () => {
	let newTask = texIn.value
	let date = setDate.value

	if (newTask != '') {
		let newTodo = {
			id: Date.now(),
			text: newTask,
			date: date,
			checked: false,
		}
		todosArray.push(newTodo)
		saveTodos()
		renderTodoItem()
		texIn.value = ''
		setDate.value = ''
	}
}

const completeTodo = id => {
	todosArray = todosArray.map(todo => {
		if (todo.id === id) {
			todo.checked = !todo.checked
		}
		return todo
	})
	saveTodos()
	renderTodoItem()
}

const deleteTodo = id => {
	todosArray = todosArray.filter(todo => todo.id !== id)
	saveTodos()
	renderTodoItem()
}

renderTodoItem()
addBtn.addEventListener('click', addTodo)
