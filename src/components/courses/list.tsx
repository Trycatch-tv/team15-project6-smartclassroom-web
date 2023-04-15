import * as React from 'react';
import { Component, ChangeEvent } from "react";
import CourseDataService from "../../services/courses.services";
import { ICourseData } from "../../types/course.type";
import {
  Grid,Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, ButtonGroup, Button,Typography
} from "@mui/material";
import Paper, { PaperProps } from '@mui/material/Paper';
import moment from "moment";
import "./list.css";
import { Title } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
//https://mui.com/material-ui/react-table/
type Props = {};

type State = {
  courses: Array<ICourseData>;
  currentTutorial: ICourseData | null;
  currentIndex: number;
  searchTitle: string;
};

export default class List extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCourses = this.retrieveCourses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
    //this.searchTitle = this.searchTitle.bind(this);

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
        //console.log(response.data);
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

  removeCourse(id: number) {
    CourseDataService.delete(id)
      .then((response: any) => {
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  /*

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
  */
  render() {
    const { searchTitle, courses, currentTutorial, currentIndex } = this.state;
    return (
      <Paper elevation={1} >
        <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, paddingLeft: '25px', paddingTop: '15px' }}
            > Cursos
        </Typography>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Curso</TableCell>
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
                      <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button color="secondary"><EditIcon /></Button>
                        <Button color="error" onClick={()=>{
                            this.removeCourse(course.id);
                          }}><DeleteIcon /></Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
    </Paper>
    );
  }
}
