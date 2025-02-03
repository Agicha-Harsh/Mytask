
function updateClock() {
    var now = new Date();
    var options = { weekday: 'short', day: 'numeric', month: 'short' };
    var formattedDate = now.toLocaleDateString('en-US', options);
    document.getElementById("datetime").innerHTML = formattedDate;

    // Include hours, minutes, and seconds in the time string
    var timeString = now.toLocaleTimeString('en-US', { hour12: true });
    var timedetail = timeString.split(' ');

    document.getElementById("check-in-time").innerHTML = "00:00:00";
    document.getElementById("check-in-time-hour").innerHTML = "AM";
    document.getElementById("check-out-time").innerHTML = "00:00:00";
    document.getElementById("check-out-time-hour").innerHTML = "AM";

    // Update `check-out-time1` to include seconds
    var timeWithSeconds = now.toLocaleTimeString('en-US', { hour12: true });
    var timeDetailWithSeconds = timeWithSeconds.split(' ');
    document.getElementById("check-out-time1").innerHTML = timeDetailWithSeconds[0];
    document.getElementById("check-out-time-hour1").innerHTML = timeDetailWithSeconds[1];
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

// Initial call to set the clock
updateClock();

// Call the updateClock function every second
setInterval(updateClock, 1000);

// Work status static value
document.getElementById("work-status").innerHTML = "Start";
console.log("Clock is now updating every second.");

$(document).ready(function() {
    fetchBranches();

})
