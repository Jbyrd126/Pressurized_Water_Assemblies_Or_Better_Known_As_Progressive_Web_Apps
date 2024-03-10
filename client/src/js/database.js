import { openDB } from "idb";

const initdb = async () =>
  // Creates a new database named 'kitties' which will be using version 1 of the database.
  openDB("pwa", 1, {
    // Adds database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains("pwa")) {
        console.log("Database for P.W.A already exists");
        return;
      }
      // Creates a new object store for the data and gives it a key name of 'id' which increments automatically.
      db.createObjectStore("pwa", { keyPath: "id", autoIncrement: true });
      console.log("Database for P.W.A. has been created");
    },
  });

// Exports a function to POST to the database.
export const putDb = async (content) => {
  console.log("Post to the database");

  // Creates a connection to the pwa database and version.
  const pwaDb = await openDB("pwa", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = pwaDb.transaction("pwa", "readwrite");

  // Opens up the desired object store.
  const store = tx.objectStore("pwa");

  // Uses the .put() method on the store and passes in the content.
  const request = store.put({ id: 1, pwa: content });

  // Gets confirmation of the request.
  const result = await request;
  console.log("Data saved to the database:", result.values);
};

// Exports a function to get the database.
export const getDb = async () => {
  console.log("Get all notes from the database");

  // Creates a connection to the pwa database and version.
  const pwaDb = await openDB("pwa", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = pwaDb.transaction("pwa", "readonly");

  // Opens up the desired object store.
  const store = tx.objectStore("pwa");

  // Uses the .get(1) method to retrieve the value of the first record matching the query.

  const request = store.get(1);

  // Gets confirmation of the request.
  const result = await request;
  result
    ? console.log("Notes retrieved from database:", result.pwa)
    : console.log("No notes found in database!");
  return result?.pwa;
};

// Starts database
initdb();
