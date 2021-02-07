class Company {
  constructor() {
    this.departments = []; 
  }

  addEmployee(username, salary, position, department) {
    for (let i = 0; i < arguments.length; i++) {
      if(arguments[i] == '' || arguments[i] == undefined || arguments[i] == null) {
        throw new Error('Invalid input!');
      }
    }
    
    if(Number(salary) < 0) {
      throw new Error('Invalid input!');
    }

    if(!this.departments.some(x => x.departmentName == department)) {
      this.departments.push({
        departmentName: department,
        totalSalary: 0,
        employees: []
      });
    }

    let indexDepartment = this.departments.findIndex(x => x.departmentName == department);
    this.departments[indexDepartment].totalSalary += Number(salary);
    let objEmployee = {
      name: username,
      salary: Number(salary),
      position: position
    };
    this.departments[indexDepartment].employees.push(objEmployee);

    return `New employee is hired. Name: ${username}. Position: ${position}`;
  }

  bestDepartment() {
    let bestDepartIndex = -1;
    let bestAvgSalary = 0;
    for (let i = 0; i < this.departments.length; i++) {
      const department = this.departments[i];
      let avgSalary = department.totalSalary / department.employees.length;
      if(avgSalary > bestAvgSalary) {
        bestAvgSalary = avgSalary;
        bestDepartIndex = i;
      }
    }

    let str = '';
    let obj = this.departments[bestDepartIndex];
    str += `Best Department is: ${obj.departmentName}\n`;
    str += `Average salary: ${(obj.totalSalary / obj.employees.length).toFixed(2)}\n`;
    obj.employees.sort(function(a, b) {
      if (a.salary > b.salary) {
        return -1;
      } else if (a.salary < b.salary) {
        return 1;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    for (let i = 0; i < obj.employees.length; i++) {
      str += `${obj.employees[i].name} ${obj.employees[i].salary} ${obj.employees[i].position}\n`;
    }

    return str.trim();
  }
}