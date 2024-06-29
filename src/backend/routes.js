import { Router } from 'express';
import { post, allDocs, get, put, remove, findWorker } from './db.js';

const router = Router();

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
        const response = await post(worker);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const worker = await findWorker(username);

        if (worker) {
            console.log(`Worker found: ${JSON.stringify(worker)}`);
            if (worker.password === password) {
                console.log('Password match');
                res.json({ message: 'Login successful', worker });
            } else {
                console.log('Password does not match');
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } else {
            console.log('Worker not found');
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: error.message });
    }
});


// Get Worker Details
router.get('/workers/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const worker = await get(username);
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
