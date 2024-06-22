import PouchDB, { plugin } from 'pouchdb';
plugin(require('pouchdb-find'));

const db = new PouchDB('complaints');

export default db;
