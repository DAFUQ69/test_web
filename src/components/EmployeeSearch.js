import React,{useState} from 'react';

function EmployeeSearch({onSearch}){
    const [searchTerm,setSearchTerm] = useState('');

    const handleSearch = ()=>{
        if(searchTerm.trim() ===''){
            alert('Please enter an employee name to search.');
            return
        }
        onSearch(searchTerm);
    };

    return(
        <div>
            <input
            type='text'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder='Search for an employee'
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default EmployeeSearch