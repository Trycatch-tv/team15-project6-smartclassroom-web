import * as React from 'react';
import { Component, ChangeEvent } from "react";
import CourseDataService from "../../services/courses.services";
import { ICourseDataListElement } from "../../types/course.type";
import {
  Grid,TextField,Fab,AppBar,Toolbar,
  Table, TableBody, TableCell, TableHead, TableRow, 
  Button,Typography,Box
} from "@mui/material";
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import moment from "moment";
import "./list.css";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from '@mui/icons-material/Search';
import ViewIcon from '@mui/icons-material/Visibility';
import { Helmet } from 'react-helmet-async';
import Edit from './edit';
import View from './view';
import DeleteDialog from '../generic/DeleteDialog';
//https://mui.com/material-ui/react-table/
//https://www.bezkoder.com/react-typescript-axios/
type Props = {};

type State = {
  courses: Array<ICourseDataListElement>;
  currentIdToView: number;
  currentIdToEdit: number;
  currentIdToDelete: number;
  searchValue: string;
  currentCourseName: string;
};

export default class List extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
    this.retrieveCourses = this.retrieveCourses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCourseToEdit = this.setActiveCourseToEdit.bind(this);
    this.setActiveCourseToView = this.setActiveCourseToView.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      courses: [],
      currentIdToView: 0,
      currentIdToEdit: 0,
      currentIdToDelete: 0,
      searchValue: "",
      currentCourseName: "",
    };
  }

  componentDidMount() {
    this.retrieveCourses();
  }

  onChangeSearchValue(e: ChangeEvent<HTMLInputElement>) {
    const searchVal = e.target.value;
    this.setState({
      searchValue: searchVal,
    });
  }

  retrieveCourses() {
    CourseDataService.getAll(this.state.searchValue)
      .then((response: any) => {
        this.setState({
          courses: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCourses();
    this.setState({
      currentIdToView: 0,
      currentIdToEdit: 0,
      currentIdToDelete: 0
    });
  }

  setActiveCourseToEdit(id: number) {
    this.setState({
      currentIdToView: 0,
      currentIdToEdit: id,
      currentIdToDelete: 0
    });
  }

  setActiveCourseToView(id: number) {
    this.setState({
      currentIdToView: id,
      currentIdToEdit: 0,
      currentIdToDelete: 0
    });
  }

  setActiveCourseToDelete(id: number, name: string) {
    this.setState({
      currentIdToView: 0,
      currentIdToEdit: 0,
      currentIdToDelete: id,
      currentCourseName: name
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

  search() {
    this.setState({
      currentIdToView: 0,
      currentIdToEdit: 0,
      currentIdToDelete: 0
    });

    CourseDataService.getAll(this.state.searchValue)
      .then((response: any) => {
        this.setState({
          courses: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  handleKeywordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) =>{
    if( e.key === 'Enter' ){
      this.search();
    }
  };

  render() {
    const { searchValue, courses, currentIdToEdit, currentIdToView, currentCourseName } = this.state;
      if(currentIdToEdit>0){
        return (<Edit id={currentIdToEdit} handler={this.refreshList}></Edit>);
      }else if(currentIdToView>0){
        return (<View id={currentIdToView} handler={this.refreshList}></View>);
      }else{
        return (
        <>
          <Helmet>
            <title>Dashboard</title>
          </Helmet>
          <AppBar position="static">
            <Toolbar>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, paddingLeft: '25px', paddingTop: '15px' }}
                > Cursos
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField label="Buscar" variant="standard" 
                onKeyPress={this.handleKeywordKeyPress}
                onChange={this.onChangeSearchValue} value={searchValue} />
            </Box>
            <Fab color="secondary" aria-label="add" href="/courses/create">
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
                      <TableCell align="left">Curso</TableCell>
                      <TableCell align="left">Descripción</TableCell>
                      <TableCell align="left" className="noWrap">Fecha de inicio</TableCell>
                      <TableCell align="left" className="noWrap">Fecha de finalización</TableCell>
                      <TableCell align="left">Profesor</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courses.map((course: ICourseDataListElement, index: number) => (
                      <TableRow key={course.id}>
                        <TableCell component="th" scope="row">
                          {course.name}
                        </TableCell>
                        <TableCell align="left">{course.description}</TableCell>
                        <TableCell align="right">
                          {moment(course.startDate).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell align="right">
                          {moment(course.endDate).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell align="left">{course.teacher}</TableCell>
                        <TableCell className="noWrap">
                            <Button variant="contained" color="primary" className='listButton' onClick={()=>{ this.setActiveCourseToView(course.id); }}>
                              <ViewIcon />
                            </Button>
                            <Button variant="contained" color="secondary" className='listButton' onClick={()=>{ this.setActiveCourseToEdit(course.id); }}>
                              <EditIcon />
                            </Button>
                            <Button variant="contained" color="error" className='listButton' onClick={()=>{ this.setActiveCourseToDelete(course.id, course.name); }}>
                              <DeleteIcon />
                            </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
        </Paper>
        <DeleteDialog open={this.state.currentIdToDelete>0} 
          description='¿Estás seguro de que deseas eliminar el curso' title='¿Deseas eliminar este curso?'
          elementName={this.state.currentCourseName}
          handlerYes={()=>{ this.removeCourse(this.state.currentIdToDelete)}}
          handlerNo={()=>{ this.setState({ currentIdToDelete: 0 }); }}
        ></DeleteDialog>
      </>
      );
    }
  }
}
