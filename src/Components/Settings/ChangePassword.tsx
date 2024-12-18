import { Component, createSignal } from 'solid-js';
import { changePassword, getAccount } from '../../services/account.service';
import styles from './ChangePassword.module.css';

const ChangePassword: Component = () => {
  const [newPassword, setNewPassword] = createSignal('');
  const [currentPassword, setCurrentPassword] = createSignal('');

  const fetchAccount = async () => {
    const accountId = sessionStorage.getItem('accountId');
    if (!accountId) return;
    const response = await getAccount(parseInt(accountId));
  };
  fetchAccount();

  const handleChangePassword = async () => {
    const accountId = sessionStorage.getItem('accountId');
    if (!accountId) {
      console.log('No accountId found in session storage');
      return;
    }

    try {
      await changePassword(parseInt(accountId), newPassword());
      alert('Password updated successfully');
      // Optionally refresh the account data or clear the input field
      fetchAccount();
      setNewPassword('');
    } catch (error: any) {
      alert('Error updating Password: ' + error.message);
    }
  };

  return (
    <div class={styles.stnCard}>
      <div class={styles.stnHeader}>Change Password</div>
      <form class={styles.formHorizontal}>
        <div class={styles.stnInput}>
          <label for="currentPassword">Current Password</label>
          <input type="password" id="currentPassword" name="currentPassword" value={currentPassword} disabled />
        </div>
        <div class={styles.stnInput}>
          <label for="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="New Password"
            value={newPassword()}
            onInput={(e) => setNewPassword(e.currentTarget.value)}
          />
        </div>
        <button type="button" onClick={handleChangePassword}>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;