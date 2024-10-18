// src/components/ReservationsList.tsx
import React from 'react';
import ReservationItem from './ReservationItem';
import styles from './ReservationsList.module.css';

interface Reservation {
    id: number;
    Name: string;
    Email: string;
    CheckInDate: string;
    CheckOutDate: string;
    NumberOfGuests: number;
    Notes?: string;
}

interface ReservationsListProps {
    reservations: Reservation[];
}

const ReservationsList: React.FC<ReservationsListProps> = ({ reservations }) => {
    return (
        <div className={styles.listContainer}>
            {reservations.map((reservation) => (
                <ReservationItem
                    key={reservation.id}
                    name={reservation.Name}
                    email={reservation.Email}
                    checkInDate={reservation.CheckInDate}
                    checkOutDate={reservation.CheckOutDate}
                    numberOfGuests={reservation.NumberOfGuests}
                    notes={reservation.Notes}
                />
            ))}
        </div>
    );
};

export default ReservationsList;
