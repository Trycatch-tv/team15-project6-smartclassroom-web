import { Component } from "react";
import { Button, Stack, Grid, Fab, Divider, Typography, Box, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import moment from 'moment';
import CourseDataService from "../../services/courses.services";
import StudentsDataService from "../../services/students.services";
import GradesDataService from "../../services/grades.services";
import { AxiosResponse } from "axios";
import { IGradeCourseData } from "../../types/grade.type";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ICourseData, ICourseProp } from './../../types/course.type';
import { IStudentProp } from './../../types/student.type';
import { TextField } from '@mui/material';
import { stat } from "fs";



type State = {
  id: number;
  studentName: string;
  email: string;
  phone: string;
  /*course_id: number;
  course_description: string;
  end_date: Date;
  start_date: Date;
  course_name: string;
  teacher: string;
  students: IGradeCourseData[];*/
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
    phone: ''
    /*course_id: Number(id),
    course_description: '',
    end_date: new Date(),
    start_date: new Date(),
    course_name: '',
    teacher: '',
    students: [],*/
  });

  const { studentName, email, phone } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StudentsDataService.get(state.id.toString());
        setState((prevState) => ({
          ...prevState,
          email: response.data.email,
          phone: response.data.phone,
          studentName: response.data.studentName,
        }));

        const studentsResponse = await GradesDataService.getCourse(props.id);
        setState((prevState) => ({
          ...prevState,
          students: studentsResponse.data,
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
      > {studentName}
      </Typography>
      <Divider /><br />
      <Typography color="inherit" noWrap><b>Correo electrónico:</b> {email}</Typography>
      <Divider sx={{ margin: '10px' }} />
      <Typography color="inherit" noWrap><b>Número de télefono:</b> {phone}</Typography>
      {/*<Divider />
      <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
        <Typography color="inherit" noWrap><b>Inicio:</b> {moment(start_date).format('YYYY-MM-DD')}</Typography>
        <Typography color="inherit" noWrap><b>Fin:</b> {moment(end_date).format('YYYY-MM-DD')}</Typography>
        </Stack>
      <Divider /><br />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav"
        aria-labelledby="nested-list-subheader" subheader="Alumnos asignados">
        {students.map((student: IGradeCourseData, index: number) => (
          <ListItem>
            <ListItemText primary="Single-line item">
              {1}
            </ListItemText>
          </ListItem>
        ))
        }
        <ListItemText primary="No se encontraron elementos" sx={{ display: students.length === 0 ? 'none' : '' }} />
      </List>*/}
      <br />
      <Button variant="contained" color="error" type="button" onClick={onClose}>Volver</Button>
    </>
  );
};

export default View;