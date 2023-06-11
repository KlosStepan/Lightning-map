interface IMerchant {
    geometry: {
        coordinates: [number, number]
        type: string
    }
    properties: {
        description: string
        owner: string | undefined
        title: string
        visible: boolean
    }
    type: string
}
export default IMerchant