import Note from './Note';
import AddNote from './AddNote';

const NotesTable = ({data, handleAddNote, handleDeleteNote}) => {
  return (
    <div>
      <AddNote
        handleAddNote={handleAddNote}
      />
      {data.Items && data.Items.length > 0 ? (
        <ul>
          {data.Items.map(item => (
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