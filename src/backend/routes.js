import { Router } from 'express';
const router = Router();
import { post, allDocs, get, put, remove } from './db';

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

export default router;
