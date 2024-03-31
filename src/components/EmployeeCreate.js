import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE } from '../queries';

const EmployeeCreate = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE, {
        onCompleted: () => navigate('/')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !age || !dateOfJoining || !title || !department || !employeeType) {
            setErrorMessage("Please fill in all fields.");
            return;
        }
        if (isNaN(parseInt(age)) || parseInt(age) < 18) {
            setErrorMessage("Age must be a valid number and at least 18.");
            return;
        }

        try {
            await addEmployee({
                variables: {
                    firstName,
                    lastName,
                    age: parseInt(age),
                    dateOfJoining,
                    title,
                    department,
                    employeeType
                }
            });

            // Reset form fields
            setFirstName('');
            setLastName('');
            setAge('');
            setDateOfJoining('');
            setTitle('');
            setDepartment('');
            setEmployeeType('');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="container">
            <div className="card mt-4">
                <div className="card-header bg-dark text-white">
                    <h3 className="mb-0">Add Employee</h3>
                </div>
                <div className="card-body">
                    
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age:</label>
                            <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfJoining">Date of Joining:</label>
                            <input type="date" className="form-control" id="dateOfJoining" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <select className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)}>
                                <option value="">Select Title</option>
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                                <option value="Director">Director</option>
                                <option value="VP">VP</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <select className="form-control" id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                <option value="">Select Department</option>
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Engineering">Engineering</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeeType">Employee Type:</label>
                            <select className="form-control" id="employeeType" value={employeeType} onChange={(e) => setEmployeeType(e.target.value)}>
                                <option value="">Select Employee Type</option>
                                <option value="FullTime">Full-Time</option>
                                <option value="PartTime">Part-Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Seasonal">Seasonal</option>
                            </select>
                        </div>
                        
                        <button type="submit" className="btn btn-success m-3">Submit</button>
                        {loading && <p>Loading...</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCreate;
