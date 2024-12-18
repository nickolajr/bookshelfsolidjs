import { HttpClient } from './HttpClient'; // Your custom HttpClient
import { environment } from '../env';

const apiUrl = environment.apiUrl + "Accounts/";

export const login = async (username: string, password: string): Promise<any> => {
  const url = `${apiUrl}login?userName=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  return await HttpClient.get<any>(url);
};