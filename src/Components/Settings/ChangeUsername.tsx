import { Component, createSignal } from 'solid-js';
import { changeUsername, getAccount } from '../../services/account.service';
import styles from './ChangeUsername.module.css';

const ChangeUsername: Component = () => {
  const [newUsername, setNewUsername] = createSignal('');
  const [currentUsername, setCurrentUsername] = createSignal('');

  const fetchAccount = async () => {
    const accountId = sessionStorage.getItem('accountId');
    if (!accountId) return;
    const response = await getAccount(parseInt(accountId));
    setCurrentUsername(response.userName);
  };
  fetchAccount();

  const handleChangeUsername = async () => {
    const accountId = sessionStorage.getItem('accountId');
    if (!accountId) {
      console.log('No accountId found in session storage');
      return;
    }

    try {
      await changeUsername(parseInt(accountId), newUsername());
      alert('Username updated successfully');
      // Optionally refresh the account data or clear the input field
      fetchAccount();
      setNewUsername('');
    } catch (error: any) {
      alert('Error updating Username: ' + error.message);
    }
  };

  return (
    <div class={styles.stnCard}>
      <div class={styles.stnHeader}>Change Username</div>
      <form class={styles.formHorizontal}>
        <div class={styles.stnInput}>
          <label for="currentUsername">Current Username</label>
          <input type="text" id="currentUsername" name="currentUsername" value={currentUsername()} disabled />
        </div>
        <div class={styles.stnInput}>
          <label for="newUsername">New Username</label>
          <input
            type="text"
            id="newUsername"
            name="newUsername"
            placeholder="New Username"
            value={newUsername()}
            onInput={(e) => setNewUsername(e.currentTarget.value)}
          />
        </div>
        <button type="button" onClick={handleChangeUsername}>
          Change Username
        </button>
      </form>
    </div>
  );
};

export default ChangeUsername;