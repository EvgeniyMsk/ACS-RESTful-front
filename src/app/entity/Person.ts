import {AccessDocument} from "./AccessDocument";

export interface Person {
  id: number;
  lastname: string
  firstname: string
  patronymic: string
  name: string
  birthdayIso: string
  birthday: string
  serial: string
  number: string
  passport: string
  foreignSerial: string
  foreignNumber: string
  foreignPassport: string
  birthName: string
  reasonId: string
  reasonDescription: string
  reasonResult: string
  accessDocument: AccessDocument
}
