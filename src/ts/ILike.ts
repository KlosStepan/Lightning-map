interface ILike {
    id: string; // uuid
    owner: string; // user id
    entityId: string; // merchant or eshop id
    entityType: "merchant" | "eshop";
    createdAt: string; // ISO date string
}
export default ILike;