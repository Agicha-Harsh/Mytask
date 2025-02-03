function generateData(users) {
  const baseData = {
    CPD: [
      { sub: 'Clinical Governance' },
      { sub: 'Companies Handling' },
      { sub: 'Disinfection and Decontamination' },
      { sub: 'Health and safety' },
      { sub: 'Legal Ethical' },
      { sub: 'Medical Emergency And First Aid' },
      { sub: 'Oral cancer' },
      { sub: 'Radiography And Radiation Protection' },
      { sub: 'Safeguarding' }
    ],
    DBS: [
      { sub: 'DBS' }
    ],
    Documents: [
      { sub: 'Contract' },
      { sub: 'CV' },
      { sub: 'Resume' }
    ]
  };  
  const data = JSON.parse(JSON.stringify(baseData));
  for (let category in data) {
    data[category].forEach(item => {
      users.forEach(user => {
        item[user] = Math.ceil(Math.random() * 3); // Randomly assign 1, 2, or 3 for each user
      });
    });
  }
  return data;
}

const users = [
  'jaleh', 'janet', 'john', 'melody', 'alex', 'sam', 
  'chris', 'taylor', 'morgan', 'blake', 'casey', 'riley', 
  'jordan', 'quinn', 'sydney', 'dakota','harsh','sagar','nikhil','sanjay'
];
const data = generateData(users);

function createTableHeader(users) {
  const tableHead = document.querySelector("table thead tr");
  users.forEach(user => {
    let th = document.createElement('th');
    th.textContent = user.charAt(0).toUpperCase() + user.slice(1); // Capitalize user name
    tableHead.appendChild(th);
  });
}

// Call this function to set up headers
createTableHeader(users);

function populateTable(data, users) {
  console.log("reaching here2 ", data);
  let tableBody = document.getElementById('table-body');
  let rowIndex = 1;

  // Loop through each category (CPD, DBS, etc.)
  for (let category in data) {
    if (data.hasOwnProperty(category)) {
      // Get the array of items for the current category
      let items = data[category];

      items.forEach((item, itemIndex) => {
        let row = document.createElement('tr');
        
        // Serial number and category only for the first item in the category
        row.innerHTML = `
          <td>${itemIndex === 0 ? rowIndex++ : ''}</td>
          <td>${itemIndex === 0 ? category : ''}</td>
          <td>${item.sub}</td>
        `;

        // Add columns for each user dynamically
        users.forEach(user => {
          let userValue = item[user];
          let color = userValue === 1 ? '#038d00' : userValue === 2 ? '#c52525' : '#ffb800';
            // <td>${userValue === 1 ? `<i class="fa fa-check" style="color: #038d00"></i>` : userValue === 2 ? `<i class="bi bi-x-lg" style="color: #c52525" id="bi-bi-x-lg">` : userValue === 3 ? `<i class="bi bi-calendar-x" style="color: #0A8EA5" id="bi-bi-calendar-x"></i>` : `<i class="bi bi-hourglass-split" style="color: #ffbb00" id="bi-bi-hourglass-split"></i>`}</td>
            row.innerHTML += `<td>
              ${
                userValue === 1
                  ? `<img class="d-flex justify-content-center ms-sm-2"  src="../icons/icon _tick circle_.png" alt="Tick Icon" style="width: 15px; height: 15px;">`
                  : userValue === 2
                  ? `<img  class="d-flex justify-content-center ms-sm-2" src="../icons/notuploaddoc.png" alt="Cross Icon" style="width: 15px; height: 15px;">`
                  : `<img class="d-flex justify-content-center ms-sm-2" src="../icons/pendingdoc.png" alt="Hourglass Icon" style="width: 15px; height: 15px;">`
                  // : `<img src="../icons/calendar-x-svgrepo-com.png" alt="Calendar Icon" style="width: 15px; height: 15px;">`
              }
            </td>`;
          // row.innerHTML += `
          //   <td>${userValue === 1 ? `<img src="../icons/icon_tick_circle_.png" alt="Join our Quicker Easier Accurate" class="left-logo">` : userValue === 2 ? `<i class="bi bi-x-lg" style="color: #c52525" id="bi-bi-x-lg">` : userValue === 3 ? `<i class="bi bi-calendar-x" style="color: #0A8EA5" id="bi-bi-calendar-x"></i>` : `<i class="bi bi-hourglass-split" style="color: #ffbb00" id="bi-bi-hourglass-split"></i>`}</td>
          // `;
        });

        // Append the new row to the table body
        tableBody.appendChild(row);
      });
    }
  }
}

// Call the populateTable function with the generated data and users
populateTable(data, users);
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
          roleDropdown.append('<option value="">No Roles Available</option>');
      }
  } catch (error) {
      console.error("Error fetching roles:", error);
      roleDropdown.html('<option value="">Error Loading Roles</option>');
  }
}

async function fetchBranches() {
  const branchDropdown = $("#branch");
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

$(document).ready(function() {
// Call the function to populate the bank dropdown on page load

  fetchRoles();
  fetchBranches();
});

