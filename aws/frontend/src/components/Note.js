import { MdDeleteForever } from 'react-icons/md';

const Note = () => {
	return (
		<div className="note">
            <div className="note-header">
                <h2 className="note-title" >
                    Tu będzie tytuł notatki
                </h2>
            </div>
            <div className="note-description">

            </div>
			<div className='note-footer'>
				<medium className='note-footer-date'>
                    12.05.2023
                </medium>
				<MdDeleteForever
					className="note-footer-delete-icon"
					size='2em'
				/>
			</div>
        </div>
	);
};

export default Note;