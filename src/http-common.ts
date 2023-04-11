import axios from "axios";
import { apiRoutes } from './utils/api-routes';

export default axios.create({
  baseURL: apiRoutes.root,
  headers: {
    "Content-type": "application/json"
  }
});