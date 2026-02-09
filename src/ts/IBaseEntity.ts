// ts/IBaseEntity.ts

interface IBaseEntity {
    id: string;
    owner: string | undefined;
    editor?: string;
    visible: boolean;
    name: string;
    description: string;
    createdAt?: string;
}

export default IBaseEntity;