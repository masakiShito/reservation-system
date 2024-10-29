// pages/api/reservations/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const reservations = await prisma.reservations.findMany({
            include: {
                items_reservation_lnk: {
                    include: {
                        items: true,
                    },
                },
            },
        });
        res.status(200).json(reservations);
    } else if (req.method === 'POST') {
        const { reservation_date, number_of_people, total_amount, items } = req.body;

        try {
            const reservation = await prisma.reservations.create({
                data: {
                    // Prismaモデルのフィールド名と一致させる
                    number_of_people,
                    total_amount,
                    items_reservation_lnk: {
                        create: items.map((itemId: number) => ({
                            items: { connect: { id: itemId } },
                        })),
                    },
                },
            });
            res.status(201).json(reservation);
        } catch (error) {
            console.error('予約の作成中にエラーが発生しました:', error);
            res.status(500).json({ message: '予約の作成に失敗しました' });
        }
    } else {
        res.status(405).json({ message: 'メソッドが許可されていません' });
    }
}
