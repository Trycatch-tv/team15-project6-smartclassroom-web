export interface IStudentData {
  studentId?: any | null,
  studentName: string,
  nationalId: number,
  email: string,
  phone: string
}

export interface IStudentProp {
  studentId: number,
  handler: () => void | null
}