import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

const EmployeeContext = createContext()

export const EmployeeProvider = ({ children }) => {
    const [employeeData, setEmployeeData] = useState([])
    const [selectedEmp, setSelectedEmp] = useState({})


    useEffect(() => {
        fetchEmployeeAll()
    }, [])


    // Fetch All Employees
    const fetchEmployeeAll = async () => {
        const result = await axios.get('http://localhost:5000/employee/')

        setEmployeeData(result.data)
    }

    // Fetch Employee
    const fetchEmployee = async (id) => {
        await axios.get(`http://localhost:5000/employee/${id}`)
            .then(res => {
                setSelectedEmp(res.data)
            })
            .catch(err => {
                throw err
            })
    }


    // Add Employee
    const addEmployee = async (formData) => {
        console.log("ADD :" + formData)
        axios.post('http://localhost:5000/employee/add/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                res.send.status(200)
            })
            .catch(err => {
                throw err
            });
    }

    // Delete Employee
    const deleteEmployee = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {

            axios.delete(`http://localhost:5000/employee/delete/${id}`)
                .then((res) => {
                    console.log(res)
                }
                )
                .catch(err => {
                    throw err
                });

        }
    }

    // Update Employee
    const updateEmployee = async (id, formData) => {

        console.log("10.0" + formData)
        await axios.put(`http://localhost:5000/employee/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            setEmployeeData(employeeData.map((item) => (item.id === id ? res : item)))
        })
            .catch(err => {
                throw err
            });
    }


    return (
        <EmployeeContext.Provider
            value={{
                employeeData,
                deleteEmployee,
                addEmployee,
                fetchEmployee,
                selectedEmp,
                updateEmployee,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContext
