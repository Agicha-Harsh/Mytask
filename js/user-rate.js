

// // Example data
// const data = [
//     { id: 1, name: "Jaleh Owens", ainsty: 5140.00, burley: 5140.00, gp: 0.00, total: 5140.00 },
//     { id: 2, name: "James Smith", ainsty: 1590.00, burley: 1590.00, gp: 0.00, total: 1590.00 },
//   ];
  
// Function to populate table
function populateTable(data) {
    const tableBody = $("#table-body");
    tableBody.empty(); // Clear existing rows

    if (data.length > 0) {
        data.forEach((item, index) => {
            const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.category || 'N/A'}</td>
                <td><select class="selector form-select fs-12">
                        <option value="">--Select--</option>
                        <option value="Fixed" ${item.salary === 'Fixed' ? 'selected' : ''}>Fixed</option>
                        <option value="Hourly" ${item.salary === 'Hourly' ? 'selected' : ''}>Hourly</option>
                    </select></td>
                <td><input type="text" class="form-control fs-12" value="${item.rate || ''}"></td>
                <td>${item.working_days ? `<input type="text" class="form-control fs-12" value="${item.working_days || ''}">` : ''}</td>
            </tr>`;
            tableBody.append(row);
        });

    
    } else {
        const noDataRow = `<tr><td colspan="9" class="text-center">No Data Available</td></tr>`;
        tableBody.append(noDataRow);
    }
}

// Event handlers for Save and Search buttons
$("#deleteButton").on("click", function () {
    handleAction("delete");
});

$("#searchButton").on("click", function () {
    handleAction("search");
});

// Function to handle Save/Search actions
async function handleAction(actionType) {
    // alert(`reaching here ${actionType}`)
    const formData = {
        practice: $("#practice").val(),
        role: $("#role-selector").val(),
        user: $("#user-selector").val(),
    };
    console.log("all the values of the form",formData)

    // let apiEndpoint = actionType === "delete" ? "/api/deleteall" : "/api/search";

    // try {
    //     const response = await fetch(apiEndpoint, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(formData),
    //     });

    //     if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    //     const data = await response.json();
    //     populateTable(data); // Update the table with the API response
    // } catch (error) {
    //     console.error("Error:", error);
    //     alert("An error occurred while processing your request.");
    // }
}

// Function to fetch the list of branches from the backend
async function fetchBranches() {
    const branchDropdown = $("#practice");
    try {
        // const response = await fetch("/api/getbranches"); // Replace with your actual API endpoint
        // if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

        // const branches = await response.json(); // Assuming API returns an array of { value, label }
        const branches = [{label: "Branch1", value:1},{label: "Branch2", value:2}]
        branchDropdown.empty(); // Clear any existing options

        if (branches.length > 0) {
            branches.forEach(branch => {
                const option = `<option value="${branch.value}">${branch.label}</option>`;
                branchDropdown.append(option);
            });
        } else {
            branchDropdown.append('<option value="">No Branches Available</option>');
        }
    } catch (error) {
        console.error("Error fetching branches:", error);
        branchDropdown.html('<option value="">Error Loading Branches</option>');
    }
}

// Function to fetch the list of branches from the backend
async function fetchUsers() {
    const branchDropdown = $("#user-selector");
    try {
        // const response = await fetch("/api/getbranches"); // Replace with your actual API endpoint
        // if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

        // const branches = await response.json(); // Assuming API returns an array of { value, label }
        const branches = [{label: "Jonathan Lee", value:1},{label: "Harsh", value:2}]
        branchDropdown.empty(); // Clear any existing options

        if (branches.length > 0) {
            branches.forEach(branch => {
                const option = `<option value="${branch.value}">${branch.label}</option>`;
                branchDropdown.append(option);
            });
        } else {
            branchDropdown.append('<option value="">No Users Available</option>');
        }
    } catch (error) {
        console.error("Error fetching branches:", error);
        branchDropdown.html('<option value="">Error Loading Branches</option>');
    }
}



// Function to fetch the list of roles from the backend
async function fetchRoles() {
    const roleDropdown = $("#role-selector");
    try {
        // const response = await fetch("/api/getroles"); // Replace with your actual API endpoint
        // if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

        // const roles = await response.json(); // Assuming API returns an array of { value, label }
        const roles = [{label: "Role1", value:1},{label: "Role2", value:2}]
        roleDropdown.empty(); // Clear any existing options

        if (roles.length > 0) {
            roles.forEach(role => {
                const option = `<option value="${role.value}">${role.label}</option>`;
                roleDropdown.append(option);
            });
        } else {
            roleDropdown.append('<option value="">No Role Available</option>');
        }
    } catch (error) {
        console.error("Error fetching roles:", error);
        roleDropdown.html('<option value="">Error Loading Role</option>');
    }
}



// Populate the table with initial example data
const exampleData = [
    { id: 1, category: "Emergency", salary: "Fixed", rate: "15", working_days: ""},
    { id: 2, category: "Service", salary: "Fixed", rate: "15", working_days: "15"},
    { id: 3, category: "Salary", salary: "Hourly", rate: "20", working_days: "10"},
];

// Call the function to populate the bank dropdown on page load
$(document).ready(() => {
    fetchRoles();
    fetchBranches();
    fetchUsers();
    populateTable(exampleData); // Existing table population logic
});