import React from 'react';
import { useState, useEffect } from 'react';
import NotesTable from "./components/NotesTable";

const App = ({url, username}) => {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		const fetchNote = async () => {
			const requestOptions = {
				method: 'GET',
				headers: { 
					'Username': username,
					'Content-Type': 'application/json'
				}
			};
			const response = await fetch(url + '/notes', requestOptions);
			const result = await response.json();
			setNotes(result);
		};
		fetchNote();
	}, []);

	const refreshApp = () => {
		window.location.reload();
	};

	const addNote = async (title, category, description) => {
		const body = {
			"Item": {
				"title": title,
				"category": category,
				"description": description,
			}
		};
		const requestOptions = {
			method: "POST",
			headers: { 
				'Username': username,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		};
	
		try {
			const response = await fetch(url + '/note', requestOptions);
		} catch (error) {
			console.error(error);
		}
		refreshApp();
	};

	const deleteNote =  async (time) => {
		const requestOptions = {
			method: 'DELETE',
			headers: { 
				'Username': username,
				'Content-Type': 'application/json'
			},
		};
		
		try {
			const res = await fetch(url + `/note/t/${time}`, requestOptions);
		} catch (error) {
			console.error(error);
		}
		refreshApp();
	};

	return (
		<div class="all-notes">
			<NotesTable
				notes={notes}
				handleAddNote={addNote}
				handleDeleteNote={deleteNote}
			/>
		</div>
	);
};

export default App;