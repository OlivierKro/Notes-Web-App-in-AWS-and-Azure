import { MdDeleteForever } from 'react-icons/md';

const Note = ({note, handleDeleteNote}) => {
    const date = new Date(note.time * 1000)

	return (
		<div className="note">
            <div className="note-header">
                <h2 className="note-title" >
                    <p>{note.title}</p>
                </h2>
            </div>
            <div className="note-category">
                <p>Category:  {note.category}</p>
            </div>
            <div className="note-description">
                <p>{note.description}</p>
            </div>
			<div className='note-footer'>
                <p className='note-footer-date'>{date.toLocaleDateString()}</p>
				<MdDeleteForever
					className="note-footer-delete-icon"
					size='2em'
                    onClick={() => handleDeleteNote(note.time)}
				/>
			</div>
        </div>
	);
};

export default Note;