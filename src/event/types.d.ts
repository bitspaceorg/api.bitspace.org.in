// Types for the event module
export type event = {
    id: string;
    fromDate: Date;
    toDate: Date;
    regDate: Date;
    is_completed: boolean;
    type:string;
    name: string;
    description: string;
    agenda: string;
    poster: string;
    register: string;
    take_away: string;
    paid : boolean
}

