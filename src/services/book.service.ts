import { HttpClient } from './HttpClient'; // Your custom HttpClient
import { environment } from '../env';
import { Book } from '../models/Book';
import { BookProgress } from '../models/BookProgress';

interface ApiResponse {
  data: {
    Media: Book;
  };
}

interface BookListResponse {
  response: {
    progress: BookProgress;
    book: Book;
  }[]; 
}

const apiUrl = environment.apiUrl + "Books/";

export const getBookByTitle = async (title: string): Promise<ApiResponse> => {
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify(title);
  return await HttpClient.post<ApiResponse>(apiUrl + "GetBookByTitle", body, { headers });
};

export const getBookList = async (accountId: string): Promise<BookListResponse> => {
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify({ id: accountId });
  return await HttpClient.post<BookListResponse>(apiUrl + "GetBookList", body, { headers });
};

export const addBook = async (book: Book, accountId: number): Promise<ApiResponse> => {
  const headers = { 'content-type': 'application/json' };
  const newBook = {
    id: book.id,
    title: book.title.english || book.title.romaji,
    description: "",
    author: "",
    volumes: 0,
    pages: 0,
    coverImage: book.coverImage.large
  };
  const body = JSON.stringify({ AccountId: accountId, book: newBook });
  return await HttpClient.post<ApiResponse>(apiUrl + "DbAddBook", body, { headers });
};

export const deleteBookFromLibrary = async (accountId: number, bookId: number): Promise<void> => {
  await HttpClient.delete(`${apiUrl}DelBook?accountId=${accountId}&bookId=${bookId}`);
};