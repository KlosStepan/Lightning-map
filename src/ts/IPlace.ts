//todo
interface IPlace {
    geometry: {
        coordinates: [number, number]
        type: string
    }
    properties: {
        description: string
        owner: string
        title: string
    }
    type: string
}
export default IPlace