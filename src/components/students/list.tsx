import * as React from 'react';
import { Component, ChangeEvent, useState } from "react";
import StudentsDataService from "../../services/students.services";
import { IStudentData } from "../../types/student.type";
import { Link } from "react-router-dom";
import {
  Grid, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonGroup,
  Button,
  Typography,
  Fab,
  AppBar,
  Toolbar,
} from "@mui/material";
import Paper from '@mui/material/Paper';
import moment from "moment";
import "./list.css";
import AddIcon from '@mui/icons-material/Add';
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Helmet } from 'react-helmet-async';
import DeleteDialog from '../generic/DeleteDialog';
import Edit from './edit';
import View from '../courses/view';
//https://mui.com/material-ui/react-table/
type Props = {};

type State = {
  students: Array<IStudentData>;
  currentTutorial: IStudentData | null;
  currentIndex: number;
  searchTitle: string;
  currentIdToView: number;
  currentIdToEdit: number;
  currentIdToDelete: number;
  currentStudentName: string;
};

export default class List extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveStudents = this.retrieveStudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStudentToEdit = this.setActiveStudentToEdit.bind(this);
    this.setActiveStudentToView = this.setActiveStudentToView.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
    //this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      students: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      currentIdToView: 0,
      currentIdToEdit: 0,
      currentIdToDelete: 0,
      currentStudentName: "",
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
      currentIdToView: 0,
      currentIdToEdit: 0,
      currentIdToDelete: 0
    });
  }

  setActiveStudentToEdit(id: number) {
    this.setState({
      currentIdToView: 0,
      currentIdToEdit: id,
      currentIdToDelete: 0
    })
  }

  setActiveStudentToView(id: number) {
    this.setState({
      currentIdToView: id,
      currentIdToEdit: 0,
      currentIdToDelete: 0
    });
  }

  setActiveTutorial(tutorial: IStudentData, index: number) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeStudent(id: number) {
    StudentsDataService.delete(id)
      .then((response: any) => {
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  setActiveStudentToDelete(id: number, name: string) {
    this.setState({
      currentIdToView: 0,
      currentIdToEdit: 0,
      currentIdToDelete: id,
      currentStudentName: name,
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
    const { students, currentIdToView, currentIdToEdit } = this.state;

    if (currentIdToEdit > 0) {
      return (<Edit studentId={currentIdToEdit} handler={this.refreshList}></Edit>);
    } else if (currentIdToView > 0) {
      return (<View id={currentIdToView} handler={this.refreshList}></View>);
    } else {

      return (
        <>
          <Helmet>
            <title>Estudiantes - Smart Classroom</title>
          </Helmet>
          <AppBar position='static'>
            <Toolbar>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, paddingLeft: '0px', paddingTop: '15px' }}
              > Estudiantes
              </Typography>
              <Box>

              </Box>
              <Fab size='small' color="secondary" aria-label="add" href="/students/create">
                <AddIcon />
              </Fab>
            </Toolbar>
          </AppBar>
          <Paper elevation={1} >
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Nombre</TableCell>
                      <TableCell align="left">Doc. de identidad</TableCell>
                      <TableCell align="left">Correo electrónico</TableCell>
                      {/* <TableCell align="left" className="noWrap">Fecha de inicio</TableCell>
                    <TableCell align="left" className="noWrap">Fecha de finalización</TableCell> */}
                      <TableCell align="left">Número de teléfono</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student: IStudentData, index: number) => (
                      <TableRow key={student.studentId}>
                        <TableCell component="th" scope="row">
                          {student.studentName}
                        </TableCell>
                        <TableCell align="left">{student.nationalId}</TableCell>
                        <TableCell align="left">{student.email}</TableCell>
                        <TableCell align="left">{student.phone}</TableCell>
                        <TableCell className="noWrap">
                          <Link to={`/students/${student.studentId}`}>
                            <Button variant="contained" color="primary" className='listButton'>
                              <ViewIcon />
                            </Button>
                          </Link>
                          <Link to={`/students/edit/${student.studentId}`}>
                            <Button variant="contained" color="secondary" className='listButton'>
                              <EditIcon />
                            </Button>
                          </Link>
                          <Button variant="contained" color="error" className='listButton' onClick={() => { this.setActiveStudentToDelete(student.studentId, student.studentName); }}>
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
              <DeleteDialog open={this.state.currentIdToDelete > 0}
                description='¿Estás seguro de que deseas eliminar el estudiante' title='¿Deseas eliminar este estudiante?'
                elementName={this.state.currentStudentName}
                handlerYes={() => { this.removeStudent(this.state.currentIdToDelete) }}
                handlerNo={() => { this.setState({ currentIdToDelete: 0 }); }}
              ></DeleteDialog>
            </Grid>
          </Paper >
        </>
      );
    }
  }
}
