/**
 * reservation router
 */

import { factories } from '@strapi/strapi';

// src/api/reservation/routes/reservation.ts
export default {
    routes: [
        {
            method: 'GET',
            path: '/my-reservations',
            handler: 'api::reservation.reservation.findMyReservations', // カスタムメソッドを指定
            config: {
                auth: {
                    scope: ['authenticated'],
                },
            },
        },
        {
            method: 'POST',
            path: '/reservations',
            handler: 'reservation.create',
            config: {
                policies: [],
                middlewares: [],
            },
        }
    ],
};
