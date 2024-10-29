// pages/api/items.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // データベースからアイテムリストを取得
        const items = await prisma.items.findMany();
        res.status(200).json(items);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
