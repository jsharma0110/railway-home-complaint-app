const express = require('express');
const router = express.Router();
const { complaintDB, workerDB, adminDB, userDB } = require('./db');

// Complaint Routes

// Create Complaint
router.post('/complaints', async (req, res) => {
    try {
        const complaint = req.body;
        const response = await complaintDB.post(complaint);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read Complaints
router.get('/complaints', async (req, res) => {
    try {
        const complaints = await complaintDB.allDocs({ include_docs: true });
        res.json(complaints.rows.map(row => row.doc));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Complaint
router.put('/complaints/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedComplaint = req.body;
        const complaint = await complaintDB.get(id);
        const response = await complaintDB.put({ ...complaint, ...updatedComplaint });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Complaint
router.delete('/complaints/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const complaint = await complaintDB.get(id);
        const response = await complaintDB.remove(complaint);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Worker Routes

// Create Worker
router.post('/workers', async (req, res) => {
    try {
        const worker = req.body;
        const response = await workerDB.post(worker);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read Workers
router.get('/workers', async (req, res) => {
    try {
        const workers = await workerDB.allDocs({ include_docs: true });
        res.json(workers.rows.map(row => row.doc));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Worker
router.put('/workers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedWorker = req.body;
        const worker = await workerDB.get(id);
        const response = await workerDB.put({ ...worker, ...updatedWorker });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Worker
router.delete('/workers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const worker = await workerDB.get(id);
        const response = await workerDB.remove(worker);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Worker Details
router.get('/workers/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const worker = await workerDB.find({
            selector: { username }
        });
        if (worker.docs.length > 0) {
            res.json(worker.docs[0]);
        } else {
            res.status(404).json({ error: 'Worker not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin Routes

// Create Admin
router.post('/admins', async (req, res) => {
    try {
        const admin = req.body;
        const response = await adminDB.post(admin);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read Admins
router.get('/admins', async (req, res) => {
    try {
        const admins = await adminDB.allDocs({ include_docs: true });
        res.json(admins.rows.map(row => row.doc));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Admin
router.put('/admins/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAdmin = req.body;
        const admin = await adminDB.get(id);
        const response = await adminDB.put({ ...admin, ...updatedAdmin });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Admin
router.delete('/admins/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await adminDB.get(id);
        const response = await adminDB.remove(admin);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User Routes

// Create User
router.post('/users', async (req, res) => {
    try {
        const user = req.body;
        const response = await userDB.post(user);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read Users
router.get('/users', async (req, res) => {
    try {
        const users = await userDB.allDocs({ include_docs: true });
        res.json(users.rows.map(row => row.doc));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update User
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = req.body;
        const user = await userDB.get(id);
        const response = await userDB.put({ ...user, ...updatedUser });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete User
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userDB.get(id);
        const response = await userDB.remove(user);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User Details
router.get('/users/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await userDB.find({
            selector: { username }
        });
        if (user.docs.length > 0) {
            res.json(user.docs[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

