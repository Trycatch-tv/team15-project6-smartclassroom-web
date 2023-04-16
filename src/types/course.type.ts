export interface ICourseData {
  id?: any | null,
  name: string,
  description: string,
  startDate: Date,
  endDate: Date,
  teacher: string,
  students: IStudentData[]
}
interface IStudentData {
  studentId?: any | null,
  name: string
}
