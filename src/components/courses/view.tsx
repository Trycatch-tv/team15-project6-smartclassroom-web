import { Component} from "react";
import { Button, Stack, Grid, Fab, Divider, Typography, Box, List, ListItem, ListItemText, ListSubheader, TableCell, TableRow, AppBar, Toolbar, Paper, Table, TableHead, TableBody } from '@mui/material';
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

type State = {
  course_id: number;
  course_description: string;
  end_date: Date;
  start_date: Date;
  course_name: string;
  teacher: string;
  students: IGradeCourseData[];
};

type Props = {
  handler: () => void;
};

const View = (props: ICourseProp & Props) => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();

  const [state, setState] = useState<State>({
    course_id: Number(id),
    course_description: '',
    end_date: new Date(),
    start_date: new Date(),
    course_name: '',
    teacher: '',
    students: [],
  });

  const { course_name, course_description, teacher, start_date, end_date, students } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CourseDataService.get(state.course_id);
        setState((prevState) => ({
          ...prevState,
          course_description: response.data.courseDescription,
          end_date: moment(response.data.endDate).toDate(),
          start_date: moment(response.data.startDate).toDate(),
          course_name: response.data.courseName,
          teacher: response.data.teacher,
        }));

        const score = await GradesDataService.getCourse(state.course_id);
        setState((prevState) => ({
          ...prevState,
          students: score.data,
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

  return (
    <>
    <Typography
        component="h1"
        variant="h5"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, paddingLeft: '0px', paddingTop: '15px', fontWeight: 'bold' }}
        > {course_name}
    </Typography>
    <Divider /><br />
    <Typography sx={{ marginBottom: '10px' }} color="inherit" noWrap><b>Descripción:</b> {course_description}</Typography>
    <Typography sx={{ marginBottom: '10px' }} color="inherit" noWrap><b>Profesor:</b> {teacher}</Typography>

    <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
    <Typography color="inherit" noWrap><b>Inicio:</b> {moment(start_date).format('YYYY-MM-DD')}</Typography>
    <Typography color="inherit" noWrap><b>Fin:</b> {moment(end_date).format('YYYY-MM-DD')}</Typography>
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
          <Fab size='small' color="secondary" aria-label="add" href="">
            <AddIcon />
          </Fab>
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