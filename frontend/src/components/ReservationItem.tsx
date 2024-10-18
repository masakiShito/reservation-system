// src/components/ReservationItem.tsx
import React from 'react';
import styles from './ReservationItem.module.css';

interface ReservationItemProps {
    name: string;
    email: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
    notes?: string;
}

const ReservationItem: React.FC<ReservationItemProps> = ({
                                                             name,
                                                             email,
                                                             checkInDate,
                                                             checkOutDate,
                                                             numberOfGuests,
                                                             notes,
                                                         }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.info}><strong>Email:</strong> {email}</p>
            <p className={styles.info}><strong>Check-in Date:</strong> {checkInDate}</p>
            <p className={styles.info}><strong>Check-out Date:</strong> {checkOutDate}</p>
            <p className={styles.info}><strong>Number of Guests:</strong> {numberOfGuests}</p>
            {notes && <p className={styles.notes}><strong>Notes:</strong> {notes}</p>}
        </div>
    );
};

export default ReservationItem;
