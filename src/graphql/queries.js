import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export const GET_PAGINATED_EMPLOYEES = gql`
  query GetPaginatedEmployees(
    $page: Int!
    $limit: Int!
    $filter: EmployeeFilterInput
    $sort: EmployeeSortInput
  ) {
    paginatedEmployees(
      page: $page
      limit: $limit
      filter: $filter
      sort: $sort
    ) {
      employees {
        id
        name
        email
        age
        department
        position
        salary
        subjects
        attendance
        joiningDate
        phone
        address
        status
        flagged
      }
      totalCount
      pageInfo {
        currentPage
        totalPages
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      name
      email
      age
      department
      position
      salary
      subjects
      attendance
      joiningDate
      phone
      address
      status
      flagged
      createdAt
      updatedAt
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: CreateEmployeeInput!) {
    addEmployee(input: $input) {
      id
      name
      email
      department
      position
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      email
      age
      department
      position
      salary
      subjects
      attendance
      status
      flagged
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export const TOGGLE_EMPLOYEE_FLAG = gql`
  mutation ToggleEmployeeFlag($id: ID!) {
    toggleEmployeeFlag(id: $id) {
      id
      flagged
    }
  }
`;

export const GET_EMPLOYEE_STATS = gql`
  query GetEmployeeStats {
    employeeStats {
      totalEmployees
      activeEmployees
      averageAge
      averageSalary
      departmentDistribution {
        department
        count
      }
    }
  }
`;
