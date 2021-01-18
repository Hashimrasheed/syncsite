const Student = require('../../app/models/restaurant')


//Get All results
function getAllResults() {
    return Student.find()
}

//Teacher login
function teacherLogin(data) {
    const values = {
        Email : 'teacher@gmail.com',
        Password : '1234'
    }
    if(data.Email == values.Email && data.Password == values.Password) {
        return {status: 'Login success', data: values}
    } else {
        return {status: "Login failed", data: null}
    }
}

//Add student
function addStudent(data) {
    let student = new Student({
        Name: data.Name,
        Register_Number: data.Register_Number,
        Maths: data.Maths || 0,
        Science: data.Science || 0,
        English: data.English || 0,
        Total : Number(data.Maths + data.Science + data.English)
    })
    return student.save()
}

//Check Student Exist
function CheckStudentExist(regNum) {
    return Student.aggregate([
        {
            $match: {Register_Number: Number(regNum)}
        }
    ])
}

//Edit Student
function editStudent(data, regNum) {
    let student = {
        Maths: data.Maths || 0,
        Science: data.Science || 0,
        English: data.English || 0,
        Total : Number(data.Maths + data.Science + data.English)
    }
    return Student.updateOne({Register_Number: regNum}, {$set: student})

}

//delete Student
function deleteStudent(regNum) {
    return Student.deleteOne({Register_Number: regNum})
}


//Export db functions
module.exports = {
    teacherLogin,
    addStudent,
    CheckStudentExist,
    editStudent,
    deleteStudent,
    getAllResults
}
