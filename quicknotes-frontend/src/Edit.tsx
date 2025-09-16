import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SDK, { type Note } from './sdk/api'

export default function Edit(){
    const [note, setNote] = useState<Note | null>(null);
    const [noteOriginal, setNoteOriginal] = useState<Note | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    
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
            setNote({ title: "", content: ""})
        }
    }
    getNote();        
    }, [id]);


    return (
        <div  className='p-6 flex flex-col gap-2 p-6 flex flex-col max-w-screen-lg mx-auto'>
        { note ? 
        <div>
            <h1> {id ? "Edit Note" : "Create Note"}</h1>
            <input placeholder="example title" className='border min-w-80 min-h-10 p-2' value={note.title} onChange={(e) => { setNote({...note, title: e.target.value})}}></input>
            <br />
            <br />
            <textarea placeholder="example body" className='border min-w-150 min-h-50 p-2' value={note.content} onChange={(e) => {setNote({...note, content: e.target.value})} }></textarea>
            <br />
            <br />
            {JSON.stringify(note) !== JSON.stringify(noteOriginal) ? <button className='btn btn-ok' onClick={() => {
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
            <button className='btn btn-bad' onClick={() => {
                (async () => {
                    await SDK.deleteNote(note.id!);
                    navigate("/");
                })()
            }} >Delete</button>
        </div>
        : 
        <></>
        }
        <div>
        <button className='btn btn-ok w-39' onClick={() => {
            navigate("/")
        }}>Back</button>
        </div>
        </div>
    )
}