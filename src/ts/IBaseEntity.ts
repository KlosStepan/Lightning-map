// ts/IBaseEntity.ts

interface IBaseEntity {
    id: string; // js lib uuidv4()
    owner: string | undefined; // Owner ID, can be undefined
    editor?: string; // NEW: Editor ID
    visible: boolean; // Visibility status
    name: string; // Unified name/title
    description: string; // Description
    createdAt?: string; // NEW: ISO date string
}

export default IBaseEntity;