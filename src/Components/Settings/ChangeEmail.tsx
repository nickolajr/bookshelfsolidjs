import { Component, createSignal } from 'solid-js';
import { changeEmail, getAccount } from '../../services/account.service';
import styles from './ChangeEmail.module.css';

const ChangeEmail: Component = () => {
  const [newEmail, setNewEmail] = createSignal('');
  const [currentEmail, setCurrentEmail] = createSignal('');

  const fetchAccount = async () => {
    const accountId = sessionStorage.getItem('accountId');
    if (!accountId) return;
    const response = await getAccount(parseInt(accountId));
    setCurrentEmail(response.email);
  };
  fetchAccount();

  const handleChangeEmail = async () => {
    const accountId = sessionStorage.getItem('accountId');
    if (!accountId) {
      console.log('No accountId found in session storage');
      return;
    }

    try {
      await changeEmail(parseInt(accountId), newEmail());
      alert('Email updated successfully');
      // Optionally refresh the account data or clear the input field
      fetchAccount();
      setNewEmail('');
    } catch (error: any) {
      alert('Error updating email: ' + error.message);
    }
  };

  return (
    <div class={styles.stnCard}>
      <div class={styles.stnHeader}>Change Email</div>
      <form class={styles.formHorizontal}>
        <div class={styles.stnInput}>
          <label for="currentEmail">Current Email</label>
          <input type="text" id="currentEmail" name="currentEmail" value={currentEmail()} disabled />
        </div>
        <div class={styles.stnInput}>
          <label for="newEmail">New Email</label>
          <input
            type="text"
            id="newEmail"
            name="newEmail"
            placeholder="New Email"
            value={newEmail()}
            onInput={(e) => setNewEmail(e.currentTarget.value)}
          />
        </div>
        <button type="button" onClick={handleChangeEmail}>
          Change Email
        </button>
      </form>
    </div>
  );
};

export default ChangeEmail;