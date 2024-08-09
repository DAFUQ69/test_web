import React,{useState,useEffect} from 'react';
import Employee from './Employee';
import correctEmployeesData from './data/correct-employees.json';
import faultyEmployeesData from './data/faulty-employees.json';
import anotherFaultyEmployeesData from './data/another-faulty-employees.json';
import EmployeeSearch from './components/EmployeeSearch';
import EmployeeDetails from './components/EmployeeDetails';

function App(){
  const [rootEmployee,setRootEmployee]=useState(null);
  const [selectedEmployee,setSelectedEmployee]=useState(null);
  const [error,setError] = useState('');
  const [dataset,setDataset] = useState('correct');

  useEffect(()=>{
    try{
      let data;
      switch(dataset){
        case 'correct':
          data = correctEmployeesData;
          break;
        case 'faulty':
          data=faultyEmployeesData;
          break;
        case 'anotherFaulty':
          data=anotherFaultyEmployeesData;
          break;
        default:
          data = correctEmployeesData;
      }
      const root = Employee.buildHierarchy(data);
      setRootEmployee(root);
      setError('');
      setSelectedEmployee(null);
    }catch(error){
      setRootEmployee(null);
      setError(error.message);
      setSelectedEmployee(null);
    }
  },[dataset]);

  const handleSearch =(name) =>{
    const searchEmployee = (emp,targetName)=>{
      if(emp.name.toLowerCase()=== targetName.toLowerCase()){
        return emp;
      }
      for(let report of emp.directReports){
        const found = searchEmployee(report,targetName);
        if(found)return found;
      }
      return null;
    };
    if(rootEmployee){
      const result = searchEmployee(rootEmployee,name);
      setSelectedEmployee(result);
      if(!result){
        setError(`Employee named ${name} not found`);
      }else{
        setError('');
      }
    }else{
      setError('Employee hierarchy is not properly loaded');
    }
  };

  return(
    <div className='App'>
      <h1>Employee Hierarchy</h1>
      <div>
        <button onClick={()=>setDataset('correct')}>Load Correct Data</button>
        <button onClick={()=>setDataset('faulty')}>Load Faulty Data</button>
        <button onClick={()=>setDataset('anotherfaulty')}>Load Another Faulty Data</button>
      </div>
      {error &&<p className='error'>{error}</p>}
      <EmployeeSearch onSearch={handleSearch} />
      <EmployeeDetails employee={selectedEmployee} />
   </div>
  );
}

export default App;