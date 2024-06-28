const express = require('express');
const router = express.Router();
const { complaintDB, workerDB, adminDB, userDB } = require('./db');
const { hashPassword, authenticateUser, generateToken, authenticateJWT, authorizeRoles } = require('./auth');

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const hashedPassword = await hashPassword(password);
        let db;
        if (role === 'user') {
            db = userDB;
        } else if (role === 'worker') {
            db = workerDB;
        } else if (role === 'admin') {
            db = adminDB;
        } else {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const user = { email, password: hashedPassword, role };
        const response = await db.post(user);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await authenticateUser(email, password, role);
        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Protected Route Example
router.get('/protected', authenticateJWT, authorizeRoles('admin', 'worker'), (req, res) => {
    res.json({ message: 'This is a protected route for admins and workers' });
});

// Complaint Routes
router.post('/complaints', authenticateJWT, authorizeRoles('user', 'admin'), async (req, res) => {
    try {
        const complaint = req.body;
        const response = await complaintDB.post(complaint);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/complaints', authenticateJWT, authorizeRoles('admin', 'worker'), async (req, res) => {
    try {
        const complaints = await complaintDB.allDocs({ include_docs: true });
        res.json(complaints.rows.map(row => row.doc));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/complaints/:id', authenticateJWT, authorizeRoles('admin', 'worker'), async (req, res) => {
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

router.delete('/complaints/:id', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
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
router.post('/workers', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
    try {
        const worker = req.body;
        const hashedPassword = await hashPassword(worker.password);
        worker.password = hashedPassword;
        const response = await workerDB.post(worker);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/workers', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
    try {
        const workers = await workerDB.allDocs({ include_docs: true });
        res.json(workers.rows.map(row => row.doc));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/workers/:id', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
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

router.delete('/workers/:id', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const worker = await workerDB.get(id);
        const response = await workerDB.remove(worker);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/workers/:username', authenticateJWT, authorizeRoles('admin', 'worker'), async (req, res) => {
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
router.post('/admins', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
    try {
        const admin = req.body;
        const hashedPassword = await hashPassword(admin.password);
        admin.password = hashedPassword;
        const response = await adminDB.post(admin);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/admins', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
    try {
        const admins = await adminDB.allDocs({ include_docs: true });
        res.json(admins.rows.map(row => row.doc));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/admins/:id', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
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

router.delete('/admins/:id', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await adminDB.get(id);
        const response = await adminDB.remove(admin);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/admins/:username', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
    try {
        const { username } = req.params;
        const admin = await adminDB.find({
            selector: { username }
        });
        if (admin.docs.length > 0) {
            res.json(admin.docs[0]);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
