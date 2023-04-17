import http from "../http-common";
import { ICourseData } from "../types/course.type"

class CourseDataService {
  getAll() {
    return http.get<Array<ICourseData>>("/courses");
  }

  get(id: string) {
    return http.get<ICourseData>(`/courses/${id}`);
  }

  create(data: ICourseData) {
    return http.post<ICourseData>("/courses", data);
  }

  update(data: ICourseData, id: any) {
    return http.put<any>(`/courses/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/courses/${id}`);
  }

  findByTitle(title: string) {
    return http.get<Array<ICourseData>>(`/courses?title=${title}`);
  }
  
  /*
  deleteAll() {
    return http.delete<any>(`/courses`);
  }
  */
}
export default new CourseDataService();