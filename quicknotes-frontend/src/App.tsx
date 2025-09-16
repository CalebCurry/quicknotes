import { useEffect, useState } from 'react';
import SDK, {type Collection, type Note} from './sdk/api';
import CreatableSelect from 'react-select/creatable';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  const [selectedCollectionLabel, setSelectedCollectionLabel] = useState<string | null>(null);
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

  useEffect(() => {
    async function getCollections(){
      try {
        const data = await SDK.getCollections();
        console.log(data)
        setCollections(data)
      } catch (err){
        if (err instanceof Error){
          console.log(err.message)
        } else {
          console.log("Something went wrong")
        }
      }
    }

    getCollections();
  }, []);

  return (
    <div className='p-6 flex flex-col gap-6 max-w-screen-lg mx-auto'>
      <CreatableSelect  placeholder="Filter by collection" className='w-120' isClearable value={
      selectedCollectionId
    ? { value: selectedCollectionId, label: selectedCollectionLabel }
    : null 
      }
      
      onChange={(data) => {
        setSelectedCollectionId(data?.value ?? null)
        setSelectedCollectionLabel(data?.label ?? null)
      }} 
      
      onCreateOption={async (name) => {
        try {
          const newCollection = await SDK.createCollection({name});
          setCollections([...collections, newCollection]);
          setSelectedCollectionId(newCollection.id!)
          setSelectedCollectionLabel(newCollection.name)
        } catch (err){
          console.log("Error creating collection", err)
        }

        console.log("CREATING!!", name)
      }} 
      
      options={collections.map((collection: Collection) => (
        {
          value: collection.id!,
          label: collection.name
        }
        ))}>

      </CreatableSelect>
      <table >
        <thead>
          <tr>
          <th className='p-3 border'>ID</th>
          <th className='p-3 border'>Title</th>
          </tr>
        </thead>
        <tbody>
        {notes.map((note: Note) => {
          return <tr key={note.id}>
            <td className='p-3 border'>{note.id}</td>
            <td className='p-3 border'><Link to={`/edit/${note.id}`}>{note.title}</Link></td>
            
          </tr>
        })}
        </tbody>
      </table>
      <button className='btn w-40 btn-ok' onClick={() => {navigate('/edit')}}>+ New Note</button>
    </div>
  );
}

export default App
