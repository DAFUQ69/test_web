import React from 'react';

function EmployeeDetails({employee}){
    if(!employee){
        return <p>No employee found</p>;
    }

    const getManagers = (emp,managers = [])=>{
        if(emp.managerId === null)return managers;
        const manager = emp.managerId;
        if (manager){
            managers.push (manager.name);
            return getManagers(manager,managers);
        }
        return managers;
    }

    const managers = getManagers(employee);

    return(
        <div>
            <h2>{employee.name}</h2>
            <p>Direct Reports: {employee.getDirectReportsCount()}</p>
            <p>Indirect Reports: {employee.getIndirectReportsCount()}</p>
            <p>Managers:{managers.join(', ')}</p>
        </div>
    )
}

export default EmployeeDetails;