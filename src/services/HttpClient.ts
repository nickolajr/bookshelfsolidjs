export const HttpClient = {
    async get<T>(url: string, options: RequestInit = {}): Promise<T> {
      const response = await fetch(url, { ...options, method: 'GET' });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
  
    async post<T>(url: string, body: any, options: RequestInit = {}): Promise<T> {
      const response = await fetch(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
  
    async put<T>(url: string, body: any, options: RequestInit = {}): Promise<T> {
      const response = await fetch(url, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
  
    async delete<T>(url: string, options: RequestInit = {}): Promise<T> {
      const response = await fetch(url, { ...options, method: 'DELETE' });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // Check if response body is empty before parsing as JSON
      if (response.status === 204) { // No Content
        return null as any; // or return an appropriate value for empty response
      }
      return await response.json();
    },
  };