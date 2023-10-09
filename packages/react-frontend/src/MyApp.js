// src/MyApp.js
import React, { useEffect, useState } from 'react'
import Table from './Table'
import Form from './Form'

function MyApp() {
	function fetchUsers() {
		const promise = fetch('http://localhost:8000/users')
		return promise
	}

	function postUser(person) {
		const promise = fetch('http://localhost:8000/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(person),
		})

		return promise
	}

	function updateList(person) {
		postUser(person)
			.then(() => setCharacters([...characters, person]))
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		fetchUsers()
			.then((res) => res.json())
			.then((json) => setCharacters(json['users_list']))
			.catch((error) => {
				console.log(error)
			})
	}, [])
	const [characters, setCharacters] = useState([])
	// src/MyApp.js (a new function inside the MyApp function)
	function updateList(person) {
		setCharacters([...characters, person])
	}
	function removeOneCharacter(index) {
		const updated = characters.filter((character, i) => {
			return i !== index
		})
		setCharacters(updated)
	}
	return (
		<div className="container">
			<Table characterData={characters} removeCharacter={removeOneCharacter} />
			<Form handleSubmit={updateList} />
		</div>
	)
}
export default MyApp
