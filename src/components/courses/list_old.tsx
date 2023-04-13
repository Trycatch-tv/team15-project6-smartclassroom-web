import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AxiosResponse, Axios } from 'axios';
import moment from 'moment';
import coursesServices from "../../services/courses.services";
//import { ICourseData } from "../types/course.type";


type ICourseData = {
    id?: any | null,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    teacher: string,
  };
const rows:ICourseData[] = [{
    id: 1,
    name: "Programación en Python",
    description: "Curso de programación en Python para principiantes",
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-06-30"),
    teacher: "Juan Pérez"
}, {
    id: 2,
    name: "Introducción a la Programación",
    description: "Curso introductorio sobre programación",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-08-31"),
    teacher: "Ana Gómez"
}, {
    id: 3,
    name: "Programación orientada a objetos",
    description: "Curso para estudiantes que deseen aprender los conceptos de la POO",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
    teacher: "Michael Johnson"
}, {
    id: 4,
    name: "Diseño de interfaces de usuario",
    description: "Curso para estudiantes que deseen aprender a diseñar interfaces de usuario atractivas y funcionales",
    startDate: new Date("2023-09-01"),
    endDate: new Date("2023-10-31"),
    teacher: "Laura González"
}, {
    id: 5,
    name: "Introducción a la Inteligencia Artificial",
    description: "Curso introductorio sobre inteligencia artificial",
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-06-30"),
    teacher: "Carlos Rodríguez"
}];
//coursesServices.getAll().then(res => { console.log(`in map(): ${res.data}`); rows = res.data;});
function List() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Id</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Start Date</TableCell>
                        <TableCell align="right">End Date</TableCell>
                        <TableCell align="right">Teacher</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell scope="row">{row.id}</TableCell>
                        <TableCell component="th" scope="row">{row.name}</TableCell>
                        <TableCell align="right">{row.description}</TableCell>
                        <TableCell align="right">{moment(row.startDate).format("YYYY-MM-DD")}</TableCell>
                        <TableCell align="right">{moment(row.endDate).format("YYYY-MM-DD")}</TableCell>
                        <TableCell align="right">{row.teacher}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default List;