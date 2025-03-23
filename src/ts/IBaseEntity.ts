// ts/IBaseEntity.ts

interface IBaseEntity {
    id: string; // js lib uuidv4()
    owner: string | undefined; // Owner ID, can be undefined
    visible: boolean; // Visibility status
    name: string; // Unified name/title
    description: string; // Description
}
  
export default IBaseEntity;