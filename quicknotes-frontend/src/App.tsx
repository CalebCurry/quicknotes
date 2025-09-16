import { useEffect, useState, useCallback } from 'react';
import SDK, {type Note} from './sdk/api';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from './components/Dropdown'

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const getNotes = useCallback(async function getNotes(url: string | null = null){
    try {
      const response = await SDK.getNotes(url, selectedCollectionId ? {collection_id: selectedCollectionId} : {});
      console.log(response);
      setNext(response.next);
      setPrev(response.previous);
      setNotes(response.data);
    } catch (err){
      if (err instanceof Error){
        console.log(err.message)
      } else {
        console.log("Something went wrong")
      }
    }
  }, [selectedCollectionId]);
  

  useEffect(() => {
    getNotes();
  }, [selectedCollectionId, getNotes]);

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
      {prev && <button onClick={() => {getNotes(prev)}}>←</button>}
      {next && <button onClick={() => {getNotes(next)}}>→</button>}
      <button onClick={() => {navigate('/edit', { state: {collectionId: selectedCollectionId}})}}>+ New Note</button>
    </div>
  );
}

export default App
