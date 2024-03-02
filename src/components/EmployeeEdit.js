import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EMPLOYEE, UPDATE_EMPLOYEE } from '../queries';

const EmployeeEdit = () => {
  const history = useNavigate();
  const { employeeId } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [employeeType, setEmployeeType] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { employeeId },
  });

  useEffect(() => {
    if (data && data.employee) {
      const { employee } = data;
      setFirstName(employee.firstName || '');
      setLastName(employee.lastName || '');
      setAge(employee.age || '');
      setDateOfJoining(employee.dateOfJoining || '');
      setTitle(employee.title || '');
      setDepartment(employee.department || '');
      setEmployeeType(employee.employeeType || '');
      setCurrentStatus(employee.currentStatus || '');
    }
  }, [data]);

  const [updateEmployee, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => history('/')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add validation logic here for fields like age and dateOfJoining
    if( !firstName || !lastName || !age || !dateOfJoining || !title || !department || !employeeType){
        setErrorMessage("Please Fill all fields");
        return;
    }
    if (!age || isNaN(parseInt(age)) || parseInt(age) < 18) {
        setErrorMessage("Age must be a valid number and at least 18");
        return;
    }
    try {
      await updateEmployee({
        variables: {
          id: employeeId,
          firstName,
          lastName,
          age: parseInt(age),
          dateOfJoining,
          title,
          department,
          employeeType,
          currentStatus: !!currentStatus // Convert to boolean
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
      setCurrentStatus('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
            <div className="card mt-4">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Edit Employee</h3>
                </div>
                <div className="card-body">
                    <Link to="/" className="btn btn-secondary mb-3">Employee List</Link>
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
                            <input type="date" className="form-control" id="dateOfJoining" value={(dateOfJoining.split('T')[0])} onChange={(e) => setDateOfJoining(e.target.value)} />
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

export default EmployeeEdit;
