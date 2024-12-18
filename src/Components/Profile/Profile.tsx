import { Component, createSignal, Show } from 'solid-js';
import { getAccount, deleteAccount } from '../../services/account.service';
import { useNavigate } from 'solid-app-router';
import styles from './Profile.module.css';

const Profile: Component = () => {
  const navigate = useNavigate();
  const [account, setAccount] = createSignal({
    email: '',
    isAdmin: false,
    name: '',
    password: '',
    userName: ''
  });
  const [isOpen, setIsOpen] = createSignal(false);

  const fetchAccount = async () => {
    const accountId = sessionStorage.getItem('accountId');
    if (!accountId) return;
    const response = await getAccount(parseInt(accountId));
    setAccount(response);
  };

  const handleDeleteAccount = async () => {
    const accountId = sessionStorage.getItem('accountId');
    if (!accountId) return;
    await deleteAccount(parseInt(accountId));
    console.log('Account deleted');
    sessionStorage.clear();
    navigate('/login');
  };

  const toggleModal = () => {
    setIsOpen(!isOpen());
  };

  // Fetch account on component mount
  fetchAccount();

  return (
    <div>
      <h2>Account Information</h2>
      <p>Username: {account().userName}</p>
      <p>Name: {account().name}</p>
      <p>Email: {account().email}</p>

      <button onClick={toggleModal}>Delete Account</button>

      <Show when={isOpen()}>
        <div class={styles.modal}>
          <div class={styles.centerDiv}>
            <span class={styles.close} onClick={toggleModal}>×</span>
            <h2>Are you sure you want to delete your account?</h2>
            <button onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default Profile;