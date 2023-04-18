import { Component} from "react";
import { ICourseData, ICourseProp } from './../../types/course.type';
import CourseDataService from "../../services/courses.services";
import { TextField, Button, Stack,Grid,Fab,Divider,Typography,Box } from '@mui/material';
import moment from 'moment';

type State = {
  course_id: number,
  course_name: string,
  course_description: string,
  start_date: Date,
  end_date: Date,
  teacher: string
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
      teacher:''
    };
    this.onOpen();
  }
  onOpen = () =>{
    CourseDataService.get(this.props.id.toString()).then((response: any) => {
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
  onClose = () => {
    this.props.handler();
  }
  render() {
    return (
        <>
        <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, paddingLeft: '25px', paddingTop: '15px' }}
            > Curso: {this.state.course_name}
        </Typography>
        <Divider /><br />
        <Typography color="inherit" noWrap><b>Description:</b> {this.state.course_description}</Typography>
        <Divider />
        <Typography color="inherit" noWrap><b>Profesor:</b> {this.state.teacher}</Typography>
        <Divider />
        <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
        <Typography color="inherit" noWrap><b>Inicio:</b> {moment(this.state.start_date).format('YYYY-MM-DD')}</Typography>
        <Typography color="inherit" noWrap><b>Fin:</b> {moment(this.state.end_date).format('YYYY-MM-DD')}</Typography>
        </Stack>
        <Divider /><br />
        <Button variant="contained" color="error" type="button" onClick={this.onClose}>Cerrar</Button>
        </>
    );
  }
}