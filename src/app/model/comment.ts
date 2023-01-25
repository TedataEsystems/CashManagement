export interface Comment {
    id?: number;
    missionId?: number;
    comment?: string;
    createdBy?:string;
    creationDate?:Date;
    updatedBy?:string;
    updateDate?:Date;
}
