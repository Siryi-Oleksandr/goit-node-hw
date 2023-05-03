const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const contacts = await getAllContacts();
  return contacts.find((el) => el.id);
};

module.exports = {
  getAllContacts,
  getById,
};
