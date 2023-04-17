import * as React from 'react';
import { Component, ChangeEvent } from "react";
import StudentsDataService from "../../services/students.services";
import { ICourseData } from "../../types/course.type";
import { IStudentData } from "../../types/student.type";
import {
  Grid, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, ButtonGroup, Button, Typography
} from "@mui/material";
import Paper from '@mui/material/Paper';
import moment from "moment";
import "./list.css";
import EditIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { Helmet } from 'react-helmet-async';
//https://mui.com/material-ui/react-table/
type Props = {};

type State = {
  students: Array<IStudentData>;
  currentTutorial: IStudentData | null;
  currentIndex: number;
  searchTitle: string;
};

export default class List extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveStudents = this.retrieveStudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
    //this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      students: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveStudents();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveStudents() {
    StudentsDataService.getAll()
      .then((response: any) => {
        this.setState({
          students: response.data,
        });
        //console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveStudents();
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial: IStudentData, index: number) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeCourse(id: number) {
    StudentsDataService.delete(id)
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
    const { searchTitle, students, currentTutorial, currentIndex } = this.state;
    return (
      <>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <Paper elevation={1} >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, paddingLeft: '25px', paddingTop: '15px' }}
          > Estudiantes
          </Typography>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Nombre</TableCell>
                    <TableCell align="left">Correo electrónico</TableCell>
                    {/* <TableCell align="left" className="noWrap">Fecha de inicio</TableCell>
                    <TableCell align="left" className="noWrap">Fecha de finalización</TableCell> */}
                    <TableCell align="left">Número de teléfono</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student: IStudentData, index: number) => (
                    <TableRow key={student.id}>
                      <TableCell component="th" scope="row">
                        {student.name}
                      </TableCell>
                      <TableCell align="left">{student.email}</TableCell>
                      {/* <TableCell align="left">
                        {moment(student.startDate).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell align="left">
                        {moment(student.endDate).format("YYYY-MM-DD")}
                      </TableCell> */}
                      <TableCell align="left">{student.phone}</TableCell>
                      <TableCell className="noWrap">
                        <Button variant="contained" color="secondary" className='listButton'><EditIcon /></Button>
                        <Button variant="contained" color="error" className='listButton' onClick={() => {
                          this.removeCourse(student.id);
                        }}><DeleteIcon /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Paper>
      </>
    );
  }
}
