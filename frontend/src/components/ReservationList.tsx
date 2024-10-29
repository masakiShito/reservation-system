// components/ReservationList.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReservationItem from './ReservationItem';

interface Reservation {
    id: number;
    created_at: string;
    number_of_people: number;
    total_amount: number;
}

interface ReservationListProps {
    reservations: Reservation[];
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations }) => {
    const router = useRouter();

    const handleCreateReservation = () => {
        router.push('/reservations/new');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
            <button
                onClick={handleCreateReservation}
                className="mb-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                新規予約
            </button>
            <ul className="space-y-4">
                {reservations.map((reservation) => (
                    <ReservationItem key={reservation.id} reservation={reservation} />
                ))}
            </ul>
        </div>
    );
};

export default ReservationList;
