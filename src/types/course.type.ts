export interface ICourseDataListElement {
  id?: any | null,
  name: string,
  description: string,
  startDate: Date,
  endDate: Date,
  teacher: string,
  students: IStudentData[]
}
export interface ICourseData {
  course_id?: any | null,
  course_name: string,
  course_description: string,
  start_date: Date,
  end_date: Date,
  teacher: string,
}
interface IStudentData {
  studentId?: any | null,
  name: string
}
export interface ICourseProp {
  id: number
}

