export interface Comment {
    id: number;
    body: string | null;
    postId: number | null;
    userId: number | null;
}