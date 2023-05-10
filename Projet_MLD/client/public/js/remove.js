var url = new URL("http://localhost:3001/api/clients");

const getTotalClients = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data.total;
};

const handleSubmit = (event) => {
    event.preventDefault();
    const id = parseInt(document.getElementById("id").value);
    const deleteUrl = new URL(`http://localhost:3001/api/clients?id=${id}`);
    fetch(deleteUrl, { method: "DELETE" })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error(error));
};