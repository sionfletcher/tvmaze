import { Show } from './';

export interface Episode {
    id: string;
    summary: string;
    airstamp: Date;
    runtime: number;
    name: string;
    image: {
        original?: string;
        medium?: string;
    };
    show: Show;
}
