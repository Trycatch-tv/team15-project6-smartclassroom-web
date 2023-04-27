import { AppBar, Fab, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { Component } from 'react';
import { IGradeCourseData } from '../../types/grade.type';
import GradesDataService from '../../services/grades.services';

export interface Props {
    studentId: string | undefined;
}

type State = {
    scores: IGradeCourseData[];
}

export default class CoursesList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrieveCourses = this.retrieveCourses.bind(this);

        this.state = {
            scores: [],
        }
    }

    retrieveCourses() {
        const { studentId } = this.props;
        GradesDataService.getStudent(Number(studentId))
            .then((response: any) => {
                this.setState({
                    scores: response.data,
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }


    render() {
        const { scores } = this.state;
        return (
            <>
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
                        <Fab size='small' color="secondary" aria-label="add" href="/courses/create">
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
                                    {scores.map((score: IGradeCourseData, studentId) => (
                                        < TableRow key={score.studentId} >
                                            <TableCell component='th' scope='row'>
                                                {score.studentName}
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
                                                {score.final}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid >
                </Paper >
            </>
        );

    }
};