import http from "../http-common";
import { IDashboardCoursesCountData, IDashboardStudentCountData } from "../types/dashboard.types"

class DashboardDataService {
  getCoursesCount() {
    return http.get<Array<IDashboardCoursesCountData>>("/courses/getCount");
  }
  getStudentCount() {
    return http.get<Array<IDashboardStudentCountData>>("/students/getCount");
  }
}
export default new DashboardDataService();
