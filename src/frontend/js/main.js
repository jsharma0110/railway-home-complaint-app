document.addEventListener('DOMContentLoaded', function() {
    showPage('home');
});

let predefinedWorkers = JSON.parse(localStorage.getItem('predefinedWorkers')) || [
    { username: 'worker1', name: 'John Doe', phone: '1234567890', email: 'john@example.com', expertise: 'Plumbing' },
    { username: 'worker2', name: 'Jane Smith', phone: '0987654321', email: 'jane@example.com', expertise: 'Electrical' },
    { username: 'worker3', name: 'Bob Johnson', phone: '1112223333', email: 'bob@example.com', expertise: 'Structural' },
];

function showPage(page) {
    const mainContent = document.getElementById('main-content');

    if (page === 'home') {
        mainContent.innerHTML = `
            <div>
                <h2>Welcome to the Railway Complaint System</h2>
                <p>Submit and track your complaints easily.</p>
            </div>
        `;
    } else if (page === 'submitComplaint') {
        mainContent.innerHTML = `
            <div>
                <h2>Submit Your Complaint</h2>
                <form onsubmit="submitComplaint(event)">
                    <div>
                        <label for="quarterNumber">Quarter Number:</label>
                        <input type="text" id="quarterNumber" name="quarterNumber" required>
                    </div>
                    <div>
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div>
                        <label for="phone">Phone Number:</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div>
                        <label for="email">Email Address:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div>
                        <label for="complaintType">Complaint Type:</label>
                        <select id="complaintType" name="complaintType" required>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Structural">Structural</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label for="urgency">Urgency Level:</label>
                        <select id="urgency" name="urgency" required>
                            <option value="Regular">Regular</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Emergency">Emergency</option>
                        </select>
                    </div>
                    <div>
                        <label for="complaint">Complaint Description:</label>
                        <textarea id="complaint" name="complaint" required></textarea>
                    </div>
                    <div>
                        <label for="photo">Add Photos (if any):</label>
                        <input type="file" id="photo" name="photo" accept="image/*">
                    </div>
                    <div>
                        <label for="date">Select Date:</label>
                        <input type="date" id="date" name="date" required>
                    </div>
                    <div>
                        <label for="timeframe">Select Time Frame:</label>
                        <select id="timeframe" name="timeframe" required>
                            ${generateTimeOptions()}
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        `;
    } else if (page === 'viewComplaints') {
        mainContent.innerHTML = `
            <div>
                <h2>Your Complaints</h2>
                <ul id="complaint-list"></ul>
            </div>
        `;
        loadComplaints();
    } else if (page === 'adminLogin') {
        mainContent.innerHTML = `
            <div>
                <h2>Admin Login</h2>
                <form onsubmit="adminLogin(event)">
                    <div>
                        <label for="adminUsername">Username:</label>
                        <input type="text" id="adminUsername" name="adminUsername" required>
                    </div>
                    <div>
                        <label for="adminPassword">Password:</label>
                        <input type="password" id="adminPassword" name="adminPassword" required>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        `;
    } else if (page === 'adminDashboard') {
        mainContent.innerHTML = `
            <div>
                <h2>Admin Dashboard</h2>
                <button onclick="sortComplaintsByUrgency()">Sort by Urgency</button>
                <div id="admin-complaint-list"></div>
            </div>
        `;
        loadAdminComplaints();
    } else if (page === 'workerLogin') {
        mainContent.innerHTML = `
            <div>
                <h2>Worker Login</h2>
                <form onsubmit="workerLogin(event)">
                    <div>
                        <label for="workerUsername">Username:</label>
                        <input type="text" id="workerUsername" name="workerUsername" required>
                    </div>
                    <div>
                        <label for="workerPassword">Password:</label>
                        <input type="password" id="workerPassword" name="workerPassword" required>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        `;
    } else if (page === 'workerDashboard') {
        const loggedInWorker = localStorage.getItem('loggedInWorker');
        const workerDetails = predefinedWorkers.find(worker => worker.username === loggedInWorker);

        if (workerDetails) {
            mainContent.innerHTML = `
                <div>
                    <h2>Worker Dashboard</h2>
                    <div>
                        <p><strong>Name:</strong> ${workerDetails.name}</p>
                        <p><strong>Phone Number:</strong> ${workerDetails.phone}</p>
                        <p><strong>Email Address:</strong> ${workerDetails.email}</p>
                        <p><strong>Specialty:</strong> ${workerDetails.expertise}</p>
                    </div>
                    <div id="worker-complaint-list"></div>
                </div>
            `;
            loadWorkerComplaints();
        } else {
            mainContent.innerHTML = `
                <div>
                    <h2>Worker Dashboard</h2>
                    <form onsubmit="workerDetails(event)">
                        <div>
                            <label for="workerUsername">Username:</label>
                            <input type="text" id="workerUsername" name="workerUsername" required>
                        </div>
                        <div>
                            <label for="workerName">Name:</label>
                            <input type="text" id="workerName" name="workerName" required>
                        </div>
                        <div>
                            <label for="workerPhone">Phone Number:</label>
                            <input type="tel" id="workerPhone" name="workerPhone" required>
                        </div>
                        <div>
                            <label for="workerEmail">Email Address:</label>
                            <input type="email" id="workerEmail" name="workerEmail" required>
                        </div>
                        <div>
                            <label for="workerSpecialty">Specialty:</label>
                            <select id="workerSpecialty" name="workerSpecialty" required>
                                <option value="Plumbing">Plumbing</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Structural">Structural</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <button type="submit">Save Details</button>
                    </form>
                    <div id="worker-complaint-list"></div>
                </div>
            `;
        }
    }
}

function generateTimeOptions() {
    const times = [];
    for (let i = 8; i <= 20; i++) {
        let time = i < 12 ? `${i} AM` : i === 12 ? `${i} PM` : `${i - 12} PM`;
        times.push(`<option value="${time}">${time}</option>`);
    }
    return times.join('');
}

function submitComplaint(event) {
    event.preventDefault();

    const quarterNumber = document.getElementById('quarterNumber').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const complaintType = document.getElementById('complaintType').value;
    const urgency = document.getElementById('urgency').value;
    const complaint = document.getElementById('complaint').value;
    const availabilityDate = document.getElementById('date').value;
    const availabilityTime = document.getElementById('timeframe').value;

    const newComplaint = { 
        quarterNumber, 
        name, 
        phone, 
        email, 
        complaintType, 
        urgency, 
        complaint, 
        availabilityDate,
        availabilityTime,
        status: 'Submitted',
        timestamp: new Date().toISOString() // Use ISO string for timestamp
    };

    fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComplaint)
    })
    .then(response => response.json())
    .then(data => {
        alert('Complaint submitted successfully!');
        // Optionally, clear the form fields
        document.getElementById('quarterNumber').value = '';
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
        document.getElementById('complaintType').value = '';
        document.getElementById('urgency').value = '';
        document.getElementById('complaint').value = '';
        document.getElementById('date').value = '';
        document.getElementById('timeframe').value = '';

        // Update the UI by showing the complaints page
        showPage('viewComplaints');
        // Load complaints to refresh the list
        loadComplaints();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit complaint.');
    });
}


function loadComplaints() {
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    const complaintList = document.getElementById('complaint-list');
    complaintList.innerHTML = '';

    complaints.forEach((complaint, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `Complaint #${index + 1}: ${complaint.complaint} (Status: ${complaint.status})
        <button onclick="viewComplaintDetails(${index})">View Details</button>`;
        complaintList.appendChild(listItem);
    });
}

function viewComplaintDetails(index) {
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    const complaint = complaints[index];
    alert(`Complaint Details:
    Quarter Number: ${complaint.quarterNumber}
    Name: ${complaint.name}
    Phone: ${complaint.phone}
    Email: ${complaint.email}
    Complaint Type: ${complaint.complaintType}
    Urgency: ${complaint.urgency}
    Description: ${complaint.complaint}
    Availability Date: ${complaint.availabilityDate}
    Availability Time: ${complaint.availabilityTime}
    Status: ${complaint.status}
    Assigned Worker: ${complaint.worker || 'Not Assigned'}
    Worker Details: ${getWorkerDetails(complaint.worker)}`);
}

function getWorkerDetails(workerUsername) {
    const worker = predefinedWorkers.find(w => w.username === workerUsername);
    return worker ? `Name: ${worker.name}, Phone: ${worker.phone}, Email: ${worker.email}` : 'No worker assigned';
}

function adminLogin(event) {
    event.preventDefault();

    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    // Simple login check for demonstration (this should be more secure in a real application)
    if (username === 'admin' && password === 'password') {
        alert('Login successful');
        showPage('adminDashboard');
    } else {
        alert('Invalid credentials');
    }
}

function loadAdminComplaints() {
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    const adminComplaintList = document.getElementById('admin-complaint-list');
    adminComplaintList.innerHTML = '';

    complaints.forEach((complaint, index) => {
        const complaintItem = document.createElement('div');
        complaintItem.innerHTML = `
            <div>
                <h3>Complaint #${index + 1}</h3>
                <p>Quarter Number: ${complaint.quarterNumber}</p>
                <p>Name: ${complaint.name}</p>
                <p>Phone: ${complaint.phone}</p>
                <p>Email: ${complaint.email}</p>
                <p>Type: ${complaint.complaintType}</p>
                <p>Urgency: ${complaint.urgency}</p>
                <p>Description: ${complaint.complaint}</p>
                <p>Availability Date: ${complaint.availabilityDate}</p>
                <p>Availability Time: ${complaint.availabilityTime}</p>
                <p>Status: ${complaint.status}</p>
                <label for="workerSelect${index}">Assign Worker:</label>
                <select id="workerSelect${index}" onchange="assignWorker(${index}, this.value)">
                    <option value="">Select a worker</option>
                    ${generateWorkerOptions(complaint.complaintType)}
                </select>
            </div>
        `;
        adminComplaintList.appendChild(complaintItem);
    });
}

function generateWorkerOptions(complaintType) {
    const options = predefinedWorkers
        .filter(worker => worker.expertise === complaintType)
        .map(worker => `<option value="${worker.username}">${worker.name} (${worker.expertise})</option>`);
    return options.join('');
}

function sortComplaintsByUrgency() {
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];

    // Sort complaints by urgency and then by first-come, first-served
    complaints.sort((a, b) => {
        const urgencyOrder = {
            'Emergency': 3,
            'Urgent': 2,
            'Regular': 1
        };
        if (urgencyOrder[b.urgency] - urgencyOrder[a.urgency] !== 0) {
            return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        }
        return a.timestamp - b.timestamp;
    });

    localStorage.setItem('complaints', JSON.stringify(complaints));

    // Reload the admin complaints to reflect the sorted order
    loadAdminComplaints();
}

function assignWorker(index, workerUsername) {
    if (workerUsername) {
        const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
        const worker = predefinedWorkers.find(w => w.username === workerUsername);
        complaints[index].worker = workerUsername;
        complaints[index].status = 'Assigned';
        localStorage.setItem('complaints', JSON.stringify(complaints));
        loadAdminComplaints();
        alert(`Worker ${worker.name} assigned successfully`);
    }
}

function workerLogin(event) {
    event.preventDefault();

    const username = document.getElementById('workerUsername').value;
    const password = document.getElementById('workerPassword').value;

    // Simple login check for demonstration (this should be more secure in a real application)
    if (username && password) {
        localStorage.setItem('loggedInWorker', username);
        alert('Login successful');
        showPage('workerDashboard');
    } else {
        alert('Invalid credentials');
    }
}

function loadWorkerComplaints() {
    const loggedInWorker = localStorage.getItem('loggedInWorker');
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    const workerComplaintList = document.getElementById('worker-complaint-list');
    workerComplaintList.innerHTML = '';

    const workerComplaints = complaints.filter(complaint => complaint.worker === loggedInWorker);

    if (workerComplaints.length === 0) {
        workerComplaintList.innerHTML = '<p>No complaints assigned</p>';
    } else {
        workerComplaints.forEach((complaint, index) => {
            const complaintItem = document.createElement('div');
            complaintItem.innerHTML = `
                <div>
                    <h3>Complaint #${index + 1}</h3>
                    <p>Quarter Number: ${complaint.quarterNumber}</p>
                    <p>Name: ${complaint.name}</p>
                    <p>Phone: ${complaint.phone}</p>
                    <p>Email: ${complaint.email}</p>
                    <p>Type: ${complaint.complaintType}</p>
                    <p>Urgency: ${complaint.urgency}</p>
                    <p>Description: ${complaint.complaint}</p>
                    <p>Availability Date: ${complaint.availabilityDate}</p>
                    <p>Availability Time: ${complaint.availabilityTime}</p>
                    <p>Status: ${complaint.status}</p>
                    <button onclick="markAsCompleted(${index})">Mark as Completed</button>
                </div>
            `;
            workerComplaintList.appendChild(complaintItem);
        });
    }
}

function markAsCompleted(index) {
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    const loggedInWorker = localStorage.getItem('loggedInWorker');
    const workerComplaints = complaints.filter(complaint => complaint.worker === loggedInWorker);

    workerComplaints[index].status = 'Completed';
    localStorage.setItem('complaints', JSON.stringify(complaints));
    loadWorkerComplaints();
    alert('Complaint marked as completed');
}

function workerDetails(event) {
    event.preventDefault();

    const username = document.getElementById('workerUsername').value;
    const name = document.getElementById('workerName').value;
    const phone = document.getElementById('workerPhone').value;
    const email = document.getElementById('workerEmail').value;
    const specialty = document.getElementById('workerSpecialty').value;

    // Update or add worker to predefinedWorkers list
    const workerIndex = predefinedWorkers.findIndex(worker => worker.username === username);
    if (workerIndex !== -1) {
        predefinedWorkers[workerIndex] = { username, name, phone, email, expertise: specialty };
    } else {
        predefinedWorkers.push({ username, name, phone, email, expertise: specialty });
    }

    localStorage.setItem('predefinedWorkers', JSON.stringify(predefinedWorkers));
    alert('Worker details saved successfully');
    showPage('workerDashboard');
}