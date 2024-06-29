import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

const userDB = new PouchDB('users');
const workerDB = new PouchDB('workers');
const adminDB = new PouchDB('admins');
const complaintDB = new PouchDB('complaints');

const post = async (doc) => await workerDB.post(doc);
const allDocs = async (options) => await complaintDB.allDocs(options);
const get = async (id) => await workerDB.get(id);
const put = async (doc) => await workerDB.put(doc);
const remove = async (doc) => await workerDB.remove(doc);
const findWorker = async (username) => {
    const result = await workerDB.find({
        selector: { username }
    });
    return result.docs[0];
};

export { userDB, workerDB, adminDB, complaintDB, post, allDocs, get, put, remove, findWorker };
