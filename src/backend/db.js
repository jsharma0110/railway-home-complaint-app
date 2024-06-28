import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

const userDB = new PouchDB('users');
const workerDB = new PouchDB('workers');
const adminDB = new PouchDB('admins');
const complaintDB = new PouchDB('complaints');

const post = async (doc) => await complaintDB.post(doc);
const allDocs = async (options) => await complaintDB.allDocs(options);
const get = async (id) => await complaintDB.get(id);
const put = async (doc) => await complaintDB.put(doc);
const remove = async (doc) => await complaintDB.remove(doc);

export { userDB, workerDB, adminDB, complaintDB, post, allDocs, get, put, remove };
