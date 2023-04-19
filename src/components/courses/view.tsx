import { Component} from "react";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ICourseData, ICourseProp } from './../../types/course.type';
import CourseDataService from "../../services/courses.services";
import { TextField, Button, Stack,Grid,Fab,Divider,Typography,Box } from '@mui/material';
import moment from 'moment';


type Props = {
  handler: () => void;
};

type State = {
  course_id: number,
  course_name: string,
  course_description: string,
  start_date: Date,
  end_date: Date,
  teacher: string
};

const View = (props: ICourseProp & Props) => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();

  const [state, setState] = useState<State>({
    course_id: Number(id),
    course_description:'',
    end_date:new Date(),
    start_date:new Date(),
    course_name:'',
    teacher:''
  });

  useEffect(() => {
    CourseDataService.get(state.course_id.toString()).then((response: any) => {
      setState({
        course_id: response.data.id,
        course_description: response.data.course_description,
        end_date: moment(response.data.end_date).toDate(),
        start_date: moment(response.data.start_date).toDate(),
        course_name: response.data.course_name,
        teacher: response.data.teacher
      });
    }).catch((e: Error) => {
      console.error(e);
    });
  }, [id]);

  const onClose = () => {
    navigate(-1);
  }

  return (
    <>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, paddingLeft: '25px', paddingTop: '15px' }}
      > Curso: {state.course_name}
      </Typography>
      <Divider /><br />
      <Typography color="inherit" noWrap><b>Description:</b> {state.course_description}</Typography>
      <Divider />
      <Typography color="inherit" noWrap><b>Profesor:</b> {state.teacher}</Typography>
      <Divider />
      <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
        <Typography color="inherit" noWrap><b>Inicio:</b> {moment(state.start_date).format('YYYY-MM-DD')}</Typography>
        <Typography color="inherit" noWrap><b>Fin:</b> {moment(state.end_date).format('YYYY-MM-DD')}</Typography>
      </Stack>
      <Divider /><br />
      <Button variant="contained" color="warning" type="button" onClick={onClose}>Volver</Button>
    </>
  );
};

export default View;