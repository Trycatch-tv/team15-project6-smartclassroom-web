import { Button, Stack, Grid, Fab, Divider, Typography, Box, List, ListItem, ListItemText, ListSubheader, TableCell, TableRow, AppBar, Toolbar, Paper, Table, TableHead, TableBody } from '@mui/material';
import StudentsDataService from "../../services/students.services";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useRoutes } from 'react-router-dom';
import { IStudentProp } from './../../types/student.type';
import AddIcon from '@mui/icons-material/Add';

import { IGradeStudentData } from '../../types/grade.type';
import GradesDataService from '../../services/grades.services';

type State = {
  id: number;
  studentName: string;
  email: string;
  phone: string;

  scores: Array<IGradeStudentData>;
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
    phone: '',

    scores: []
  });

  const { studentName, email, phone, scores } = state;

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

        const score = await GradesDataService.getStudent(state.id);
        setState((prevState) => ({
          ...prevState,
          scores: score.data,
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

  console.log(scores);
  
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
      <Typography sx={{ marginBottom: '10px' }} color="inherit" noWrap><b>Correo electrónico:</b> {email}</Typography>
      <Typography color="inherit" noWrap><b>Número de télefono:</b> {phone}</Typography>
      <br />
      <AppBar position='static'>
        <Toolbar>
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, paddingLeft: '0px', fontWeight: 'bold' }}
          >
            Registro de Cursos
          </Typography>
          <Fab size='small' color="secondary" aria-label="add" href="">
            <AddIcon />
          </Fab>
        </Toolbar>
      </AppBar>
      <Paper elevation={1}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Curso</TableCell>
                  <TableCell align="left">Nota 1</TableCell>
                  <TableCell align="left">Nota 2</TableCell>
                  <TableCell align="left">Nota 3</TableCell>
                  <TableCell align="left">Nota 4</TableCell>
                  <TableCell align="left">Nota 5</TableCell>
                  <TableCell align="left">Nota Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {scores.map((score: IGradeStudentData, index: number) => (
                  < TableRow key={score.student_id} >
                    <TableCell component='th' scope='row'>
                      {score.student_name}
                    </TableCell>
                    <TableCell align='left'>
                      {score.grade1}
                    </TableCell>
                    <TableCell align='left'>
                      {score.grade2}
                    </TableCell>
                    <TableCell align='left'>
                      {score.grade3}
                    </TableCell>
                    <TableCell align='left'>
                      {score.grade4}
                    </TableCell>
                    <TableCell align='left'>
                      {score.grade5}
                    </TableCell>
                    <TableCell align='left'>
                      {score.grade1}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid >
      </Paper >



      <br />
      <Button sx={{ marginTop: '1rem' }} variant="contained" color="error" type="button" onClick={onClose}>Volver</Button>
    </>
  );
};

export default View;