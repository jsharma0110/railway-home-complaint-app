import { Router } from 'express';
const router = Router();
import { post, allDocs, get, put, remove, userDB, workerDB, postWorker } from './db.js';

// Create Complaint
router.post('/complaints', async (req, res) => {
    try {
        const complaint = req.body;
        const response = await post(complaint);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Read Complaints
router.get('/complaints', async (req, res) => {
    try {
        const complaints = await allDocs({ include_docs: true });
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
        const complaint = await get(id);
        const response = await put({ ...complaint, ...updatedComplaint });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Complaint
router.delete('/complaints/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const complaint = await get(id);
        const response = await remove(complaint);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Register Worker
router.post('/register', async (req, res) => {
    try {
        const worker = req.body;
        const response = await postWorker(worker);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Worker Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const worker = await workerDB.find({
            selector: { username, password }
        });
        if (worker.docs.length > 0) {
            res.json(worker.docs[0]);
        } else {
            res.status(404).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Worker Details
router.get('/workers/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const workers = await allDocs({ include_docs: true, startkey: `worker_${username}`, endkey: `worker_${username}\ufff0` });
        const worker = workers.rows.length ? workers.rows[0].doc : null;
        if (worker) {
            res.json(worker);
        } else {
            res.status(404).json({ error: 'Worker not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;
