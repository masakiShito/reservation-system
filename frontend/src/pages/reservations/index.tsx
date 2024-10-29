// pages/reservations/index.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import ReservationList from '../../components/ReservationList';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
    const reservations = await prisma.reservations.findMany({
        include: {
            items_reservation_lnk: {
                include: {
                    items: true,
                },
            },
        },
    });

    return {
        props: {
            reservations: JSON.parse(JSON.stringify(reservations)),
        },
    };
};

interface ReservationsPageProps {
    reservations: any[];
}

const ReservationsPage: React.FC<ReservationsPageProps> = ({ reservations }) => {
    return (
        <div>
            <h1>予約一覧</h1>
            <ReservationList reservations={reservations} />
        </div>
    );
};

export default ReservationsPage;