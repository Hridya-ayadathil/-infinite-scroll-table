const tableBody = document.querySelector("#userTable tbody");
const tableContainer = document.getElementById("tableContainer");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

let skip = 0;
let isFetching = false;

async function fetchUsers() {
    if (isFetching) return;
    isFetching = true;
    loading.style.display = "block";
    errorMessage.textContent = ""; // Clear previous errors

    try {
        const response = await fetch(`https://dummyjson.com/users?limit=15&skip=${skip}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch data. Please try again later.");
        }

        const data = await response.json();

        if (data.users.length === 0) {
            errorMessage.textContent = "No more users to load.";
            return;
        }

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

        skip += 15; // Increment for next batch
    } catch (error) {
        errorMessage.textContent = error.message;
    } finally {
        isFetching = false;
        loading.style.display = "none";
    }
}

// Infinite Scroll Event Listener
tableContainer.addEventListener("scroll", () => {
    if (tableContainer.scrollTop + tableContainer.clientHeight >= tableContainer.scrollHeight - 10) {
        fetchUsers();
    }
});

// Initial Fetch
fetchUsers();
