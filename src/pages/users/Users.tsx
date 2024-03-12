import './Users.css'

import { useEffect, useState } from 'react';

import UserService from 'services/UserService.ts';
import UserCard from './components/card/UserCard.tsx';

interface IUsers {
  id: number;
  nickname: string;
  email: string;
  coins: number;
  roles: {
    id: number;
    value: string;
    description: string;
  }[];
}

interface IUsersComponent {
  setPath: (path: string) => void
}

function Users({setPath}: IUsersComponent) {
  const [users, setUsers] = useState<IUsers[] | null>(null);

  useEffect(() => {
    getUsers()
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.getAllUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='users-page'>
      <div className='users-page-list'>
        {users?.map(user => (
          <UserCard
            user={user}
            setPath={setPath}
            key={user.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Users