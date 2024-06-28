import { sign, verify } from 'jsonwebtoken';
import { genSalt, hash as _hash, compare } from 'bcryptjs';
import { userDB, workerDB, adminDB } from './db';

const SECRET_KEY = 'super_secret_password_lalala'; 

async function hashPassword(password) {
    const salt = await genSalt(10);
    return _hash(password, salt);
}

async function comparePassword(password, hash) {
    return compare(password, hash);
}

function generateToken(user) {
    const { _id, email, role } = user;
    return sign({ _id, email, role }, SECRET_KEY, { expiresIn: '1h' });
}

async function authenticateUser(email, password, role) {
    let db;
    if (role === 'user') {
        db = userDB;
    } else if (role === 'worker') {
        db = workerDB;
    } else if (role === 'admin') {
        db = adminDB;
    } else {
        throw new Error('Invalid role');
    }

    const result = await db.find({ selector: { email } });
    if (result.docs.length === 0) {
        throw new Error('User not found');
    }

    const user = result.docs[0];
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
        throw new Error('Invalid password');
    }

    return user;
}

function authenticateJWT(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const verified = verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
}

function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
}

export default {
    hashPassword,
    authenticateUser,
    generateToken,
    authenticateJWT,
    authorizeRoles
};