// components/ReservationItem.tsx
import React from 'react';
import Link from 'next/link';

interface ReservationItemProps {
    reservation: any;
}

const ReservationItem: React.FC<ReservationItemProps> = ({ reservation }) => {
    return (
        <li className="mb-4 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <Link href={`/reservations/${reservation.id}`}>
                <div className="p-4">
                    <p className="text-lg font-semibold text-gray-800">日付: {reservation.created_at}</p>
                    <p className="text-sm text-gray-600">人数: {reservation.number_of_people}</p>
                    <p className="text-sm text-gray-600">合計金額: ¥{reservation.total_amount}</p>
                </div>
            </Link>
        </li>
    );
};

export default ReservationItem;
