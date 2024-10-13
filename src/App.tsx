import { useUsers } from "./hooks/useUsers";
import { UsersTable } from "./components";
import { useRef } from "react";
import "./App.css";

export default function App() {
  const { users, error, isLoading, setUsers } = useUsers();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  let userIndex = -1;

  const handleShowForm = (uuid: string) => {
    userIndex = users?.findIndex((item) => item.login.uuid === uuid);
    dialogRef.current?.showModal();
  };

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userIndex === -1) return;
    const newUsers = [...users];
    const target = e.target as HTMLFormElement;
    // const newName = target.elements.namedItem("name") as HTMLInputElement; //get input element
    // newUsers[userIndex].name.first = newName.value;
    const formData = new FormData(target);
    const newName = formData.get("name");
    newUsers[userIndex].name.first = newName as string;
    setUsers(newUsers);
    target.reset(); // reset form
    dialogRef.current?.close();
  };

  // Ejemplo de envío con fetch
  //  fetch('https://ejemplo.com/api', {
  //   method: 'POST',
  //   body: formData
  // })
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error('Error:', error));

  return (
    <>
      <header>
        <h1 className="title">User's List 🙋🏻</h1>
      </header>

      <dialog className="modal" ref={dialogRef}>
        <form method="dialog" onSubmit={(e) => handleUpdateUser(e)}>
          <h2>Editar usuario</h2>
          <label htmlFor="name">
            Name:
            <input type="text" name="name" />
          </label>
          <button>Guardar</button>
        </form>
      </dialog>

      <main>
        {error && <p>{error.message}</p>}
        {isLoading && <p>Loading...</p>}
        {users?.length > 0 && (
          <UsersTable users={users} onShowForm={handleShowForm} />
        )}
      </main>
    </>
  );
}
