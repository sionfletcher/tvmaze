export interface Show {
    id: string;
    name: string;
    network: {
        name: string
    };
    schedule: {
        days: string[]
    };
    status: string;
    genres: string[];
    rating: {
        average: number;
    };
    weight: number;
}
