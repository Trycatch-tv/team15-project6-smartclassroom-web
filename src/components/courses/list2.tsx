import { Component, ChangeEvent } from "react";
import CourseDataService from "../../services/courses.services";
import { Link } from "react-router-dom";
import { ICourseData } from "../../types/course.type";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Title } from "@mui/icons-material";
import moment from "moment";
import "./list.css";
import EditIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

type Props = {};

type State = {
  courses: Array<ICourseData>;
  currentTutorial: ICourseData | null;
  currentIndex: number;
  searchTitle: string;
};

export default class List2 extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCourses = this.retrieveCourses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllCourses = this.removeAllCourses.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      courses: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveCourses();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveCourses() {
    CourseDataService.getAll()
      .then((response: any) => {
        this.setState({
          courses: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCourses();
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial: ICourseData, index: number) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeAllCourses() {
    CourseDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });

    CourseDataService.findByTitle(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
          courses: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const { searchTitle, courses, currentTutorial, currentIndex } = this.state;

    return (
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="left">Descripción</TableCell>
                <TableCell align="left">Fecha de inicio</TableCell>
                <TableCell align="left">Fecha de finalización</TableCell>
                <TableCell align="left">Profesor</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course: ICourseData, index: number) => (
                <TableRow key={course.id}>
                  <TableCell component="th" scope="row">
                    {course.name}
                  </TableCell>
                  <TableCell align="left">{course.description}</TableCell>
                  <TableCell className="date" align="left">
                    {moment(course.startDate).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell className="date" align="left">
                    {moment(course.endDate).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell align="left">{course.teacher}</TableCell>
                  <TableCell className="action-column">
                    <EditIcon />
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    );
  }
}
