import { useEffect, useState } from 'react';
import UserService from 'services/UserService.ts';

interface IUser {
  id: number;
  nickname: string;
  email: string;
  password?: string
  coins: number;
  created_at: string
  roles: {
    id: number;
    value: string;
    description: string;
  }[];
}

export class InitialUser {
  id = 0;
  nickname = '';
  email = '';
  coins = 0;
  created_at = ''
  roles = [{
    id: 0,
    value: '',
    description: '',
  }];
}

export const useUser = () => {
  const [user, setUser] = useState<IUser>(new InitialUser());

  const getUser = async () => {
    try {
      const response = await UserService.getUser();
      setUser(response.data);
    } catch (error) {
      // Handle errors as needed
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { user, getUser };
};