import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

const AddNote = ({handleAddNote}) => {
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

	const addNote = () => {
		handleAddNote(title, category, description);
	}
      
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
			<Button className="add-note-button" onClick={addNote}>
				Add note
			</Button>
		</div>
	);
};

export default AddNote;