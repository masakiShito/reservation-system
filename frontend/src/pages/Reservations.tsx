// src/pages/Reservations.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import styles from '../styles/Reservations.module.css';
import api from "../services/api";

interface Reservation {
    id: number;
    checkInDate: string;
    checkOutDate: string;
    email: string;
    name: string;
    numberOfGuests: number;
    notes?: string;
}

const Reservations: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigateを使用

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const token = localStorage.getItem('jwt'); // ローカルストレージからJWTトークンを取得
                console.log('Token:', token);
                const response = await api.get('/api/my-reservations', {
                    headers: {
                        Authorization: `Bearer ${token}`, // 認証ヘッダーを設定
                    },
                });

                console.log('Fetched reservations:', response.data);
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    const handleCreateReservation = () => {
        navigate('/create-reservation'); // /create-reservationに遷移
    };

    return (
        <div className={styles.container}>
            <h1>My Reservations</h1>
            <button className={styles.createButton} onClick={handleCreateReservation}>
                Create New Reservation
            </button>
            {error && <p className={styles.error}>{error}</p>}
            {reservations.length > 0 ? (
                <ul className={styles.list}>
                    {reservations.map((reservation) => (
                        <li key={reservation.id} className={styles.listItem}>
                            <p><strong>Name:</strong> {reservation.name}</p>
                            <p><strong>Email:</strong> {reservation.email}</p>
                            <p><strong>Check-in Date:</strong> {reservation.checkInDate}</p>
                            <p><strong>Check-out Date:</strong> {reservation.checkOutDate}</p>
                            <p><strong>Number of Guests:</strong> {reservation.numberOfGuests}</p>
                            {reservation.notes && <p><strong>Notes:</strong> {reservation.notes}</p>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reservations found.</p>
            )}
        </div>
    );
};

export default Reservations;
