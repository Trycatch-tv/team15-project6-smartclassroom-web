import React, { useState } from 'react';
import { TextField, Button, Stack, Grid, Fab, Divider, Typography, Box } from '@mui/material';
import { Component, ChangeEvent } from "react";
import { ICourseData } from './../../types/course.type';
import moment from 'moment';
import CourseDataService from "../../services/courses.services";
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

type Props = {};
type State = {
  course_name: string,
  course_description: string,
  start_date: Date,
  end_date: Date,
  teacher: string,
  redirect: boolean;
};
export default class Create extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);

    this.state = {
      course_description: '',
      end_date: moment(new Date()).add(3, 'months').toDate(),
      start_date: moment(new Date()).subtract(1, 'months').toDate(),
      course_name: '',
      teacher: '',
      redirect: false
    };
  }

  onSave = () => {
    const currentElement: ICourseData = {
      course_description: this.state.course_description,
      end_date: this.state.end_date,
      start_date: this.state.start_date,
      course_name: this.state.course_name,
      teacher: this.state.teacher,
    };
    CourseDataService.create(currentElement).then((response: any) => {
      this.setState({ redirect: true });
    }).catch((e: Error) => {
      console.error(e);
    });
  }

  onCancel = () => {
    this.setState({ redirect: true });
  }
  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({ course_name: value });
  }
  onChangeDescripcion(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({ course_description: value });
  }
  onChangeStartDate(e: ChangeEvent<HTMLInputElement>) {
    const value = moment(new Date(e.target.value)).toDate();
    console.log(value);
    this.setState({ start_date: value });
  }
  onChangeEndDate(e: ChangeEvent<HTMLInputElement>) {
    const value = moment(new Date(e.target.value)).toDate();
    this.setState({ end_date: value });
  }
  onChangeTeacher(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({ teacher: value });
  }

  render() {
    const { course_name, course_description, start_date, end_date, teacher, redirect } = this.state;
    if (redirect) {
      return <Navigate to='/courses' />;
    }
    return (
      <>
        <Helmet>
          <title>Cursos - Smart Classroom</title>
        </Helmet>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, paddingLeft: '0px', paddingTop: '15px' }}
        > Crear nuevo curso
        </Typography>
        <Divider /><br /><br />
        <form onSubmit={() => { return false; }}>
          <TextField
            type="text" variant='outlined' value={course_name}
            color='secondary' label="Nombre"
            onChange={this.onChangeName}
            fullWidth required sx={{ mb: 4 }}
          />
          <TextField
            type="text" variant='outlined' value={course_description}
            color='secondary' label="Descripcion"
            onChange={this.onChangeDescripcion}
            fullWidth required sx={{ mb: 4 }}
          />
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="date" value={moment(start_date).format('YYYY-MM-DD')}
              variant='outlined'
              color='secondary'
              label="Inicio"
              onChange={this.onChangeStartDate}
              fullWidth
              required
            />
            <TextField
              type="date" value={moment(end_date).format('YYYY-MM-DD')}
              variant='outlined'
              color='secondary'
              label="Fin"
              onChange={this.onChangeEndDate}
              fullWidth
              required
            />
          </Stack>
          <TextField
            type="text" variant='outlined'
            color='secondary' label="Teacher"
            onChange={this.onChangeTeacher}
            value={teacher} fullWidth required sx={{ mb: 4 }}
          />
          <Button variant="contained" color="secondary" type="button" onClick={this.onSave}>Crear</Button>
          <Button variant="contained" color="error" type="button" onClick={this.onCancel}>Cancelar</Button>
        </form>
      </>
    );
  }
}