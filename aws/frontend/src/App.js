import React from 'react';
import { useState, useEffect } from 'react';
import NotesTable from "./components/NotesTable";

const AWS_URL="https://su7hcjg6kg.execute-api.eu-central-1.amazonaws.com/prod"

const App = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNote = async () => {
            const requestOptions = {
                method: 'GET',
                headers: { 
                    'app_user_name': 'Test_user',
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(AWS_URL + '/notes', requestOptions);
            const result = await response.json();
            setNotes(result);
        };
        fetchNote();
    }, []);

    const handleRefresh = () => {
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
                'app_user_name': 'Test_user',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
    
        try {
            const response = await fetch(AWS_URL + '/note', requestOptions);
        } catch (error) {
            console.error(error);
        }
        handleRefresh();
    };

	const deleteNote =  async (time) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'app_user_name': 'Test_user',
                'Content-Type': 'application/json'
            },
        };
        
        try {
            const res = await fetch(AWS_URL + `/note/t/${time}`, requestOptions);
        } catch (error) {
            console.error(error);
        }
        handleRefresh();
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