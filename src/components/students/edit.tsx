
import { TextField, Button, Stack, Grid, Fab, Divider, Typography, Box } from '@mui/material';
import { Component, ChangeEvent } from "react";
import { IStudentData, IStudentProp } from '../../types/student.type';
import StudentsDataService from "../../services/students.services";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

type State = {
  studentId: number,
  studentName: string,
  email: string,
  phone: string,
  nationalId: number
  // course_id: number,
  // course_name: string,
  // course_description: string,
  // start_date: Date,
  // end_date: Date,
  // teacher: string
};

type Props = {
  handler: () => void;
};

const Edit = (props: IStudentProp & Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    studentId: Number(id),
    studentName: '',
    email: '',
    phone: '',
    nationalId: 0
  });

  useEffect(() => {
    const onOpen = async () => {
      try {
        const response = await StudentsDataService.get(state.studentId.toString());
        const data = response.data;
        console.log(data)
        setState({
          studentId: data.studentId,
          studentName: data.studentName,
          email: data.email,
          phone: data.phone,
          nationalId: data.nationalId
        });
      } catch (e: any) {
        console.error(e);
      }
    };
    onOpen();
  }, [id]);

  const onSave = async () => {
    const currentElement: IStudentData = {
      studentName: state.studentName,
      email: state.email,
      phone: state.phone,
      nationalId: state.nationalId
      // course_name: state.course_name,
      // teacher: state.teacher
    };

    try {
      console.log(id)
      await StudentsDataService.update(currentElement, state.studentId);
      navigate(-1);
      //handler();
    } catch (e: any) {
      console.error(e);
    }
    //navigate(-1);
  };

  const onCancel = () => {
    navigate(-1);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, studentName: value }));
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, email: value }));
  };

  const onChangeNationalId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setState((prevState) => ({ ...prevState, nationalId: value }));
  };

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setState((prevState) => ({ ...prevState, phone: value }));
  };

  /*const onChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = moment(new Date(e.target.value)).toDate();
    setState((prevState) => ({ ...prevState, end_date: value }));
  };

  const onChangeTeacher = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, teacher: value }));
  };*/

  //render() {
  const { studentName, email, phone, nationalId} = state;
  return (
    <>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, paddingLeft: '0px', paddingTop: '15px' }}
      > Editar Estudiante
      </Typography>
      <Divider /><br /><br />
      <form onSubmit={() => { return false; }}>
        <TextField
          type="text" variant='outlined' value={studentName}
          color='secondary' label="Nombre"
          onChange={onChangeName}
          fullWidth required sx={{ mb: 4 }}
        />
        <TextField
          type="text" variant='outlined' value={nationalId}
          color='secondary' label="Documento de identidad"
          onChange={onChangeNationalId}
          fullWidth required sx={{ mb: 4 }}
        />
        <TextField
          type="text" variant='outlined' value={email}
          color='secondary' label="Correo Electrónico"
          onChange={onChangeEmail}
          fullWidth required sx={{ mb: 4 }}
        />
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
        <TextField
          type="text" variant='outlined' value={phone}
          color='secondary' label="Teléfono"
          onChange={onChangePhone}
          fullWidth required sx={{ mb: 4 }}
        />
          {/*<TextField
            type="text" value={moment(start_date).format('YYYY-MM-DD')}
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
  />*/}
        </Stack>
        {/*<TextField
          type="text" variant='outlined'
          color='secondary' label="Teacher"
          onChange={onChangeTeacher}
          value={teacher} fullWidth required sx={{ mb: 4 }}
/>*/}
        <Button variant="contained" color="secondary" type="button" onClick={onSave}>Actualizar</Button>
        <Button variant="contained" color="error" type="button" onClick={onCancel}>Cancelar</Button>
      </form>
    </>
  );
}

export default Edit;