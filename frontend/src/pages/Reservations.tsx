// src/pages/Reservations.tsx
import React, { useEffect, useState } from 'react';
import ReservationsList from '../components/ReservationsList';
import api from '../services/api';

interface Reservation {
    id: number;
    Name: string;
    Email: string;
    CheckInDate: string;
    CheckOutDate: string;
    NumberOfGuests: number;
    Notes?: string;
}

const Reservations: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get('/api/reservations');
                console.log('Fetched reservations:', response.data);
                const fetchedReservations = response.data.data;
                setReservations(fetchedReservations);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div>
            <h1>Reservations</h1>
            {reservations.length > 0 ? (
                <ReservationsList reservations={reservations} />
            ) : (
                <p>No reservations found.</p>
            )}
        </div>
    );
};

export default Reservations;
