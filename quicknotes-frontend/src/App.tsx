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
      const response = await SDK.getNotes(url, selectedCollectionId ? {collection_id: selectedCollectionId, page_size: 10} : {page_size: 10});
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
    <div className="p-6 flex flex-col gap-6 max-w-screen-lg mx-auto">
      <Dropdown value={selectedCollectionId} onChange={setSelectedCollectionId}/>
      <div>
      <table className="w-full">
        <thead>
          <tr>
          <th className="border p-3 w-24">ID</th>
          <th className="border p-3">Title</th>
          </tr>
        </thead>
        <tbody>
        {notes.map((note: Note) => {
          return <tr key={note.id}>
            <td className="border p-3">{note.id}</td>
            <td className="border p-3"><Link to={`/edit/${note.id}`}>{note.title}</Link></td>
          </tr>
        })}
        </tbody>
      </table>
      </div>
      <div className="flex justify-left">

        <button className="btn btn-ok w-40" onClick={() => {navigate('/edit', { state: {collectionId: selectedCollectionId}})}}>+ New Note</button>
        {prev ? 
          <button className="btn btn-ok w-40" onClick={() => {getNotes(prev)}}>←</button> : 
          <button disabled className="btn btn-disabled w-40">←</button>}
        {next ? 
          <button className="btn btn-ok w-40" onClick={() => {getNotes(next)}}>→</button> :
          <button disabled className="btn btn-disabled w-40">→</button>
        }

      </div>

     
    </div>
  );
}

export default App
