import { useState, useEffect } from "react";
import { getUsers } from "../services/getUsers";
import { User } from "../interfaces/user";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((newUsers) => setUsers(newUsers))
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    users,
    error,
    isLoading,
    setUsers,
  };
}
