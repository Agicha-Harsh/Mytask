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
                <td>${item.name || 'N/A'}</td>
                <td>${item.ainsty?.toFixed(2) || 'N/A'}</td>
                <td>${item.burley?.toFixed(2) || 'N/A'}</td>
                <td>${item.gp?.toFixed(2) || 'N/A'}</td>
                <td>${item.total?.toFixed(2) || 'N/A'}</td>
                <td><input type="text" class="form-group form-control table-input fs-12" value="${item.ref || ''}"></td>
                <td>
                    <select class="selector form-select fs-12">
                        <option value="">--Select--</option>
                        <option value="Bank 1" ${item.bank === 'Bank 1' ? 'selected' : ''}>Bank 1</option>
                        <option value="Bank 2" ${item.bank === 'Bank 2' ? 'selected' : ''}>Bank 2</option>
                    </select>
                </td>
                <td><input type="text" class="form-control fs-12" value="${item.notes || ''}"></td>
            </tr>`;
            tableBody.append(row);
        });
    } else {
        const noDataRow = `<tr><td colspan="9" class="text-center">No Data Available</td></tr>`;
        tableBody.append(noDataRow);
    }
}

// Event handlers for Save and Search buttons
$("#saveButton").on("click", function () {
    handleAction("save");
});

$("#searchButton").on("click", function () {
    handleAction("search");
});

// Function to handle Save/Search actions
async function handleAction(actionType) {
    // alert(`reaching here ${actionType}`)
    const formData = {
        date: $("#date").val(),
        bank: $("#bank").val(),
        month: $("#month").val(),
        year: $("#year").val(),
        ref: $("#ref").val(),
    };
    console.log("all the values of the form",formData)

    // let apiEndpoint = actionType === "save" ? "/api/save" : "/api/search";

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

// Function to fetch the list of banks from the backend
async function fetchBanks() {
    const bankDropdown = $("#bank");
    try {
        // const response = await fetch("/api/getBanks"); // Replace with your actual API endpoint
        // if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

        // const banks = await response.json(); // Assuming API returns an array of { value, label }
        const banks = [{label: "Bank1", value:1},{label: "Bank2", value:2}]
        bankDropdown.empty(); // Clear any existing options

        if (banks.length > 0) {
            banks.forEach(bank => {
                const option = `<option value="${bank.value}">${bank.label}</option>`;
                bankDropdown.append(option);
            });
        } else {
            bankDropdown.append('<option value="">No Banks Available</option>');
        }
    } catch (error) {
        console.error("Error fetching banks:", error);
        bankDropdown.html('<option value="">Error Loading Banks</option>');
    }
}

// Populate the table with initial example data
const exampleData = [
    { id: 1, name: "Jaleh Owens", ainsty: 5140.0, burley: 5140.0, gp: 0.0, total: 5140.0, ref: "123", bank: "Bank 1", notes: "" },
    { id: 2, name: "James Smith", ainsty: 1590.0, burley: 1590.0, gp: 0.0, total: 1590.0, ref: "456", bank: "Bank 2", notes: "" },
];

// Call the function to populate the bank dropdown on page load
$(document).ready(() => {
    fetchBanks();
    populateTable(exampleData); // Existing table population logic
});