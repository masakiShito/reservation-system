// types/Reservation.ts
export interface Reservation {
    id: number;
    attributes: {
        date: string;
        time: string;
        number_of_people: number;
        status: string;
        total_amount: number;
        items: Item[];
    };
}

export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
}