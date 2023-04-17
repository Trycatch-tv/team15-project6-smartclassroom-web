export interface IDeleteProp {
    open: boolean,
    title: string,
    description: string,
    elementName: string,
    handlerYes: () => void | null
    handlerNo: () => void | null
}