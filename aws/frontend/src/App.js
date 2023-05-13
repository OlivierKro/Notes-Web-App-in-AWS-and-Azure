import React from 'react';
import { useState, useEffect } from 'react';
import NotesTable from "./components/NotesTable";

const App = () => {

    const [data, setData] = useState([]);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET',
                headers: { 
                'app_user_name': 'Test_user',
                'Content-Type': 'application/json'
                }
            };
            const response = await fetch('https://su7hcjg6kg.execute-api.eu-central-1.amazonaws.com/prod/notes', requestOptions);
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);

    const handleRefresh = () => {
        window.location.reload();
      };

    const addNote = async (title, category, description) => {
        const url = "https://su7hcjg6kg.execute-api.eu-central-1.amazonaws.com/prod/note";
        const headers = {
            'app_user_name': 'Test_user',
            'Content-Type': 'application/json'
        };
        const body = {
            "Item": {
                "title": title,
                "category": category,
                "description": description,
            }
        };
    
        try {
            const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });
            const data = await response.json();
            setResponse(data);
        } catch (error) {
            console.error(error);
        }
        handleRefresh();
    };

	const deleteNote =  async (time) => {
        const url = `https://su7hcjg6kg.execute-api.eu-central-1.amazonaws.com/prod/note/t/${time}`;
        const headers = {
            'app_user_name': 'Test_user',
            'Content-Type': 'application/json'
        };
        try {
            const res = await fetch(url, {
                method: 'DELETE',
                headers: headers
            });
        } catch (error) {
            console.error(error);
        }
        handleRefresh();
    };



    return (
        <div class="all-notes">
            <NotesTable
                data={data}
                handleAddNote={addNote}
                handleDeleteNote={deleteNote}
            />
        </div>
    );
};

export default App;