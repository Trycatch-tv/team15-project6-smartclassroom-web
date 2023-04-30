import { Component } from "react";
import { Button, Stack, Grid, Fab, Divider, Typography, Box, List, ListItem, ListItemText, ListSubheader, TableCell, TableRow, AppBar, Toolbar, Paper, Table, TableHead, TableBody, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import moment from 'moment';
import CourseDataService from "../../services/courses.services";
import GradesDataService from "../../services/grades.services";
import { AxiosResponse } from "axios";
import { IGradeCourseData } from "../../types/grade.type";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ICourseData, ICourseProp } from './../../types/course.type';
import { TextField } from '@mui/material';
import { stat } from "fs";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

//Modal Imports
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import StudentsDataService from '../../services/students.services';
import { IStudentData } from '../../types/student.type';

type State = {
  //id: number;
  courseId: number;
  courseDescription: string;
  endDate: Date;
  startDate: Date;
  courseName: string;
  teacher: string;
  students: IGradeCourseData[];

  studentsNE: Array<IStudentData>;
};

type Props = {
  handler: () => void;
};

const View = (props: ICourseProp & Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [state, setState] = useState<State>({
    //id: Number(id),
    courseId: Number(id),
    courseDescription: '',
    endDate: new Date(),
    startDate: new Date(),
    courseName: '',
    teacher: '',
    students: [],

    studentsNE: []
  });

  const { courseName, courseDescription, teacher, startDate, endDate, students, studentsNE } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CourseDataService.get(state.courseId);
        setState((prevState) => ({
          ...prevState,
          courseDescription: response.data.courseDescription,
          endDate: moment(response.data.endDate).toDate(),
          startDate: moment(response.data.startDate).toDate(),
          courseName: response.data.courseName,
          teacher: response.data.teacher,
        }));

        const score = await GradesDataService.getCourse(state.courseId);
        setState((prevState) => ({
          ...prevState,
          students: score.data,
        }));

        const studentsNotEnrolled = await StudentsDataService.getStudentsNotEnrolled(state.courseId);
        setState((prevState) => ({
          ...prevState,
          studentsNE: studentsNotEnrolled.data,
        }));

        console.log(studentsNotEnrolled);
        
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [props.id]);

  const onClose = () => {
    navigate(-1);
  }

  // AddStudent Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  let [selectedStudentId, setSelectedStudentId] = useState('')

  const handleStudentChange = (event: SelectChangeEvent<string>) => {
    const studentId = event.target.value as string;
    setSelectedStudentId(studentId);
    console.log('El ID del estudiante seleccionado es: ', studentId);
  }

  const handleAddNewCourse = () => {
    console.log('Hola, estoy añadiendo un nuevo curso con ID: ', selectedStudentId);
    
    // const currentElement: IRegistrationData = {
    //   student_id: Number(id),
    //   course_id: Number(selectedCourseId)
    // };
    // RegistrationDataService.create(currentElement)
    setIsModalOpen(false);
  }


  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, paddingLeft: '0px', paddingTop: '15px', fontWeight: 'bold' }}
      > {courseName}
      </Typography>
      <Divider /><br />
      <Typography sx={{ marginBottom: '10px' }} color="inherit" noWrap><b>Descripción:</b> {courseDescription}</Typography>
      <Typography sx={{ marginBottom: '10px' }} color="inherit" noWrap><b>Profesor:</b> {teacher}</Typography>

      <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
        <Typography color="inherit" noWrap><b>Inicio:</b> {moment(startDate).format('YYYY-MM-DD')}</Typography>
        <Typography color="inherit" noWrap><b>Fin:</b> {moment(endDate).format('YYYY-MM-DD')}</Typography>
      </Stack>
      <Button sx={{ marginBottom: '10px' }} variant="contained" color="error" type="button" onClick={onClose}>Volver</Button>
      <br />
      <AppBar position='static'>
        <Toolbar>
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, paddingLeft: '0px', fontWeight: 'bold' }}
          >
            Estudiantes
          </Typography>
          {/* <Fab size='small' color="secondary" aria-label="add" href="">
            <AddIcon
              onClick={()=> setIsModalOpen(true)}
            />
            {isModalOpen && (
              <Dialog open={isModalOpen} PaperProps={{ style: { minWidth: '400px' } }} onClose={() => setIsModalOpen(false)}>
                <DialogTitle>Agregar nuevo estudiante</DialogTitle>
                <DialogContent>
                  <Select fullWidth
                    label='students'
                    value={selectedStudentId}
                    onChange={handleStudentChange}
                  >
                    <MenuItem disabled>
                      -- Seleccione un estudiante --
                    </MenuItem>

                    {studentsNE.map((studentNE: IStudentData, index: number) => (

                      <MenuItem
                        key={studentNE.studentId}
                        value={studentNE.studentId}
                      >
                        {studentNE.studentName}
                      </MenuItem>

                    ))}

                  </Select>
                </DialogContent>
                <DialogActions>
                  <Button variant='contained' color='primary' onClick={() => handleAddNewCourse()}>Agregar</Button>
                  <Button variant='contained' color='error' onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                </DialogActions>
              </Dialog>
            )}
          </Fab> */}
        </Toolbar>
      </AppBar>
      <Paper elevation={1}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Estudiante</TableCell>
                  <TableCell align="left">Nota 1</TableCell>
                  <TableCell align="left">Nota 2</TableCell>
                  <TableCell align="left">Nota 3</TableCell>
                  <TableCell align="left">Nota 4</TableCell>
                  <TableCell align="left">Nota 5</TableCell>
                  <TableCell align="left">Nota Final</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {students.map((score: IGradeCourseData, index: number) => (
                  < TableRow key={score.studentId} >
                    <TableCell component='th' scope='row'>
                      {score.studentName}
                    </TableCell>
                    <TableCell align='left'>
                      {score.grade1}
                    </TableCell>
                    <TableCell align='left'>
                      {score.grade2}
                    </TableCell>
                    <TableCell align='left'>
                      {score.grade3}
                    </TableCell>
                    <TableCell align='left'>
                      {score.grade4}
                    </TableCell>
                    <TableCell align='left'>
                      {score.grade5}
                    </TableCell>
                    <TableCell align='left'>
                      {score.final}
                    </TableCell>
                    <TableCell className="noWrap">
                      <Button variant="contained" color="secondary" className='listButton' >
                        {/* onClick={() => { this.setActiveGradesToUpdate(score.studentId, score.studentName); }} */}
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid >
      </Paper >
      <br />
    </>
  );
};

export default View;