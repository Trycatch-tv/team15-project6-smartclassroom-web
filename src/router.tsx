import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";
import SuspenseLoader from "./components/generic/SuspenseLoader";

const Loader = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const AboutUs = Loader(lazy(() => import("./components/about-us/aboutUs")));

const CoursesList = Loader(lazy(() => import("./components/courses/list")));
const CoursesEdit = Loader(lazy(() => import("./components/courses/edit")));
const CoursesCreate = Loader(lazy(() => import("./components/courses/create")));
const CoursesView = Loader(lazy(() => import("./components/courses/view")));

const StudentsList = Loader(lazy(() => import("./components/students/list")));
const StudentsEdit = Loader(lazy(() => import("./components/students/edit")));
const StudentsCreate = Loader( lazy(() => import("./components/students/create")));
const StudentsUserEdit = Loader( lazy(() => import("./components/students/useredit")));

const Dashboard = Loader(lazy(() => import("./components/dashboard/index")));

// Status
const Status404 = Loader(lazy(() => import("./components/generic/Status/Status404")));
const Status500 = Loader(lazy(() => import("./components/generic/Status/Status500")));
const StatusMaintenance = Loader(lazy(() => import("./components/generic/Status/Maintenance")));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/courses",
    element: <CoursesList />,
  },
  {
    path: "/courses/list",
    element: <CoursesList />,
  },
  {
    path: "/courses/create",
    element: <CoursesCreate />,
  },
  {
    path: "/courses/edit",
    element: <CoursesEdit />,
  },
  {
    path: "/courses/:id/view",
    element: <CoursesView />,
  },
  {
    path: "/students",
    element: <StudentsList />,
  },
  {
    path: "/students/list",
    element: <StudentsList />,
  },
  {
    path: "/students/create",
    element: <StudentsCreate />,
  },
  {
    path: "/students/edit",
    element: <StudentsEdit />,
  },
  {
    path: "/students/useredit",
    element: <StudentsUserEdit />,
  },
  {
    path: "about-us",
    element: <AboutUs />,
    children: [
      {
        path: "",
        element: <Navigate to="about-us" replace />,
      }
    ],
  }
];

export default routes;
