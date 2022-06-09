import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const usersCollectionRef = collection(db, "users");

  // CREATE
  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  // READ
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  // UPDATE
  const updateUser = async (age, id) => {
    const newField = { age: age + 1 };
    const existedDoc = doc(db, "users", id);
    await updateDoc(existedDoc, newField);
  };

  // DELETE
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  return (
    <div className="App">
      <input
        placeholder="type name"
        type="text"
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        placeholder="type age"
        type="number"
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>

      {users.map((user) => (
        <div>
          <h1>Name: {user.name}</h1>
          <h3>Age: {user.age}</h3>
          <button
            onClick={() => {
              updateUser(user.age, user.id);
            }}
          >
            update age
          </button>
          <button
            onClick={() => {
              deleteUser(user.id);
            }}
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
