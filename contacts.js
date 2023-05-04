const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументувати кожну функцію
async function getListContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    if (!data) return console.error("something went wrong");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getListContacts();
    const result = contacts.find((el) => el.id === contactId);
    return result || null;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getListContacts();
    const contactIdx = contacts.findIndex((el) => el.id === contactId);
    if (contactIdx === -1) return null;
    const [deletedContact] = contacts.splice(contactIdx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await getListContacts();
    const contact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
  } catch (error) {
    console.error(error);
  }
}

async function updateContactById(id, ...args) {
  try {
    const contacts = await getListContacts();
    const contactIdx = contacts.findIndex((el) => el.id === id);
    if (contactIdx === -1) return null;
    const updatedContact = {
      id,
      ...args,
    };
    contacts.splice(contactIdx, 1, updatedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
