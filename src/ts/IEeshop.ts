interface IEshop {
    id: string // js lib uuidv4()
    name: string
    description: string
    logo: string
    country: string
    url: string
    owner: string | undefined
    visible: boolean
}

interface IEshopADWrapper {
    documentid: string
    eshop: IEshop
}

export default IEshop
export type { IEshopADWrapper };