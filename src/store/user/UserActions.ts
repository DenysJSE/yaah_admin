import AuthService from 'services/AuthService.ts';

interface IUserLogin {
  email: string;
  password: string;
}

interface IUserRegistration {
  email: string;
  password: string;
  nickname: string;
}

export const loginUser = async (credentials: IUserLogin) => {
  try {
    const response = await AuthService.login(credentials);
    localStorage.setItem('token', response.data.token);
    return { success: true, user: response.data.user };
  } catch (e) {
    console.error(e);
    return { success: false, error: e };
  }
};

export const registerUser = async (userData: IUserRegistration) => {
  try {
    const response = await AuthService.registration(userData);
    localStorage.setItem('token', response.data.token);
    return { success: true, user: response.data.user };
  } catch (e) {
    console.error(e);
    return { success: false, error: e };
  }
};