export interface IStudentData {
  id?: any | null,
  name: string,
  email: string,
  phone: string
}

export interface IStudentProp {
  id: number,
  handler: () => void | null
}