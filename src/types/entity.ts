export interface INote {
    _id: string;
    title: string;
    content: string;
    image: string;
    created_at?: Date;
    updated_at?: Date;
}