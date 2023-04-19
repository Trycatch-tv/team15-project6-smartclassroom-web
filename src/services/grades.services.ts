import { AxiosResponse } from "axios";
import http from "../http-common";
import { IGradeCourseData, IGradeStudentData } from "../types/grade.type"

class GradesDataService {
  getStudent(id: number) : Promise<AxiosResponse<Array<IGradeStudentData>, any>> {
    return http.get<Array<IGradeStudentData>>(`/grades/students/${id}`);
  }

  getCourse(id: number) : Promise<AxiosResponse<Array<IGradeCourseData>, any>> {
    return http.get<Array<IGradeCourseData>>(`/grades/courses/${id}`);
  }
}
export default new GradesDataService();
