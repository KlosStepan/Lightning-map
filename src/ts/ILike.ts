// ts/ILike.ts

interface ILike {
    id: string;
    owner: string;
    entityId: string;
    entityType: "merchant" | "eshop";
    createdAt: string;
}

export default ILike;