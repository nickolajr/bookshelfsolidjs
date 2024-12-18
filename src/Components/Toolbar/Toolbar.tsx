import { Component, createSignal, Show } from 'solid-js';
import { Link } from 'solid-app-router';
import styles from './Toolbar.module.css';

const Toolbar: Component = () => {
  const isLoggedIn = () => !!sessionStorage.getItem('accountId');

  const handleLogout = () => {
    sessionStorage.removeItem('accountId');
    window.location.href = '/login';
  };

  return (
    <div class={styles.toolbar} role="banner">
      <img
        src=""
        alt="logo"
        width="40"
      />

      <Link href="/" class={styles.link}>
        Bookshelf
      </Link>
      <div class={styles.spacer}>
        <Link class={styles.link} href="/profile">
          <span>Profile</span>
        </Link>

        <Link class={styles.link} href="/library">
          <span>Library</span>
        </Link>
      </div>
      <div class={styles.right}>
      <svg
  version="1.0"
  xmlns="http://www.w3.org/2000/svg"
  height="50"
  viewBox="0 0 600 400"
  preserveAspectRatio="xMidYMid meet"  // Corrected here
>
  <g transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
    <path
      d="M1510 2865 l0 -245 1410 0 1410 0 0 245 0 245 -1410 0 -1410 0 0 -245z"
    />
    <path
      d="M1510 2005 l0 -245 1410 0 1410 0 0 245 0 245 -1410 0 -1410 0 0 -245z"
    />
    <path
      d="M1510 1115 l0 -245 1410 0 1410 0 0 245 0 245 -1410 0 -1410 0 0 -245z"
    />
  </g>
</svg>

        <div class={styles.dropdownContent}>
          <Link href="/settings" class={styles.link}>
            Settings
          </Link>
          <br />
          <Link href="/help" class={styles.link}>
            Help
          </Link>
          <br />
          <Show when={!isLoggedIn()}>
            <Link href="/login" class={styles.link}>
              Login
            </Link>
            <br />
            <Link href="/register" class={styles.link}>
              Register
            </Link>
          </Show>
          <Show when={isLoggedIn()}>
            <button class={`${styles.link} ${styles.logoutBtn}`} onClick={handleLogout}>
              Logout
            </button>
          </Show>
          <p class={styles.subtext}>Made by TrickFire</p>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;