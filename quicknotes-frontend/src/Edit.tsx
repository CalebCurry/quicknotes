import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SDK, { type Note } from './sdk/api'
import Dropdown from './components/Dropdown'
import { useLocation } from 'react-router-dom'

export default function Edit(){
    const [note, setNote] = useState<Note | null>(null);
    const [noteOriginal, setNoteOriginal] = useState<Note | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const collectionId = location.state?.collectionId;
    
    useEffect(() => {
    async function getNote(){
        if (id) {
            try {
                const data = await SDK.getNote(Number(id));
                setNote(data)
                setNoteOriginal(data)
            } catch (err){
                if (err instanceof Error){
                console.log(err.message)
                } else {
                console.log("Something went wrong")
                }
            }
        } else {
            setNote({ title: "", content: "", collection: collectionId})
        }
    }
    getNote();        
    }, [id, collectionId]);


    return (
        <div>
        { note ? 
        <div>
            <h1> {id ? "Edit Note" : "Create Note"}</h1>
            <input value={note.title} onChange={(e) => { setNote({...note, title: e.target.value})}}></input>
            <br />
            <br />
            <textarea value={note.content} onChange={(e) => {setNote({...note, content: e.target.value})} }></textarea>
            <br />
            <br />

            <Dropdown onChange={(id) => {setNote({...note, collection:id})}} value={note.collection ?? null}/>

            {JSON.stringify(note) !== JSON.stringify(noteOriginal) ? <button onClick={() => {
                if (id) {
                    (async () => {
                        const updatedNote = await SDK.updateNote(note.id!, note);
                        setNote(updatedNote);
                        setNoteOriginal(updatedNote);
                    })()
                } else {
                     (async () => {
                        const createdNote = await SDK.createNote(note);
                        setNote(createdNote);
                        setNoteOriginal(createdNote);
                        navigate(`/edit/${createdNote.id}`);
                    })()
                }

            }}>Save</button>: <></>}
            <button onClick={() => {
                (async () => {
                    await SDK.deleteNote(note.id!);
                    navigate("/");
                })()
            }} >Delete</button>
        </div>
        : 
        <></>
        }
        <button onClick={() => {
            navigate("/")
        }}>Back</button>
        </div>
    )
}