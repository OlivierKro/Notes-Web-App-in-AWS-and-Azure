import Note from './Note';
import AddNote from './AddNote';

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
        <p>Brak danych</p>
      )}
    </div>
  );
}
export default NotesTable;