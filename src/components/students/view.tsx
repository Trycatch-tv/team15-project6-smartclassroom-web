import { Button, Stack, Grid, Fab, Divider, Typography, Box, List, ListItem, ListItemText, ListSubheader, TableCell, TableRow, AppBar, Toolbar, Paper, Table, TableHead, TableBody, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import StudentsDataService from "../../services/students.services";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useRoutes } from 'react-router-dom';
import { IStudentProp } from './../../types/student.type';
import AddIcon from '@mui/icons-material/Add';

import { IGradeStudentData } from '../../types/grade.type';
import GradesDataService from '../../services/grades.services';
import RegistrationDataService from '../../services/registration.services';
import { IRegistrationData } from '../../types/registration.type';


//Modal Imports
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CourseDataService from '../../services/courses.services';
import { ICourseData } from '../../types/course.type';

type State = {
  id: number;
  studentName: string;
  email: string;
  phone: string;
  nationalId: number;

  scores: Array<IGradeStudentData>;

  courses: Array<ICourseData>,
  studentId: number;

};

type Props = {
  handler: () => void;
};

const View = (props: IStudentProp & Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [state, setState] = useState<State>({
    id: Number(id),
    studentName: '',
    email: '',
    phone: '',
    nationalId: 0,

    scores: [],
    courses: [],
    studentId: Number(id)
  });

  const { studentName, email, phone, nationalId, scores, courses } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StudentsDataService.get(state.id.toString());
        setState((prevState) => ({
          ...prevState,
          email: response.data.email,
          phone: response.data.phone,
          studentName: response.data.studentName,
          nationalId: response.data.nationalId
        }));

        const score = await GradesDataService.getStudent(state.id);
        setState((prevState) => ({
          ...prevState,
          scores: score.data,
        }));

        const coursesNotEnrolled = await CourseDataService.getCoursesNotEnrolled(state.id);
        setState((prevState) => ({
          ...prevState,
          courses: coursesNotEnrolled.data,
        }));



      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [props.id]);

  const onClose = () => {
    navigate(-1);
  }

  // AddCourse Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [selectedCourseId, setSelectedCourseId] = useState('')

  const handleCourseChange = (event: SelectChangeEvent<string>) => {
    const courseId = event.target.value as string;
    setSelectedCourseId(courseId);
    console.log('El ID del curso seleccionado es: ', courseId);
  }

  const handleAddNewCourse = () => {
    console.log('Hola, estoy añadiendo un nuevo curso con ID: ', selectedCourseId);
    
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
      > {studentName}
      </Typography>
      <Divider /><br />
      <Typography sx={{ marginBottom: '10px' }} color="inherit" noWrap><b>Correo electrónico:</b> {email}</Typography>
      <Typography sx={{ marginBottom: '10px' }} color="inherit" noWrap><b>Documento de identidad:</b> {nationalId}</Typography>
      <Typography color="inherit" noWrap><b>Número de télefono:</b> {phone}</Typography>
      <br />
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
            Cursos
          </Typography>
          <Fab size='small' color="secondary" aria-label="add" href="">
            <AddIcon
              onClick={() => setIsModalOpen(true)}
            />
            {/* MODAL */}
            {isModalOpen && (
              <Dialog open={isModalOpen} PaperProps={{ style: { minWidth: '400px' } }} onClose={() => setIsModalOpen(false)}>
                <DialogTitle>Agregar nuevo curso</DialogTitle>
                <DialogContent>
                  <Select fullWidth
                    label='courses'
                    value={selectedCourseId}
                    onChange={handleCourseChange}
                  >
                    <MenuItem disabled>
                      -- Seleccione un curso --
                    </MenuItem>

                    {courses.map((course: ICourseData, index: number) => (

                      <MenuItem
                        key={course.courseId}
                        value={course.courseId}
                      >
                        {course.courseName}
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
            {/* FIN MODAL */}
          </Fab>
        </Toolbar>
      </AppBar>
      <Paper elevation={1}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Curso</TableCell>
                  <TableCell align="left">Nota 1</TableCell>
                  <TableCell align="left">Nota 2</TableCell>
                  <TableCell align="left">Nota 3</TableCell>
                  <TableCell align="left">Nota 4</TableCell>
                  <TableCell align="left">Nota 5</TableCell>
                  <TableCell align="left">Nota Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {scores.map((score: IGradeStudentData, index: number) => (
                  < TableRow key={score.courseId} >
                    <TableCell component='th' scope='row'>
                      {score.courseName}
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