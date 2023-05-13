import React, { useState, useEffect } from 'react';
import Note from './Note';
import AddNote from './AddNote';

function NotesTable({handleDeleteNote}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'app_user_name': 'Test_user',
        'Content-Type': 'application/json'
      }
    };

    fetch('https://su7hcjg6kg.execute-api.eu-central-1.amazonaws.com/prod/notes', requestOptions)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <AddNote/>
      {data.Items && data.Items.length > 0 ? (
        <ul>
          {data.Items.map(item => (
            <Note
            title={item.title}
            category={item.category}
            description={item.description}
            time={item.time}
            handleDeleteNote={handleDeleteNote}
            />
          ))}
        </ul>
      ) : (
        <p>Brak danych</p>
      )}
    </div>
  );
}
export default NotesTable;