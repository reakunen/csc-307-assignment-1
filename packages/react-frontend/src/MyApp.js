// src/MyApp.js
import Table from './Table'
import React, { useState, useEffect } from 'react'
import Form from './Form'

function MyApp() {
	const [characters, setCharacters] = useState([])
	useEffect(() => {
		fetchUsers()
			.then((res) => res.json())
			.then((json) => setCharacters(json['users_list']))
			.catch((error) => {
				console.log(error)
			})
	}, [])

	function postUser(person) {
		const promise = fetch('Http://localhost:8000/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(person),
		})
		return promise
	}

	function deleteUser(id) {
		const promise = fetch(`Http://localhost:8000/users/${id}`, {
			method: 'DELETE',
		})
		return promise
	}

	function fetchUsers() {
		const promise = fetch('http://localhost:8000/users')
		return promise
	}

	function removeOneCharacter(id) {
		deleteUser(id)
			.then((res) => {
				if (res.status !== 204) {
					throw Error('User not deleted')
				}
			})
			.then(() => {
				const updated = characters.filter((character) => character.id !== id)
				setCharacters(updated)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	function updateList(person) {
		postUser(person)
			.then((res) => {
				if (res.status !== 201) {
					throw Error('User not added')
				}
				return res.json()
			})
			.then((user) => setCharacters([...characters, user]))
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<div className="container">
			<Table characterData={characters} removeCharacter={removeOneCharacter} />
			<Form handleSubmit={updateList} />
		</div>
	)
}
export default MyApp
