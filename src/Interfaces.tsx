export interface Post {
    id: number,
    title:string,
    preview:string,
    HTMLSnippet: JSX.Element,
    image: string | null
}