import React, {useState} from 'react';
import { TextField, Button, Stack,Grid,Fab,Divider,Typography,Box } from '@mui/material';
import { Component, ChangeEvent } from "react";
import { ICourseData, ICourseProp } from './../../types/course.type';
import moment from 'moment';
import CourseDataService from "../../services/courses.services";

type State = {
  course_id: number,
  course_name: string,
  course_description: string,
  start_date: Date,
  end_date: Date,
  teacher: string
};
export default class Edit extends Component<ICourseProp, State> {
  constructor(props: ICourseProp) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.onOpen = this.onOpen.bind(this);

    this.state = {
      course_id: this.props.id,
      course_description:'',
      end_date:moment(new Date()).add(3, 'months').toDate(),
      start_date:moment(new Date()).subtract(1, 'months').toDate(),
      course_name:'',
      teacher:''
    };
    this.onOpen();
  }

  onOpen = () =>{
    CourseDataService.get(this.props.id).then((response: any) => {
      //courses: response.data;
      this.setState( {
        //course_id: response.data.id,
        course_description:response.data.course_description,
        end_date:moment(response.data.end_date).toDate(),
        start_date:moment(response.data.start_date).toDate(),
        course_name:response.data.course_name,
        teacher:response.data.teacher
      });
    }).catch((e: Error) => {
      console.error(e);
    });
  }
  onSave = () => {
    const currentElement : ICourseData ={
      course_description:this.state.course_description,
      end_date:this.state.end_date,
      start_date:this.state.start_date,
      course_name:this.state.course_name,
      teacher:this.state.teacher,
    };
    CourseDataService.update(currentElement, this.state.course_id).then((response: any) => {
        this.props.handler();
    }).catch((e: Error) => {
      console.error(e);
    });
  }
  onCancel = () => {
    this.props.handler();
  }
  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({course_name: value });
  }
  onChangeDescripcion(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({course_description: value });
  }
  onChangeStartDate(e: ChangeEvent<HTMLInputElement>) {
    const value = moment(new Date(e.target.value)).toDate();
    console.log(value);
    this.setState({start_date: value });
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
    const {course_name,course_description,start_date,end_date,teacher} = this.state;
    return (
      <>
        <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, paddingLeft: '25px', paddingTop: '15px' }}
            > Editar Curso
        </Typography>
        <Divider /><br /><br/>
        <form onSubmit={()=>{return false;}}>
          <TextField
            type="text" variant='outlined' value={course_name}
            color='secondary' label="Nombre"
            onChange={this.onChangeName}
            fullWidth required sx={{mb: 4}}
          />
          <TextField
            type="text" variant='outlined' value={course_description}
            color='secondary' label="Descripcion"
            onChange={this.onChangeDescripcion}
            fullWidth required sx={{mb: 4}}
          />
          <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
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
              value={teacher} fullWidth required sx={{mb: 4}}
          />
          <Button variant="contained" color="secondary" type="button" onClick={this.onSave}>Actualizar</Button>
          <Button variant="contained" color="error" type="button" onClick={this.onCancel}>Cancelar</Button>
        </form>
      </>
    );
  }
}