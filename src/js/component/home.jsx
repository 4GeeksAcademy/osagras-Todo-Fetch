import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	
	const [input,setInput] = useState("");
	const [list,setList] = useState([])

	const addTask = () => {
		setList(list.concat({label: input, done: false}));setInput("")
	}

	const deleteTask = (index) => {
		setList(list.filter((input, currentIndex) => index !== currentIndex)
	)}



	function createUser () {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/elgodie", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",},
			body: JSON.stringify([])	
		})
		.then ((response) => response.json())
		.then ((data) => console.log(data))
	}



	function getList () {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/elgodie", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",},
		})
		.then ((response) => response.json())
		.then ((data) => setList(data))
	}

	function updateList () {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/elgodie", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",},
			body: JSON.stringify(list)	
		})
		.then ((response) => response.json())
		.then ((data) => console.log(data))
	}



	function deleteList () {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/elgodie", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",}
		})
		.then ((response) => response.json())
		.then ((data) => console.log(data)) 
	}


	useEffect (() => {
		createUser(),
		getList()
	}, [])


	useEffect (() => {
		updateList()
	},[list])





	

	
	return (
		<div className="container">
			<div className="todolist">
				<h1>To do list</h1>
					<div className="enterText input-group mb-3">
 				 		<input maxLength="40" id="text" type="text" placeholder="Enter Task" onChange={(e) => setInput(e.target.value)} value={input}/>
  						<button onClick={addTask} type="button" id="btn">Add Task</button>
					</div>

				{list.map((input, index) => {
					return (
						<ul>
							<li key={index}>
							● {input.label}<button onClick={()=>deleteTask(index)} id="trash" ><FontAwesomeIcon icon={faTrash} /></button>
							</li>
						</ul>
					)
				})}

				<div>
				  <button
					className="btn btn-danger"
					onClick={deleteList}
				  >
					Delete List
				  </button>
				</div>
					
				<li>
					<div className="contador">
						{list.length} tasks left
					</div>
				</li>
				
			
			</div>
			
		</div>
	);
};

export default Home;


