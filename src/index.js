import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import EmployeeCreate from '../src/components/EmployeeCreate'
import EmployeeList from './components/EmployeeTable';
import EmployeeShow from './components/EmployeeShow';
import EmployeeEdit from './components/EmployeeEdit';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Your GraphQL server endpoint
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={<EmployeeList />} />
          <Route path='/create' element={<EmployeeCreate />} />
          <Route path='/show/:employeeId' element={<EmployeeShow />} />
          <Route path='/edit/:employeeId' element={<EmployeeEdit />} />
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
