// src/api/reservation/controllers/reservation.ts

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::reservation.reservation', ({ strapi }) => ({
    async findMyReservations(ctx) {
        const userId = ctx.state.user?.id;

        if (!userId) {
            return ctx.badRequest('User ID not found');
        }

        try {
            // サービスを使ってユーザーの予約を取得
            const reservations = await strapi.service('api::reservation.reservation').findUserReservations(userId);
            ctx.body = reservations;
        } catch (error) {
            ctx.internalServerError('Error fetching reservations');
        }
    },
}));
