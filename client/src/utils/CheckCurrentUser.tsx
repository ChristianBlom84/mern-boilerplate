import axios from 'axios';
import { User } from '../types/interfaces';

export const checkCurrentUser = async (): Promise<User | undefined> => {
  try {
    const user = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/users/current`
    );

    return user.data.user;
  } catch (error) {
    console.error(error.message);
  }
};
