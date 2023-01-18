export interface UserList {
    id:number,
    jobNumber: number,
    name:string,
    team:string,
    userName:string,
    roleId:number,
    role:string,
    jobDegreeid:number,
    jobDegree:string,
    creationDate?:Date,
    createdBy?:string,
    updateDate?:Date,
    updatedBy:string

}
export class User {
    id:number=0;
    jobNumber: number=0;
    name:string;
    team:string;
    userName:string;
    roleId:number;
    role:string;
    jobDegreeid:number;
    jobDegree:string;
    creationDate?:Date;
    createdBy?:string;
    updateDate?:Date;
    updatedBy:string

}
