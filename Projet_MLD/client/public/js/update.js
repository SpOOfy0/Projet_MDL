// Create a new URL object to make API requests
var url = new URL("http://localhost:3001/api/clients/all");

// Wait for the DOM to be fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Get the input field for the client ID
    const id = document.getElementById("id");
    // Add an event listener that calls the handleChange function whenever the user inputs something in the ID field
    id.addEventListener("input", handleChange);
});

// Function to handle the change event on the ID input field
async function handleChange() {
    try {
        // Send a GET request to the API to get all clients
        const response = await fetch(url);
        const data = await response.json();
        // Retrieve the client with the ID entered by the user
        const item = data.clients[parseInt(id.value) - 1];
        // Log the retrieved client object to the console
        console.log(item);
        // Fill in the form fields with the values of the retrieved client object
        document.getElementById("email").value = item.email;
        document.getElementById("name2").value = item.first;
        document.getElementById("name").value = item.last;
        document.getElementById("society").value = item.company;
        document.getElementById("country").value = item.country;
        // Format the date to display it in the correct format
        const date = new Date(item.created_at);
        const newDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        document.getElementById("date").value = newDate;  
    } catch (error) {
        console.error(error);
    } 
}

// Function to handle the form submission
async function handleSubmit(event) {
    //Preventing page refresh
    event.preventDefault();
    // Get the value of the ID field and convert it to an integer
    const id = parseInt(document.getElementById("id").value);
    // Create a client object with the values of the form fields
    const client = {
        id: id,
        email: document.getElementById("email").value,
        first: document.getElementById("name2").value,
        last: document.getElementById("name").value,
        company: document.getElementById("society").value,
        created_at: document.getElementById("date").value,
        country: document.getElementById("country").value
    };
    // Send a PUT request to the API to update the client with the new data
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(client)
        });
        const data = await response.json();
        // Log a success message to the console
        console.log("Update successful");
        // Display an alert with the message returned by the server
        alert(data.message);
    } catch (error) {
        console.error(error);
    }
}




