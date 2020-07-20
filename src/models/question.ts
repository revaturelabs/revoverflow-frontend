export interface Question {
    id: number;
    acceptedId: number;
    title: string;
    content: string;
    creationDate: Date;
    status: boolean;
    userId: number;
}
