export interface IGradeStudentData {
    courseId: number,
    courseName: string,
    grade1: number,
    grade2: number,
    grade3: number,
    grade4: number,
    grade5: number,
    final: number

}

export interface IGradeCourseData {
    studentId: number,
    studentName: string,
    grade1: number,
    grade2: number,
    grade3: number,
    grade4: number,
    grade5: number,
    final: number
}

export interface IGradesData {
    studentId: number,
    courseId: number,
    grade1: number,
    grade2: number,
    grade3: number,
    grade4: number,
    grade5: number,
}
