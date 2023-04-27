export interface IStudentData {
  id?: any | null,
  studentName: string,
  email: string,
  phone: string,
  nationalId: number
}

export interface IStudentProp {
  id: number,
  handler: () => void | null
}