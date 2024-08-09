class Employee {
    constructor(id, name, managerId) {
        this.id = id;
        this.name = name;
        this.managerId = managerId;
        this.directReports = [];
    }

    addDirectReport(employee) {
        this.directReports.push(employee);
    }

    getDirectReportsCount() {
        return this.directReports.length;
    }

    getIndirectReportsCount() {
        let count = 0;
        this.directReports.forEach(report => {
            count += 1 + report.getIndirectReportsCount();
        });
        return count;
    }

    static buildHierarchy(employeeList) {
        const employees = new Map();
        const managerSet = new Set();
        let root = null;

        console.log("Building employee hierarchy...");

        employeeList.forEach(emp => {
            if(!emp.id || !emp.name){
                console.log(`Processing employee: ${emp.name} (ID: ${emp.id}, Manager ID: ${emp.managerId})`);
                throw new Error("Invalid employee data found");
            }
            employees.set(emp.id, new Employee(emp.id, emp.name, emp.managerId));
            if (emp.managerId !== null) {
                if (managerSet.has(emp.managerId)) {
                    console.error(`Employee ${emp.name} has multiple managers.`);
                    throw new Error(`Employee ${emp.name} has multiple managers`);
                }
                managerSet.add(emp.managerId);
            }
        });

        employees.forEach(emp => {
            if (emp.managerId === null) {
                if (root) {
                    console.error(`Multiple root employees found: ${root.name} and ${emp.name}`);
                    throw new Error(`Multiple root employees found: ${root.name} and ${emp.name}`);
                }
                root = emp;
            } else {
                const manager = employees.get(emp.managerId);
                if (manager) {
                    manager.addDirectReport(emp);
                } else {
                    console.error(`Manager with id ${emp.managerId} not found for employee ${emp.name}`);
                    throw new Error(`Manager with id ${emp.managerId} not found for employee ${emp.name}`);
                }
            }
        });

        if (!root) {
            console.error("No root employee found");
            throw new Error("No root employee found");
        }

        console.log("Validating hierarchy...")
        Employee.validateHierarchy(root);

        console.log("Employee hierarchy successfully built")
        return root;
    }

    static validateHierarchy(root){
        function traverse(employee,depth =0){
            console.log(`${' '.repeat(depth * 2)}Employee: ${employee.name}, Direct Reports: ${employee.getDirectReportsCount()}`);
            employee.directReports.forEach(report => traverse(report,depth+1));
        }
        traverse(root);
    }
    
}
export default Employee;