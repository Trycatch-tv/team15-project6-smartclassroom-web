import http from "../http-common";
import {  IRegistrationData } from "../types/registration.type"

class RegistrationDataService {
  create(element: IRegistrationData) {
    return http.post<any>('/grades/students', element);
  }

  delete(element: IRegistrationData) {
    return http.delete<any>('/grades/courses', { data : { source: element } });
  }
}
export default new RegistrationDataService();