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

    return <CreatableSelect placeholder='Filter by Collection' isClearable   
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
}