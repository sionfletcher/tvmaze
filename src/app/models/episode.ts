import { Show } from './';

export interface Episode {
    id: string;
    summary: string;
    airstamp: Date;
    runtime: number;
    image: {
        original?: string;
        medium?: string;
    };
    show: Show;
}
