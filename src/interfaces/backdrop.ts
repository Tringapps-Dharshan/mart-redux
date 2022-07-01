export type handleClose = () => void

export type setOpen = (set: boolean) => void

export type props = {
    user: number,
    open: boolean,
    setOpen: setOpen
}