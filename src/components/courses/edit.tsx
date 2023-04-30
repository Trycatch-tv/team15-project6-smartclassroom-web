
import { TextField, Button, Stack,Grid,Fab,Divider,Typography,Box } from '@mui/material';
import { Component, ChangeEvent } from "react";
import { ICourseData, ICourseProp } from './../../types/course.type';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import CourseDataService from "../../services/courses.services";
import { useParams, useNavigate } from 'react-router-dom';

type State = {
  courseId: number,
  courseName: string,
  courseDescription: string,
  startDate: Date,
  endDate: Date,
  teacher: string
};

type Props = {
  handler: () => void;
};

const Edit = (props: ICourseProp & Props) => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    courseId: Number(id),
    courseDescription: '',
    endDate: moment(new Date()).add(3, 'months').toDate(),
    startDate: moment(new Date()).subtract(1, 'months').toDate(),
    courseName: '',
    teacher: ''
  });

  useEffect(() => {
    const onOpen = async () => {
      try {
        const response = await CourseDataService.get(state.courseId);
        const data = response.data;
        setState({
          courseId: data.courseId,
          courseDescription: data.courseDescription,
          endDate: moment(data.endDate).toDate(),
          startDate: moment(data.startDate).toDate(),
          courseName: data.courseName,
          teacher: data.teacher
        });
      } catch (e: any) {
        console.error(e);
      }
    };
    onOpen();
  }, [id]);

  const onSave = async () => {
    const currentElement: ICourseData = {
      courseDescription: state.courseDescription,
      endDate: state.endDate,
      startDate: state.startDate,
      courseName: state.courseName,
      teacher: state.teacher
    };

    try {
      await CourseDataService.update(currentElement, state.courseId);
      navigate(-1);
      //handler();
    } catch (e: any) {
      console.error(e);
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, courseName: value }));
  };

  const onChangeDescripcion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, courseDescription: value }));
  };

  const onChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = moment(new Date(e.target.value)).toDate();
    console.log(value);
    setState((prevState) => ({ ...prevState, startDate: value }));
  };

  const onChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = moment(new Date(e.target.value)).toDate();
    setState((prevState) => ({ ...prevState, endDate: value }));
  };

  const onChangeTeacher = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, teacher: value }));
  };
  
  //render() {
    const { courseName, courseDescription, startDate, endDate, teacher} = state;
    return (
      <>
        <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, paddingLeft: '0px', paddingTop: '15px' }}
            > Editar Curso
        </Typography>
        <Divider /><br /><br/>
        <form onSubmit={()=>{return false;}}>
          <TextField
            type="text" variant='outlined' value={courseName}
            color='secondary' label="Nombre"
            onChange={onChangeName}
            fullWidth required sx={{mb: 4}}
          />
          <TextField
            type="text" variant='outlined' value={courseDescription}
            color='secondary' label="Descripcion"
            onChange={onChangeDescripcion}
            fullWidth required sx={{mb: 4}}
          />
          <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
            <TextField
              type="date" value={moment(startDate).format('YYYY-MM-DD')}
              variant='outlined'
              color='secondary'
              label="Inicio"
              onChange={onChangeStartDate}
              fullWidth
              required
            />
            <TextField
              type="date" value={moment(endDate).format('YYYY-MM-DD')}
              variant='outlined'
              color='secondary'
              label="Fin"
              onChange={onChangeEndDate}
              fullWidth
              required
            />
          </Stack>
          <TextField
              type="text" variant='outlined'
              color='secondary' label="Teacher"
              onChange={onChangeTeacher}
              value={teacher} fullWidth required sx={{mb: 4}}
          />
          <Button variant="contained" color="secondary" type="button" onClick={onSave}>Actualizar</Button>
          <Button variant="contained" color="error" type="button" onClick={onCancel}>Cancelar</Button>
        </form>
      </>
    );
}

export default Edit;