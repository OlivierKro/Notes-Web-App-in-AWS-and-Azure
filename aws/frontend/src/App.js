import React from 'react';

import NotesTable from "./components/NotesTable";

const App = () => {

    


	const deleteNote =  async (time) => {
        console.log(time);
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
    };


    return (
        <div class="all-notes">
            <NotesTable
                handleDeleteNote={deleteNote}
            />
        </div>
    );
};

export default App;