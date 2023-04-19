import { Component} from "react";
import { ICourseProp } from './../../types/course.type';
import { Button, Stack,Grid,Fab,Divider,Typography,Box,List,ListItem,ListItemText,ListSubheader } from '@mui/material';
import moment from 'moment';
import CourseDataService from "../../services/courses.services";
import GradesDataService from "../../services/grades.services";
import { AxiosResponse } from "axios";
import { IGradeCourseData } from "../../types/grade.type";

type State = {
  course_id: number,
  course_name: string,
  course_description: string,
  start_date: Date,
  end_date: Date,
  teacher: string,
  students: Array<IGradeCourseData>
};
export default class View extends Component<ICourseProp, State> {
  constructor(props: ICourseProp) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);

    this.state = {
      course_id: this.props.id,
      course_description:'',
      end_date:new Date(),
      start_date:new Date(),
      course_name:'',
      teacher:'',
      students: new Array<IGradeCourseData>(0)
    };
    this.onOpen();
  }
  onOpen = () =>{
    CourseDataService.get(this.props.id).then((response: any) => {
      this.setState( {
        course_description:response.data.course_description,
        end_date:moment(response.data.end_date).toDate(),
        start_date:moment(response.data.start_date).toDate(),
        course_name:response.data.course_name,
        teacher:response.data.teacher
      });
    }).catch((e: Error) => {
      console.error(e);
    });
    GradesDataService.getCourse(this.props.id).then((response: AxiosResponse<Array<IGradeCourseData>, any>) => {
      
    }).catch((e: Error) => {
      console.error(e);
    });
  }
  onClose = () => {
    this.props.handler();
  }
  render() {
    const { course_name, course_description, teacher, start_date, end_date, students } = this.state;
    return (
        <>
        <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, paddingLeft: '25px', paddingTop: '15px' }}
            > {course_name}
        </Typography>
        <Divider /><br />
        <Typography color="inherit" noWrap><b>Description:</b> {course_description}</Typography>
        <Divider />
        <Typography color="inherit" noWrap><b>Profesor:</b> {teacher}</Typography>
        <Divider />
        <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
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
            <ListItemText primary="No se encontraron elementos" sx={{display:students.length === 0?'none':''}} />
        </List>
        <br />
        <Button variant="contained" color="error" type="button" onClick={this.onClose}>Cerrar</Button>
        </>
    );
  }
}