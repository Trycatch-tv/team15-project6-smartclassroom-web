import http from "../http-common";
import { IStudentData } from "../types/student.type"
import { IDashboardStudentCountData } from "../types/dashboard.types"

class StudentsDataService {
  create(data: IStudentData) {
    return http.post<IStudentData>("/students", data);
  }

  getAll() {
    return http.get<Array<IStudentData>>("/students");
  }


  get(id: string) {
    return http.get<IStudentData>(`/students/${id}`);
  }

  getStudentCount() {
    return http.get<Array<IDashboardStudentCountData>>("/students/getCount");
  }

  delete(id: any) {
    return http.delete<any>(`/students/${id}`);
  }

  update(data: IStudentData, id: any) {
    return http.put<any>(`/students/${id}`, data);
  }
}
export default new StudentsDataService();
