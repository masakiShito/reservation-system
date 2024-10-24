// src/pages/CreateReservation.tsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateReservation: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCreateReservation = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('jwt'); // JWTトークンを取得
            const userId = localStorage.getItem('userId'); // ログインしたユーザーのIDを取得
            console.log('Token:', token);
            console.log('User ID:', userId);
            if (!token || !userId) {
                setError('ログインしてください。');
                return;
            }

            const reservationData = {
                Name: name,
                Email: email,
                CheckInDate: checkInDate,
                CheckOutDate: checkOutDate,
                NumberOfGuests: numberOfGuests,
                Notes: notes,
                user: "sfkxdakibpverpyb2dhgjwocsfkxdakibpverpyb2dhgjwoc" , // ユーザーIDを数値で渡す
            };

            const response = await axios.post(
                'http://localhost:1337/api/reservations',
                { data: reservationData },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess('予約が作成されました。');
            console.log('Reservation created:', response.data);
        } catch (error) {
            setError('予約の作成に失敗しました。');
            console.error('Error creating reservation:', error);
        }
    };

    return (
        <div>
            <h1>予約作成</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleCreateReservation}>
                <div>
                    <label>名前:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>メール:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>チェックイン日:</label>
                    <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>チェックアウト日:</label>
                    <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>宿泊人数:</label>
                    <input
                        type="number"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                        min={1}
                        required
                    />
                </div>
                <div>
                    <label>特記事項:</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <button type="submit">予約を作成</button>
            </form>
        </div>
    );
};

export default CreateReservation;
