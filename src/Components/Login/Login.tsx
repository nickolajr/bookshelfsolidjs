import { createSignal } from 'solid-js';
import { useNavigate } from 'solid-app-router';
import styles from './Login.module.css';
import { login } from '../../services/login.service';

export default function Login() {
  const [userName, setUserName] = createSignal('');
  const [password, setPassword] = createSignal('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = await login(userName(), password());
    if (data.accountId) {
      sessionStorage.setItem('accountId', data.accountId);
      navigate('/library');
    } else {
      console.log(data);
      alert('Login failed');
    }
  };

  return (
    <div class={styles.loginContainer}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={userName()}
        onInput={(e) => setUserName(e.currentTarget.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}