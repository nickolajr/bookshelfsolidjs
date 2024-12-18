import { Component, createSignal, createResource, For, Show } from 'solid-js';
import { Book as BookModel } from '../../models/Book';
import { BookProgress } from '../../models/BookProgress';
import { VolProgress } from '../../models/VolProgress';
import { Volume } from '../../models/Volume';
import { getBookByTitle, addBook, getBookList, deleteBookFromLibrary } from '../../services/book.service';
import { getBookVolumes, createBookVolume, getVolumeProgress, updatePagesRead, updateTotalPages, verifyVolumeProgress } from '../../services/volume.service';
import styles from './Book.module.css';
import { createStore } from 'solid-js/store';

interface BookList {
  progress: BookProgress;
  book: BookModel;
}

interface BookComponentProps {}

const Book: Component<BookComponentProps> = () => {
  const [title, setTitle] = createSignal('');
  const [pagesRead, setPagesRead] = createSignal(0);
  const [totalPages, setTotalPages] = createSignal(0);

  const [booklist] = createResource(
    () => title(),
    async (title) => {
      if (!title) return [];
      const response = await getBookByTitle(title);
      return [response.data.Media];
    }
  );

  const [accountId, setAccountId] = createSignal<string | null>(sessionStorage.getItem('accountId'));

  const [library, { refetch: refetchLibrary }] = createResource(
    () => accountId(),
    async (accountId) => {
      if (!accountId) return []; // This is correct
      const response = await getBookList(accountId);
      return response.response; // <-- Access the actual array within the response
    },
    { initialValue: [] }
  );

  const [selectedBook, setSelectedBook] = createSignal<BookModel | null>(null);
  const [selectedVolume, setSelectedVolume] = createSignal<Volume | null>(null);
  const [showModal, setShowModal] = createSignal(false);

  const [volumeProgressMap, setVolumeProgressMap] = createStore<Record<number, VolProgress>>({});

  const toggleDetails = (book: BookModel) => {
    if (showModal()) return;
    const bookWithVolumes: BookModel = { ...book, volumes: book.volumes || [] };
    setSelectedBook(bookWithVolumes);
    setShowModal(true);
    fetchBookVolumes(book.id);
  };

  const closeDetails = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const toggleVolume = (volume: Volume) => {
    setSelectedVolume(volume);
  };

  const handleTitleChange = (event: Event) => {
    setTitle((event.target as HTMLInputElement).value);
  };

  const handlePagesReadChange = (event: Event) => {
    setPagesRead(parseInt((event.target as HTMLInputElement).value, 10));
  };

  const handleTotalPagesChange = (event: Event) => {
    setTotalPages(parseInt((event.target as HTMLInputElement).value, 10));
  };

  const handleAddBook = async (book: BookModel) => {
    const id = accountId();
    if (!id) {
      console.log('No accountId found in session storage');
      return;
    }
    try {
      await addBook(book, parseInt(id, 10));
      refetchLibrary();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleDeleteBook = async (bookId: number) => {
    const id = accountId();
    if (!id) {
      console.log('No accountId found in session storage');
      return;
    }
    try {
      await deleteBookFromLibrary(parseInt(id, 10), bookId);
      refetchLibrary();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const fetchBookVolumes = async (bookId: number) => {
    try {
      const volumes = await getBookVolumes(bookId);

      await Promise.all(volumes.map(async (volume: Volume) => {
        const id = accountId();
        if (!id) {
          return;
        }
        const accountIdNum = parseInt(id, 10);
        await verifyVolumeProgress(volume.volumeId, accountIdNum, bookId);
        const volProgress = await getVolumeProgress(volume.volumeId, accountIdNum);
        setVolumeProgressMap({ [volProgress.volId]: volProgress });
      }));

      setSelectedBook((prevBook: BookModel | null) => {
        if (!prevBook) return null;
        const updatedBook: BookModel = {
          ...prevBook,
          volumes: volumes as Volume[],
        };
        return updatedBook;
      });

    } catch (error) {
      console.error("Error fetching book volumes:", error);
    }
  };

  const handleCreateBookVolume = async (bookId: number) => {
    const volumes = selectedBook()?.volumes;
    const volumeAmount = volumes ? volumes.length : 0;
    if (volumeAmount < 0) return;
    const volNumber = volumeAmount + 1;

    try {
      await createBookVolume(bookId, volNumber);
      fetchBookVolumes(bookId);
    } catch (error) {
      console.error("Error creating book volume:", error);
    }
  };

  const getPagesRead = (volumeId: number): number => {
    return volumeProgressMap[volumeId]?.pagesRead || 0;
  };

  const handleUpdatePagesRead = async (volumeId: number) => {
    const progress = volumeProgressMap[volumeId];
    if (!progress) return;
    progress.pagesRead = pagesRead();

    try {
      await updatePagesRead(progress);
      const currentBook = selectedBook();
      if (currentBook) fetchBookVolumes(currentBook.id);
    } catch (error) {
      console.error('Error updating pages read:', error);
    }
  };

  const handleUpdateTotalPages = async (volumeId: number) => {
    const progress = volumeProgressMap[volumeId];
    if (!progress) return;

    try {
      await updateTotalPages(progress, totalPages());
      const currentBook = selectedBook();
      if (currentBook) fetchBookVolumes(currentBook.id);
    } catch (error) {
      console.error('Error updating total pages:', error);
    }
  };


  return (
    <div class={styles.centerDiv}>
      <h1>Book List</h1>
  
      {/* Search */}
      <div class={styles.search}>
        <label>Enter Title</label>
        <input type="text" onInput={handleTitleChange} /><br />
        <button onClick={() => { /* Trigger fetching by updating a signal used in createResource */ }}>Test</button><br />
        <table class={styles.centerDiv}>
          <tbody>
            <For each={booklist()}>
              {(book) => (
                <tr>
                  <td>
                    <button onClick={() => toggleDetails(book)}>
                      <img src={book.coverImage?.large} alt="Book cover" />
                      <div>
                        {book.title.english || book.title.romaji}
                      </div>
                    </button>
  
                    <Show when={selectedBook() && showModal() && selectedBook()?.id === book.id}>
                      <div class={styles.modal}>
                        <div class={styles.modalContent}>
                          <span class={styles.close} onClick={closeDetails}>×</span>
                          <div class={styles.modalHeader}>
                            <button onClick={() => handleAddBook(book)}>Add To Library</button>
                            <h3>{book.title.english || book.title.romaji}</h3>
                          </div>
                        </div>
                      </div>
                    </Show>
                  </td>
                </tr>
              )}
            </For>
  
            <Show when={!booklist.loading && (booklist() || []).length === 0}>
              <tr>
                <td><h2>No books found</h2></td>
              </tr>
            </Show>
  
            <Show when={booklist.loading}>
              <tr>
                <td><div>Loading books...</div></td>
              </tr>
            </Show>
          </tbody>
        </table>
      </div>
  
      {/* Library */}
      <div>
        <h1>Library</h1>
        <Show when={!sessionStorage.getItem('accountId')}>
          <h2>Please log in to view your library</h2>
        </Show>
  
        <Show when={!!sessionStorage.getItem('accountId')}>
          <table class={styles.centerDiv}>
            <tbody>
              <For each={library() || []}>
                {(lib) => (
                  <tr>
                    <td>
                      <button onClick={() => toggleDetails(lib.book)}>
                        <img src={lib.book.coverImage.large} alt="Book cover" />
                        <div>
                          {lib.book.title.english || lib.book.title.romaji}
                        </div>
                      </button>
  
                      <Show when={selectedBook() && showModal() && selectedBook()?.id === lib.book.id}>
                        <div class={styles.modal}>
                          <div class={styles.modalContent}>
                            <span class={styles.close} onClick={closeDetails}>×</span>
                            <div class={styles.modalHeader}>
                              <h2>{selectedBook()?.title.english || selectedBook()?.title.romaji}</h2>
                              <h2>Volumes read: {lib.progress.volumesRead}</h2>
  
                              {/* Create Volume */}
                              <div class={styles.createVolume}>
                                <button onClick={() => handleCreateBookVolume(lib.book.id)}>Create Volume</button><br />
                              </div>
  
                              {/* List Volumes */}
                              <For each={selectedBook()?.volumes || []}>
                                {(volume) => (
                                  <div class={styles.volume}>
                                    <button class={styles.fancyButton} onClick={() => toggleVolume(volume)}>
                                      Volume {volume.volNumber}
                                    </button>
  
                                    <Show when={selectedVolume()?.volumeId === volume.volumeId}>
                                      <p class={styles.volumeHeader}>Statistics</p>
                                      <p>Pages read: {getPagesRead(volume.volumeId)}</p>
                                      <p>Total pages: {volume.totalPages}</p>
  
                                      <div class={styles.updatePages}>
                                        <label>Pages Read</label>
                                        <input placeholder={getPagesRead(volume.volumeId).toString()} type="number" onInput={handlePagesReadChange} /><br />
                                        <button onClick={() => handleUpdatePagesRead(volume.volumeId)}>Update</button><br />
                                      </div>
  
                                      <div class={styles.updatePages}>
                                        <label>Total Pages</label>
                                        <input placeholder={volume.totalPages.toString()} type="number" onInput={handleTotalPagesChange} /><br />
                                        <button onClick={() => handleUpdateTotalPages(volume.volumeId)}>Update</button><br />
                                      </div>
                                    </Show>
                                  </div>
                                )}
                              </For>
  
                              <button onClick={() => handleDeleteBook(lib.book.id)}>Delete Book</button>
                            </div>
                          </div>
                        </div>
                      </Show>
                    </td>
                  </tr>
                )}
              </For>
  
              <Show when={!library.loading && (library() || []).length === 0}>
                <tr>
                  <td><h2>No books found in library</h2></td>
                </tr>
              </Show>
  
              <Show when={library.loading}>
                <tr>
                  <td><div>Loading library...</div></td>
                </tr>
              </Show>
            </tbody>
          </table>
        </Show>
      </div>
    </div>
  );
  
};

export default Book;