import Spinner from 'react-bootstrap/Spinner'
import AddNote from './AddNote';
import Note from './Note';

const NotesTable = ({notes, handleAddNote, handleDeleteNote}) => {
  	return (
    	<div>
      		<AddNote
        		handleAddNote={handleAddNote}
      		/>
      		{notes.Items && notes.Items.length > 0 ? (
        	<ul>
          		{notes.Items.map(item => (
            	<Note
              		note={item}
              		handleDeleteNote={handleDeleteNote}
            	/>
          		))}
        	</ul>
      		) : (
        	<Spinner animation="border" role="status">
        	  	<span className="visually-hidden">Loading...</span>
        	</Spinner>
      		)}
    	</div>
  	);
}

export default NotesTable;