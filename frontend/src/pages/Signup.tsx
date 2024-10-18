// src/pages/Signup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // react-iconsをインポート
import styles from '../styles/Signup.module.css';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local/register', {
                username,
                email,
                password,
            });

            const token = response.data.jwt;
            localStorage.setItem('jwt', token);

            alert('サインアップ成功');
            navigate('/reservations');
        } catch (err) {
            setError('サインアップに失敗しました。');
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className={styles.container}>
            <div className={styles.signupCard}>
                <h1 className={styles.title}>Sign Up</h1>
                <form onSubmit={handleSignup}>
                    <div className={styles.inputGroup}>
                        <FaUser className={styles.icon} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <FaEnvelope className={styles.icon} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className={styles.signupButton}>Sign Up</button>
                </form>
                <button onClick={handleLoginRedirect} className={styles.loginButton}>
                    Already have an account? Login
                </button>
            </div>
        </div>
    );
};

export default Signup;
