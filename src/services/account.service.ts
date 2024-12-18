import { HttpClient } from './HttpClient'; 
import { Account } from '../models/Account';
import { environment } from '../env';

interface ApiResponse {
  email: string;
  isAdmin: boolean;
  name: string;
  password: string;
  userName: string;
}

const apiUrl = environment.apiUrl + "Accounts/";

export const register = async (accountData: any): Promise<any> => {
  return await HttpClient.post<any>(`${apiUrl}Create`, accountData);
};

export const getAccount = async (id: number): Promise<ApiResponse> => {
  const body = JSON.stringify({ id: id });
  const headers = { 'content-type': 'application/json' };
  return await HttpClient.post<ApiResponse>(apiUrl + "GetAccInfo", body, { headers });
};

export const deleteAccount = async (id: number): Promise<ApiResponse> => {
  const headers = { 'content-type': 'application/json' };
  return await HttpClient.delete<ApiResponse>(`${apiUrl}DelAcc?id=${id}`, { headers });
};

export const changeEmail = async (accountId: number, newEmail: string): Promise<any> => {
  const headers = { 'content-type': 'application/json' };
  const body = { newEmail: newEmail };
  return await HttpClient.put<any>(`${apiUrl}ChangeEmail?accountId=${accountId}`, body, { headers });
};

export const changePassword = async (accountId: number, newPassword: string): Promise<any> => {
  const headers = { 'content-type': 'application/json' };
  const body = { newPassword: newPassword };
  return await HttpClient.put<any>(`${apiUrl}ChangePassword?accountId=${accountId}`, body, { headers });
};

export const changeUsername = async (accountId: number, newUsername: string): Promise<any> => {
  const headers = { 'content-type': 'application/json' };
  const body = { NewUsername: newUsername };
  return await HttpClient.put<any>(`${apiUrl}ChangeUsername?accountId=${accountId}`, body, { headers });
};