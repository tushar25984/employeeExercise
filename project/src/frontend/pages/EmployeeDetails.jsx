import React, { useState, useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeContext from '../context/EmployeeContext';


function EmployeeDetails() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        dateOfBirth: '',
        address: ''
    })

    const [validName, setValidName] = useState(false)
    const [validAge, setValidAge] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validationMising, setValidationMising] = useState("")

    const { name, age, email, dateOfBirth, address } = formData

    const { addEmployee, employeeData, fetchEmployee, selectedEmp, updateEmployee, deleteEmployee } =
        useContext(EmployeeContext)

    useEffect(() => {
        setFormData(selectedEmp);
    }, [selectedEmp])

    const onChange = (e) => {
        const nameValidRegex = /^[a-zA-Z ]*$/
        const emailValidation = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
        const ageValidation = /^[0-9]*$/

        if (e.target.name === "name") {
            setValidName(nameValidRegex.test(e.target.value))
        }
        if (e.target.name === "email") {
            setValidEmail(emailValidation.test(e.target.value))
        }
        if (e.target.name === "age") {
            setValidAge(ageValidation.test(e.target.value))
        }


        setFormData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value,
        }))

        if (e.target.name === "photo") {
            setFormData((prevState) => ({
                ...prevState, photo: e.target.files[0],
            }))
        }

    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(validName + " " + validAge + " " + validEmail)
        if (validName && validAge && validEmail) {
            addEmployee(formData)
            setValidationMising("")
        }
        else {
            if (!validAge) {

                setValidationMising("Please Enter numbers only")

            }
            if (!validName) {

                setValidationMising("Please Enter alphabets and spaces only")

            }
            if (!validEmail) {

                setValidationMising("Please Enter valid Email id")

            }

        }

    }
    const onSelected = async (e) => {
        console.log("1 : " + e.target.id.split("_")[1])
        await fetchEmployee(e.target.id.split("_")[1])
    }
    const onUpdate = async (e) => {
        e.preventDefault()

        await updateEmployee(e.target.id.split("_")[1], formData)
    }
    const onDelete = async (e) => {
        e.preventDefault()
        await deleteEmployee(e.target.id.split("_")[1])
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <section className="form">
                            <form onSubmit={onSubmit} encType="multipart/form-data">
                                <div className="form-group">
                                    <input type="text" required id='name' name='name' value={name} onChange={onChange} placeholder='Enter your Name' className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="age" id='age' name='age' value={age} onChange={onChange} placeholder='Enter your Age' className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="email" required id='email' name='email' value={email} onChange={onChange} placeholder='Enter your Email' className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="date" id='dateOfBirth' name='dateOfBirth' value={dateOfBirth} onChange={onChange} placeholder='Enter date of birth' className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="address" id='address' name='address' value={address} onChange={onChange} placeholder='address' className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        name="photo"
                                        id="photo"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-4"><button className="btn btn-block" onClick={onSubmit}>Add Employee</button></div>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
                <div className='error' color='red'>{validationMising}</div>
                <br />
                <br />

                {employeeData.map((emp, index) => (
                    <><div className="edit-wrapper p-4 m-2" key={index}>

                        <div className="row p-2">
                            <div className="col-sm-2 pt-3 name">{emp.name}</div>
                            <div className="col-sm-1 pt-3 age">{emp.age}</div>
                            <div className="col-sm-3 pt-3 email">{emp.email}</div>
                            <div className="col-sm-3 pt-3 address">{emp.address}</div>
                            <div className="col-sm-2 pt-3 dob">{emp.dob}</div>
                            <div className="col-sm-1 photo"><img height="auto" width={50} src={'http://localhost:5000/images/' + emp.photo} alt="" /></div>
                        </div>
                        <div className="row">

                            <div className="col-sm-2"><button id={"sel_" + emp._id} className="btn btn-block" onClick={onSelected}>Select</button></div>
                            <div className="col-sm-4"><button id={"update_" + emp._id} className="btn btn-block" onClick={onUpdate}>Edit Employee</button></div>
                            <div className="col-sm-4"><button id={"delete_" + emp._id} className="btn btn-block" onClick={onDelete}>Delete Employee</button></div>
                        </div>
                    </div>
                    </>))}


            </div>



        </>
    )
}

export default EmployeeDetails