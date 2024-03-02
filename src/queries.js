// queries.js

import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
query {
  employees {
    id
    firstName
    lastName
    age
    dateOfJoining
    title
    department
    employeeType
    currentStatus
  }
}`;


export const ADD_EMPLOYEE = gql`
mutation AddEmployee(
    $firstName: String!,
    $lastName: String!,
    $age: Int!,
    $dateOfJoining: String!,
    $title: String!,
    $department: String!,
    $employeeType: String!) {
    addEmployee(
        firstName: $firstName,
        lastName: $lastName,
        age: $age,
        dateOfJoining: $dateOfJoining,
        title: $title,
        department: $department,
        employeeType: $employeeType
       ) {
        id
        firstName
        lastName
        age
        dateOfJoining
        title
        department
        employeeType
        currentStatus
    }
}
`;

export const GET_EMPLOYEE = gql`
  query employee($employeeId: String) {
    employee(id: $employeeId) {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation removeEmployee($id: String!) {
    removeEmployee(id: $id) {
      id
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
mutation updateEmployee(
    $id: String!,
    $firstName: String!,
    $lastName: String!,
    $age: Int!,
    $dateOfJoining: String!,
    $title: String!,
    $department: String!,
    $employeeType: String!) {
    updateEmployee(
    id: $id,
    firstName: $firstName,
    lastName: $lastName,
    age: $age,
    dateOfJoining: $dateOfJoining,
    title: $title,
    department: $department,
    employeeType: $employeeType) {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
}
`;