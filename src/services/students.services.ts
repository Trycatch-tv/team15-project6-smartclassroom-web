import http from "../http-common";
import { IStudentData } from "../types/student.type"

class StudentsDataService {
  getAll() {
    return http.get<Array<IStudentData>>("/students");
  }

  get(id: string) {
    return http.get<IStudentData>(`/students/${id}`);
  }

  create(data: IStudentData) {
    return http.post<IStudentData>("/students", data);
  }

  update(data: IStudentData, id: any) {
    return http.put<any>(`/students/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/students/${id}`);
  }
  /*
  deleteAll() {
    return http.delete<any>(`/students`);
  }

  findByTitle(title: string) {
    return http.get<Array<IStudentData>>(`/students?title=${title}`);
  }
  */
}
export default new StudentsDataService();