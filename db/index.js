const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  if (!data) return console.log("something went wrong");
  return JSON.parse(data);
};

const getById = async (id) => {
  const contacts = await getAllContacts();
  const result = contacts.find((el) => el.id === id);
  return result || null;
};

const addContact = async (data) => {
  const contacts = await getAllContacts();
  const contact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
};

const updateById = async (id, data) => {
  const contacts = await getAllContacts();
  const contactIdx = contacts.findIndex((el) => el.id === id);
  if (contactIdx === -1) return null;
  const updatedContact = {
    id,
    ...data,
  };
  contacts.splice(contactIdx, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

const deleteById = async (id) => {
  const contacts = await getAllContacts();
  const contactIdx = contacts.findIndex((el) => el.id === id);
  if (contactIdx === -1) return null;
  const [deletedContact] = contacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
};

module.exports = {
  getAllContacts,
  getById,
  addContact,
  updateById,
  deleteById,
};
