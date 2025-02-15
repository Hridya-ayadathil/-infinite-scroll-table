const tableBody = document.querySelector("#userTable tbody");
const tableContainer = document.getElementById("tableContainer");
const loading = document.getElementById("loading");

let skip = 0;
let isFetching = false;


async function fetchUsers() {
    if (isFetching) return;
    isFetching = true;
    loading.style.display = "block";

    try {
        const response = await fetch(`https://dummyjson.com/users?limit=20&skip=${skip}`);
        const data = await response.json();

        data.users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.gender}</td>
                <td>${user.address.address}</td>
                <td>${user.phone}</td>
                <td>${user.address.postalCode}</td>
            `;
            tableBody.appendChild(row);
        });

        skip += 20; 

    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        isFetching = false;
        loading.style.display = "none";
    }
}

tableContainer.addEventListener("scroll", () => {
    if (tableContainer.scrollTop + tableContainer.clientHeight >= tableContainer.scrollHeight - 10) {
        fetchUsers();
    }
});
fetchUsers();
