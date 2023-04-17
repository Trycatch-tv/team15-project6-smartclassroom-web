export interface IYesNoProp {
    open: boolean,
    title: string,
    description: string,
    handlerYes: () => void | null
    handlerNo: () => void | null
}