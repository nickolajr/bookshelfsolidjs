import { HttpClient } from './HttpClient'; // Your custom HttpClient
import { environment } from '../env';
import { Volume } from '../models/Volume';
import { VolProgress } from '../models/VolProgress';

const apiUrl = environment.apiUrl + "Volumes/";

export const getBookVolumes = async (bookId: number): Promise<Volume[]> => {
  return await HttpClient.get<Volume[]>(`${apiUrl}GetBookVol?BookId=${bookId}`);
};

export const createBookVolume = async (bookId: number, volNum: number): Promise<Volume> => {
  const body = JSON.stringify({
    bookId: bookId,
    volNumber: volNum
  });
  const headers = { 'content-type': 'application/json' };
  return await HttpClient.post<Volume>(`${apiUrl}CreateVol`, body, { headers });
};

export const getVolumeProgress = async (volumeId: number, accountId: number): Promise<VolProgress> => {
  try {
    return await HttpClient.get<VolProgress>(`${apiUrl}GetVolProgress?accountId=${accountId}&volId=${volumeId}`);
  } catch (error) {
    console.error({ GetError: error });
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const createVolumeProgress = async (volumeId: number, accountId: number, bookId: number): Promise<VolProgress | null> => {
  const body = JSON.stringify({
    volId: volumeId,
    accountId: accountId,
    bookId: bookId
  });
  const headers = { 'content-type': 'application/json' };
  try {
    return await HttpClient.post<VolProgress>(`${apiUrl}CreateVolProgress`, body, { headers });
  } catch (error) {
    console.error('Error creating volume progress:', error);
    return null;
  }
};

export const verifyVolumeProgress = async (volumeId: number, accountId: number, bookId: number): Promise<void> => {
  try {
    const response = await getVolumeProgress(volumeId, accountId);
    if (!response) {
      // If response is null or undefined, create new volume progress
      await createVolumeProgress(volumeId, accountId, bookId);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      console.log('Volume progress not found, creating new progress');
      await createVolumeProgress(volumeId, accountId, bookId);
    } else {
      console.error('Error verifying volume progress:', error);
    }
  }
};

export const updatePagesRead = async (progress: VolProgress): Promise<void> => {
  const body = JSON.stringify({
    bookId: progress.bookId,
    pagesRead: progress.pagesRead,
    volId: progress.volId,
    accountId: progress.accountId
  });
  const headers = { 'content-type': 'application/json' };
  await HttpClient.post(`${apiUrl}UpdPagesRead`, body, { headers });
};

export const updateTotalPages = async (progress: VolProgress, totalPages: number): Promise<void> => {
  const headers = { 'content-type': 'application/json' };
  await HttpClient.put(`${apiUrl}UpdTotalPages?bookId=${progress.bookId}&totalPages=${totalPages}&volId=${progress.volId}`, {}, { headers });
};