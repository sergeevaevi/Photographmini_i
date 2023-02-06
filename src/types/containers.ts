export type TPhoto = {
    id: string,
    title: string,
    sizes: {
        width: number,
        height: number,
        url: string,
        type: string
    }[],
}
export type TAlbum = {
    id: string,
    title: string,
}