import SDK from "./api.ts";
try {
  const data = await SDK.getHome();
  console.log("Response:", data); 
  console.log("notes:", await SDK.getNotes())
} catch (err) {
  console.log((err as Error)?.message)
}