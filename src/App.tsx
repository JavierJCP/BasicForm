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
    const newName = target.elements.namedItem("name") as HTMLInputElement;
    newUsers[userIndex].name.first = newName.value;
    setUsers(newUsers);
    target.reset();
    dialogRef.current?.close();
  };

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
