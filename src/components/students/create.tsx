import React, { useState } from 'react';
import { TextField, Button, Stack, Grid, Fab, Divider, Typography, Box } from '@mui/material';
import { Component, ChangeEvent } from "react";
import { IStudentData } from '../../types/student.type';
import StudentsDataService from '../../services/students.services';
import { Navigate } from 'react-router-dom';

type Props = {};
type State = {
  studentName: string,
  email: string,
  phone: string,
  redirect: boolean;
};
export default class Create extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onRedirect = this.onRedirect.bind(this);
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);

    this.state = {
      studentName: '',
      email: '',
      phone: '',
      redirect: false
    };
  }

  onSave = () => {
    const currentElement: IStudentData = {
      studentName: this.state.studentName,
      email: this.state.email,
      phone: this.state.phone,
    };
    StudentsDataService.create(currentElement).then((response: any) => {
      this.setState({ redirect: true });
    }).catch((e: Error) => {
      console.error(e);
    });
    //this.onRedirect();
  }

  onCancel = () => {
    this.setState({ redirect: true });
  }
  onChangeStudentName(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({ studentName: value });
  }
  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({ email: value });
  }
  onChangePhone(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({ phone: value });
  }
  onRedirect = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { studentName, email, phone, redirect } = this.state;
    if (redirect) {
      return <Navigate to='/students' />;
    }
    return (
      <>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, paddingLeft: '0px', paddingTop: '15px' }}
        > Crear nuevo estudiante
        </Typography>
        <Divider /><br /><br />
        <form onSubmit={() => { return false; }}>
          <TextField
            type="text" variant='outlined' value={studentName}
            color='secondary' label="Nombre"
            onChange={this.onChangeStudentName}
            fullWidth required sx={{ mb: 4 }}
          />
          <TextField
            type="text" variant='outlined' value={email}
            color='secondary' label="Correo electrónico"
            onChange={this.onChangeEmail}
            fullWidth required sx={{ mb: 4 }}
          />
          <TextField
            type="text" variant='outlined'
            color='secondary' label="Teléfono"
            onChange={this.onChangePhone}
            value={phone} fullWidth required sx={{ mb: 4 }}
          />
          <Button variant="contained" color="secondary" type="button" onClick={this.onSave}>Crear</Button>
          <Button variant="contained" color="error" type="button" onClick={this.onCancel}>Cancelar</Button>
        </form>
      </>
    );
  }
}