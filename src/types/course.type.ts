export interface ICourseDataListElement {
  courseId?: any | null,
  courseName: string,
  courseDescription: string,
  startDate: Date,
  endDate: Date,
  teacher: string,
  students: IStudentData[]
}
export interface ICourseData {
  courseId?: any | null,
  courseName: string,
  courseDescription: string,
  startDate: Date,
  endDate: Date,
  teacher: string,
}
interface IStudentData {
  studentId?: any | null,
  name: string
}
export interface ICourseProp{
  id: number,
  handler: () => void | null
}
export interface ICourseNotRolled{
  studentId: number
}

