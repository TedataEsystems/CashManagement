export interface MissionList {
    id:number,
    jobDegree:string,
    missionPurpose: string,
    centerOfCost:number,
    companyType:number,
    missionPlace: string,
    startDateMission: string,
    endDateMission:string,
    startDateStay:string,
    endDateStay: string,
    noOfNights: number,
    stay:number,
    mealsAndIncidentals:number,
    jobNumber: number,
    missionTypeCost: string,
    permissionRequest:string,
    permissionDuration: string,
    comment:string,
   // Approvalmail: '',
    creationDate?:Date,
    createdBy?:string,
    updateDate?:Date,
    updateBy:string,
    statusId:number,
    missionTypeId:number,
    userId:number

}
