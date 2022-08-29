const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let Employee = require('../models/employee.modal');

const DIR = './images/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

//Add new employee
router.route('/add').post(upload.single('photo'), (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const dob = req.body.dateOfBirth;
    const address = req.body.address;
    const photo = req.file.filename;
    const newEmpData = {
        name,
        age,
        email,
        dob,
        address,
        photo
    }

    const newEmployee = new Employee(newEmpData);

    newEmployee.save()
        .then((res) => console.log(res))
        .catch(err => {
            throw err
        })

});

//Get All employee
router.route('/').get((req, res) => {
    Employee.find((error, data) => {
        if (error) {
            return (error)
        } else {
            res.json(data)
        }
    })
})

router.route('/:id').get((req, res, next) => {

    Employee.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {

            res.json(data)
        }
    })
})



router.route('/update/:id').put(upload.single('photo'), (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const dob = req.body.dateOfBirth;
    const address = req.body.address;
    const photo = req.file.filename;

    Employee.findOneAndUpdate(id,
        {
            $set: {
                name,
                age,
                email,
                dob,
                address,
                photo
            }
        },
        { new: true }
    ).then((res) => {

        console.log(res)
    })
        .catch(err => {
            res.send(err);
        });
});

router.route('/delete/:id').delete((req, res) => {
    Employee.findOneAndDelete(req.params.id).then((res) => {
        console.log(res)
    })
        .catch(err => {
            throw err
        })

});

module.exports = router;