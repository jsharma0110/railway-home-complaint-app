import PouchDB, { plugin } from 'pouchdb';
plugin(require('pouchdb-find'));

// Create databases
const complaintDB = new PouchDB('complaints');
const workerDB = new PouchDB('workers');
const adminDB = new PouchDB('admins');
const userDB = new PouchDB('users');

// Export the databases
export default {
    complaintDB,
    workerDB,
    adminDB,
    userDB
};
