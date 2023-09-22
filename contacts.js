const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contact) => {
	await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
};

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(id) {
	const contacts = await listContacts();
	const contactById = contacts.find((item) => item.id === id);
	return contactById || null;
}

async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}

async function removeContact(id) {
	const contacts = await listContacts();
	const deleteIdxContact = contacts.findIndex((item) => item.id === id);
	if (deleteIdxContact === -1) return null;
	const [result] = contacts.splice(deleteIdxContact, 1);
	await updateContacts(contacts);
	return result;
}

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
};
