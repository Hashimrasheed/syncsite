const {
    addStudent,
    CheckStudentExist,
    editStudent,
    deleteStudent,
    teacherLogin
} = require('../../../libs/commonDb/dbFunctions')
const jwt = require('jsonwebtoken')

function restaurants() {
    return {
        async teacherLogin(req, res) {
            if (!req.body.Email || !req.body.Password) {
                return res.status(401).json({ data: 'Email or password is not Entered' })
            }
            try {
                const student = await teacherLogin(req.body);
                if(student.data !== null) {
                    let token = jwt.sign(student.data, "loginsecret", {expiresIn: 360000});
                    res.status(201).json({auth: "success", token: token} )
                } else {
                    res.status(401).json({auth: "failed"} )
                }
                
            } catch (e) {
                res.status(500).json({ result: "Something went wrong", data: e.message })
            }
        },
        async addStudent(req, res) {
            if (!req.body.Name || !req.body.Register_Number) {
                return res.status(401).json({ data: 'INVALID CREDENTIALS' })
            }
            const exist = await CheckStudentExist(req.body.Register_Number)
            try {
                if (exist.length !== 1) {
                    const student = await addStudent(req.body);
                    res.status(201).json({ result: "Student Added", data: student })
                } else {
                    res.status(409).json({ result: "Student already exist", data: exist })
                }
            } catch (e) {
                res.status(500).json({ result: "Something went wrong", data: e.message })
            }
        },
        async editStudent(req, res) {
            let Register_Number = req.params.regNum
            if (req.body.Name || req.body.Register_Number) {
                return res.status(401).json({ data: 'INVALID CREDENTIALS' })
            }
            const exist = await CheckStudentExist(Register_Number)
            try {
                if (exist.length === 1) {
                    const student = await editStudent(req.body, Register_Number);
                    res.status(200).json({ result: "Student details edited", data: student })
                } else {
                    res.status(404).json({ result: "Student not exist" })
                }
            } catch (e) {
                res.status(500).json({ result: "Something went wrong", data: e.message })
            }
        },
        async deleteStudent(req, res) {
            let Register_Number = req.params.regNum
            const exist = await CheckStudentExist(Register_Number)
            try {
                if (exist.length === 1) {
                    const student = await deleteStudent(Register_Number);
                    res.status(200).json({ result: "Student details deleted", data: student })
                } else {
                    res.status(404).json({ result: "Student not exist" })
                }
            } catch (e) {
                res.status(500).json({ result: "Something went wrong", data: e.message })
            }
        }
    }
}

module.exports = restaurants