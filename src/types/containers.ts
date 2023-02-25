export type TPhoto = {
    id: string,
    title: string,
    sizes: {
        width: number,
        height: number,
        url: string,
        type: string
    }[],
    album_id: string,
    likes?: { count: number };
    date?: number
}
export type TAlbum = {
    id: string,
    title: string,
    updated?: number,
    created?: number,
    size?: number,
    description?: string
}