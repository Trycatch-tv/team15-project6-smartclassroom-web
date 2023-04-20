export interface IStudentData {
  id?: any | null,
  studentName: string,
  email: string,
  phone: string
}

export interface IStudentProp {
  id: number,
  handler: () => void | null
}