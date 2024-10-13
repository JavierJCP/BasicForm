import { User } from "../interfaces/user";
import "./styles/UsersTable.css";

interface Props {
  users: User[];
  onShowForm: (uuid: string) => void;
}

export function UsersTable({ users, onShowForm }: Props) {
  return (
    <table className="users__table">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acción</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.login.uuid} className="user__item">
            <td>
              <img src={user.picture.thumbnail} alt={user.name.first} />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => onShowForm(user.login.uuid)}>
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
