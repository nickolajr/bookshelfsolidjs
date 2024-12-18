import { Component } from 'solid-js';
import { Link, Outlet } from 'solid-app-router';
import styles from './Settings.module.css';

const Settings: Component = () => {
  return (
    <div>
      <div class={styles.stnContainer}>
        <div class={styles.stnMenu}>
          <Link href="/settings/change-email">Change Email</Link>
          <Link href="/settings/change-username">Change Username</Link>
          <Link href="/settings/change-password">Change Password</Link>
        </div>

        <div class={styles.stnCard}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Settings;