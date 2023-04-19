import { AxiosResponse } from "axios";
import http from "../http-common";
import { ICourseData } from "../types/course.type"
import { IDashboardCoursesCountData } from "../types/dashboard.types"

class CourseDataService {
  create(data: ICourseData) : Promise<AxiosResponse<ICourseData, any>> {
    return http.post<ICourseData>("/courses", data);
  }

  getAll(title: string) : Promise<AxiosResponse<Array<ICourseData>, any>> {
    return http.get<Array<ICourseData>>("/courses");
  }

  getCount() : Promise<AxiosResponse<IDashboardCoursesCountData, any>> {
    return http.get<IDashboardCoursesCountData>("/courses/getCount");
  }

  get(id: number) : Promise<AxiosResponse<ICourseData, any>> {
    return http.get<ICourseData>(`/courses/${id}`);
  }

  delete(id: number) {
    return http.delete<any>(`/courses/${id}`);
  }

  update(data: ICourseData, id: any) {
    return http.put<any>(`/courses/${id}`, data);
  }
}
export default new CourseDataService();