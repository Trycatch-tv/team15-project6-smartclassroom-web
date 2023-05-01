import { AxiosResponse } from "axios";
import http from "../http-common";
import { IGradeCourseData, IGradeStudentData, IGradesData } from "../types/grade.type"

class GradesDataService {
  getStudent(id: number) : Promise<AxiosResponse<Array<IGradeStudentData>, any>> {
    return http.get<Array<IGradeStudentData>>(`/grades/students/${id}`);
  }

  getCourse(id: number) : Promise<AxiosResponse<Array<IGradeCourseData>, any>> {
    return http.get<Array<IGradeCourseData>>(`/grades/courses/${id}`);
  }

  updateGrades(data: IGradesData) {
    return http.put<any>('/grades/', data);
  }
}
export default new GradesDataService();