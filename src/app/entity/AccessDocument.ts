import {Person} from "./Person";
import {AccessObject} from "./AccessObject";

export interface AccessDocument {
  id: number
  documentId: number
  objectId: number
  companyId: number
  companyName: string
  companyInn: string
  companyOgrn: string
  companyOgrnIp: string
  departmentId: number
  departmentName: string
  subscriptionNumber: string
  subscriptionDate: string
  performerFinishedDatetime: string
  peoples: Person[]
  accessObjects: AccessObject[]
  comments: Comment[]
}
