import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

const AddNote = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const handleInputTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleInputCategory = (event) => {
        setCategory(event.target.value);
    }
    const handleInputDescription = (event) => {
        setDescription(event.target.value);
    }

    const [response, setResponse] = useState(null);


    const handlePostRequest = async () => {
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
      };

  return (
    <div className="note-new">
        <div className="note-header">
            <form>
                <textarea 
                    className="note-title-text"
                    type="text"
                    placeholder="Type a new note title ..."
                    value={title} 
                    onChange={handleInputTitle}
                />
            </form>
        </div>
        <div className="note-category">
            <form>
                <textarea 
                    className="note-category-text"
                    type="text"
                    placeholder="Type a category of your new note ..."
                    value={category} 
                    onChange={handleInputCategory}
                />
            </form>
        </div>
        <div className="note-description">
            <form>
                <textarea 
                    className="note-description-text"
                    type="text"
                    placeholder="Type a description of your new note ..."
                    value={description} 
                    onChange={handleInputDescription}
                />
            </form>
        </div>
        <Button className="add-note-button" onClick={handlePostRequest}>
            Add note
        </Button>
    </div>
      );
    };

export default AddNote;

/*


function NotesTable({handleDeleteNote}) {
function AddNote = ({ handleAddNote }) => {


	return (
		<div className='note new'>
			<textarea
				rows='8'
				cols='10'
				placeholder='Type to add a note...'
				value={noteText}
				onChange={handleChange}
			></textarea>
			<div className='note-footer'>
				<small>
					{characterLimit - noteText.length} Remaining
				</small>
				<button className='save' onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddNote;
*/