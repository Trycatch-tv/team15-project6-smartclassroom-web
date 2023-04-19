
import { TextField, Button, Stack,Grid,Fab,Divider,Typography,Box } from '@mui/material';
import { Component, ChangeEvent } from "react";
import { ICourseData, ICourseProp } from './../../types/course.type';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import CourseDataService from "../../services/courses.services";
import { useParams, useNavigate } from 'react-router-dom';

type State = {
  course_id: number,
  course_name: string,
  course_description: string,
  start_date: Date,
  end_date: Date,
  teacher: string
};

type Props = {
  handler: () => void;
};

const Edit = (props: ICourseProp & Props) => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    course_id: Number(id),
    course_description: '',
    end_date: moment(new Date()).add(3, 'months').toDate(),
    start_date: moment(new Date()).subtract(1, 'months').toDate(),
    course_name: '',
    teacher: ''
  });

  useEffect(() => {
    const onOpen = async () => {
      try {
        const response = await CourseDataService.get(state.course_id);
        const data = response.data;
        setState({
          course_id: data.course_id,
          course_description: data.course_description,
          end_date: moment(data.end_date).toDate(),
          start_date: moment(data.start_date).toDate(),
          course_name: data.course_name,
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
      course_description: state.course_description,
      end_date: state.end_date,
      start_date: state.start_date,
      course_name: state.course_name,
      teacher: state.teacher
    };
    try {
      await CourseDataService.update(currentElement, state.course_id);
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
    setState((prevState) => ({ ...prevState, course_name: value }));
  };

  const onChangeDescripcion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, course_description: value }));
  };

  const onChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = moment(new Date(e.target.value)).toDate();
    console.log(value);
    setState((prevState) => ({ ...prevState, start_date: value }));
  };

  const onChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = moment(new Date(e.target.value)).toDate();
    setState((prevState) => ({ ...prevState, end_date: value }));
  };

  const onChangeTeacher = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, teacher: value }));
  };
  
  //render() {
    const {course_name,course_description,start_date,end_date,teacher} = state;
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
            type="text" variant='outlined' value={course_name}
            color='secondary' label="Nombre"
            onChange={onChangeName}
            fullWidth required sx={{mb: 4}}
          />
          <TextField
            type="text" variant='outlined' value={course_description}
            color='secondary' label="Descripcion"
            onChange={onChangeDescripcion}
            fullWidth required sx={{mb: 4}}
          />
          <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
            <TextField
              type="date" value={moment(start_date).format('YYYY-MM-DD')}
              variant='outlined'
              color='secondary'
              label="Inicio"
              onChange={onChangeStartDate}
              fullWidth
              required
            />
            <TextField
              type="date" value={moment(end_date).format('YYYY-MM-DD')}
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