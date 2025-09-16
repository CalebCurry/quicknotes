import { useEffect, useState } from 'react'
import type { Collection } from '../sdk/api';
import CreatableSelect from 'react-select/creatable';
import SDK from '../sdk/api'

type Props = {
    value: number | null;
    onChange: (id: number | null) => void;
};

export default function Dropdown({value, onChange}: Props) {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>("");

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

    return <div>
        <CreatableSelect placeholder='Choose a collection' isClearable   
        value={ value ? 
            {
                value,
                label: collections.find((collection) => collection.id === value)?.name
            } : null
        }    
        options={collections.map((collection: Collection) => (
            {
            value: collection.id!,
            label: collection.name
            }
        ))}
        onChange={(data) => {
            setEditValue("");
            setShowModal(false);
            onChange(data?.value ?? null)
        }}
        
        onCreateOption={async (name) => {
            try {
                const newCollection = await SDK.createCollection({name});
                setCollections([...collections, newCollection]);
                onChange(newCollection.id!)
            } catch (err){
                console.log("Error creating collection", err)
            }
            console.log("CREATING!!", name)
        }} 
        
        ></CreatableSelect>
        <button onClick={() => {
            setEditValue(collections.find((collection) => collection.id === value)?.name ?? "")
            setShowModal(true)}
            }>Edit collection</button>
        { showModal && 
            <div>
                <input value={editValue} onChange={(e) => {setEditValue(e.target.value)}}/>
                <button onClick={async () => {
                    try {
                        await SDK.updateCollection(value!, {...collections.find((collection) => collection.id === value), name: editValue})
                        const data = await SDK.getCollections();
                        setCollections(data);
                        setShowModal(false)
                    } catch (err) {
                        console.log("something went wrong", err)
                    }

                }}>Save</button>
                <button onClick={() => {setShowModal(false)}}>Cancel</button>
                <button onClick={async () => {
                    try {
                        await SDK.deleteCollection(value!)
                        const data = await SDK.getCollections();
                        setCollections(data);
                        setShowModal(false);
                        onChange(null)
                    } catch (err) {
                        console.log("something went wrong", err)
                    }

                }}>Delete Collection</button>
            </div> }
    </div>
}