import { useEffect, useState } from 'react'
import type { Collection } from '../sdk/api';
import CreatableSelect from 'react-select/creatable';
import SDK from '../sdk/api'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

type Props = {
    value: number | null;
    onChange: (id: number | null) => void;
};

export default function Dropdown({value, onChange}: Props) {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>("");
    const [editValueOriginal, setEditValueOriginal] = useState<string>("");

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
        <div className="flex justify-left">
            
        <CreatableSelect className="w-120 mr-1" placeholder='Choose a collection' isClearable   
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
        { value && <button className="btn btn-ok" onClick={() => {
            const val = collections.find((collection) => collection.id === value)?.name ?? ""
            setEditValue(val)
            setEditValueOriginal(val)
            setShowModal(true)}
            }>Edit collection</button> }
        </div>

        { showModal && 
            <div>
            <Dialog open={showModal} onClose={setShowModal} className="relative z-10">
                <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                    <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                                <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-400" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <DialogTitle as="h3" className="text-base font-semibold text-white">
                                Edit Collection
                                </DialogTitle>
                                <div className="mt-2">
                                <p className="text-sm text-gray-400">
                                    <input className="border min-w-80 min-h-10 p-2 my-2 text-white" value={editValue} onChange={(e) => {setEditValue(e.target.value)}}/>
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        {JSON.stringify(editValue) !== JSON.stringify(editValueOriginal) && <button
                        type="button"
                        onClick={async () => {
                            try {
                                await SDK.updateCollection(value!, {...collections.find((collection) => collection.id === value), name: editValue})
                                const data = await SDK.getCollections();
                                setCollections(data);
                                setShowModal(false)
                            } catch (err) {
                                console.log("something went wrong", err)
                            }
                        }}
                        className="btn btn-ok px-3 mx-1"
                        >
                        Save
                        </button> } 
                        <button
                        type="button"
                        data-autofocus
                        onClick={() => setShowModal(false)}
                        className="btn btn-ok px-3 mx-1">
                        Cancel
                        </button>
                        <button
                        type="button"
                        data-autofocus
                        onClick={async () => {
                            try {
                                await SDK.deleteCollection(value!)
                                const data = await SDK.getCollections();
                                setCollections(data);
                                setShowModal(false);
                                onChange(null)
                            } catch (err) {
                                console.log("something went wrong", err)
                            }
                        }}
                        className="btn btn-bad px-3 mx-1">
                        Delete Collection
                        </button>
                    </div>
                    </DialogPanel>
                </div>
                </div>
            </Dialog>
            </div>
        }
    </div>
}