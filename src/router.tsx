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

const DashBoard = Loader(lazy(() => import("./components/dashboard/index")));
const CoursesList = Loader(lazy(() => import("./components/courses/list2")));
const CoursesEdit = Loader(lazy(() => import("./components/courses/edit")));
const CoursesCreate = Loader(lazy(() => import("./components/courses/create")));
const CoursesReport = Loader(lazy(() => import("./components/courses/report")));

const GradesList = Loader(lazy(() => import("./components/grades/list")));
const GradesEdit = Loader(lazy(() => import("./components/grades/edit")));
const GradesCreate = Loader(lazy(() => import("./components/grades/create")));
const GradesReport = Loader(lazy(() => import("./components/grades/report")));

const StudentsList = Loader(lazy(() => import("./components/students/list")));
const StudentsEdit = Loader(lazy(() => import("./components/students/edit")));
const StudentsCreate = Loader(
  lazy(() => import("./components/students/create"))
);
const StudentsUserEdit = Loader(
  lazy(() => import("./components/students/useredit"))
);

const TeacherList = Loader(lazy(() => import("./components/teachers/list")));
const TeacherEdit = Loader(lazy(() => import("./components/teachers/edit")));
const TeacherCreate = Loader(
  lazy(() => import("./components/teachers/create"))
);

// Status
const Status404 = Loader(
  lazy(() => import("./components/generic/Status/Status404"))
);
const Status500 = Loader(
  lazy(() => import("./components/generic/Status/Status500"))
);
const StatusMaintenance = Loader(
  lazy(() => import("./components/generic/Status/Maintenance"))
);

const routes: RouteObject[] = [
  {
    path: "",
    element: <DashBoard />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "status",
        children: [
          {
            path: "",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
          {
            path: "500",
            element: <Status500 />,
          },
          {
            path: "maintenance",
            element: <StatusMaintenance />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "courses",
    element: <CoursesList />,
    children: [
      {
        path: "",
        element: <Navigate to="courses" replace />,
      },
      {
        path: "List",
        element: <CoursesList />,
      },
      {
        path: "create",
        element: <CoursesCreate />,
      },
      {
        path: "edit",
        element: <CoursesEdit />,
      },
      {
        path: "report",
        element: <CoursesReport />,
      },
    ],
  },
  {
    path: "grades",
    element: <GradesList />,
    children: [
      {
        path: "",
        element: <Navigate to="grades" replace />,
      },
      {
        path: "List",
        element: <GradesList />,
      },
      {
        path: "create",
        element: <GradesCreate />,
      },
      {
        path: "edit",
        element: <GradesEdit />,
      },
      {
        path: "report",
        element: <GradesReport />,
      },
    ],
  },
  {
    path: "students",
    element: <StudentsList />,
    children: [
      {
        path: "",
        element: <Navigate to="students" replace />,
      },
      {
        path: "List",
        element: <StudentsList />,
      },
      {
        path: "create",
        element: <StudentsCreate />,
      },
      {
        path: "edit",
        element: <StudentsEdit />,
      },
      {
        path: "useredit",
        element: <StudentsUserEdit />,
      },
    ],
  },
  {
    path: "teachers",
    element: <TeacherList />,
    children: [
      {
        path: "",
        element: <Navigate to="teachers" replace />,
      },
      {
        path: "List",
        element: <TeacherList />,
      },
      {
        path: "create",
        element: <TeacherCreate />,
      },
      {
        path: "edit",
        element: <TeacherEdit />,
      },
    ],
  },
];

export default routes;