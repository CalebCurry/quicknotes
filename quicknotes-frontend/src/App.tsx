import { useEffect, useState } from 'react';
import SDK, {type Note} from './sdk/api';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from './components/Dropdown'

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    async function getNotes(){
      try {
        const data = await SDK.getNotes(selectedCollectionId ? {collection_id: selectedCollectionId} : {});
        console.log(data)
        setNotes(data)
      } catch (err){
        if (err instanceof Error){
          console.log(err.message)
        } else {
          console.log("Something went wrong")
        }
      }
    }

    getNotes();
  }, [selectedCollectionId]);

  return (
    <div>
      <Dropdown value={selectedCollectionId} onChange={setSelectedCollectionId}/>
 
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
          <th>ID</th>
          <th>Title</th>
          </tr>
        </thead>
        <tbody>
        {notes.map((note: Note) => {
          return <tr key={note.id}>
            <td>{note.id}</td>
            <td><Link to={`/edit/${note.id}`}>{note.title}</Link></td>
          </tr>
        })}
        </tbody>
      </table>
      <button onClick={() => {navigate('/edit', { state: {collectionId: selectedCollectionId}})}}>+ New Note</button>
    </div>
  );
}

export default App
