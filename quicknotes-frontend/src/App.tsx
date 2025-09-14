import { useEffect, useState } from 'react';
import SDK, {type Collection, type Note} from './sdk/api';
import CreatableSelect from 'react-select/creatable';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  const [selectedCollectionLabel, setSelectedCollectionLabel] = useState<string | null>(null);

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
    <div>
      <CreatableSelect isClearable value={
         {
          value: selectedCollectionId,
          label: selectedCollectionLabel
          }
      }
      
      onChange={(data) => {
        setSelectedCollectionId(data?.value ?? null)
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
            <td>{note.title}</td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
  );
}

export default App
