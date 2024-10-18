// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // react-iconsをインポート
import styles from '../styles/Login.module.css'; // CSSファイルを読み込み

const Login: React.FC = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier,
                password,
            });

            const token = response.data.jwt;
            localStorage.setItem('jwt', token);

            alert('ログイン成功');
            navigate('/reservations');
        } catch (err) {
            setError('ログインに失敗しました。');
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/signup');
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <h1 className={styles.title}>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <FaEnvelope className={styles.icon} />
                        <input
                            type="text"
                            placeholder="Email or Username"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <FaLock className={styles.icon} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.loginButton}>Login</button>
                </form>
                <button onClick={handleSignUpRedirect} className={styles.signUpButton}>
                    Don't have an account? Sign Up
                </button>
            </div>
        </div>
    );
};

export default Login;
