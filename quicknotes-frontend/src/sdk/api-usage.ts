import SDK, { type Note, type Collection } from "./api.ts";

try {
  console.log("home:", await SDK.getHome());

  console.log("Register", await SDK.register({username: "test", password: "pass", email: "email@calebcurry.com"}));
  console.log("Login", await SDK.login({username: "test", password: "pass"}));


  console.log("collections:", await SDK.getCollections());
  console.log("notes:", await SDK.getNotes());

  // Create a collection
  const collection: Collection = await SDK.createCollection({ name: "My Test Collection" });
  console.log("createCollection:", collection);

  // Create a note in that collection
  const note: Note = {
    title: "This is a sample note",
    content: "This is a note body",
    collection: collection.id,
  };
  const createdNote = await SDK.createNote(note);
  console.log("createNote:", createdNote);

  // Get the note
  let fetchedNote = await SDK.getNote(createdNote.id!);
  console.log("getNote:", fetchedNote);

  // Update the note
  fetchedNote.title = "somethin new"
  fetchedNote = await SDK.updateNote(createdNote.id!, fetchedNote);
  console.log("updateNote:", fetchedNote);

  // Get notes by collection
  console.log("getNotesByCollection:", await SDK.getCollectionWithNotes(collection.id!));
  console.log("getNotesCollectionIdParam", await SDK.getNotes(null, {collection_id: collection.id!}))
  // Delete the note
  await SDK.deleteNote(createdNote.id!);
  console.log("deleteNote: success");

  // Delete the collection
  await SDK.deleteCollection(collection.id!);
  console.log("deleteCollection: success");
} catch (err) {
  if (err instanceof Error) {
    console.error("Error:", err.message);
  } else {
    console.error("Something went wrong");
  }
}
