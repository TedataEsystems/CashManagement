export interface AdvancedSearch {
     createdDateFrom:Date,
     createdDateTo:Date,

     updatedDateTo :Date,
     updatedDateFrom :Date,

     startDateMission :Date,
     endDateMission :Date,

     startDateStay :Date,
     endDateStay :Date,

     createdBy :string,
     updatedBy :string,

     
     jobNumber :number,
     id :number,
     missionPurpose :string,
     noOfNights :number,
     missionTypeCost :number,
     // id :number;
     userName :string,
     missionPlace :string,
     mealsAndIncidentals :number,
     comment :string,
     companyType:string,
     permissionDuration:string,
     permissionRequest:string,

     statusId :number,
     missionTypeId :number,
     jobDegreeId: number
}
