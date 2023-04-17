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
import { Helmet } from 'react-helmet-async';
//https://mui.com/material-ui/react-table/
//https://www.bezkoder.com/react-typescript-axios/
type Props = {};

type State = {
  courses: Array<ICourseDataListElement>;
  currentElement: ICourseDataListElement | null;
  currentIndex: number;
  searchValue: string;
};

export default class List extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
    this.retrieveCourses = this.retrieveCourses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCourse = this.setActiveCourse.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      courses: [],
      currentElement: null,
      currentIndex: -1,
      searchValue: "",
    };
  }

  componentDidMount() {
    this.retrieveCourses();
  }

  onChangeSearchValue(e: ChangeEvent<HTMLInputElement>) {
    const searchVal = e.target.value;
    //console.log(this.state);
    this.setState({
      searchValue: searchVal,
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
      currentElement: null,
      currentIndex: -1,
    });
  }

  setActiveCourse(element: ICourseDataListElement, index: number) {
    this.setState({
      currentElement: element,
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

  search() {
    this.setState({
      currentElement: null,
      currentIndex: -1,
    });

    CourseDataService.findByTitle(this.state.searchValue)
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
    const { searchValue, courses, currentElement, currentIndex } = this.state;
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
                          <Link to={"/courses/edit"} state={course.id}>
                            <Button variant="contained" color="secondary" className='listButton'>
                              <EditIcon />
                            </Button>
                          </Link>
                          <Button variant="contained" color="error" className='listButton' onClick={()=>{
                              this.removeCourse(course.id);
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
