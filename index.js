const fs = require("fs").promises;
const contacts = require("./db");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "read":
      const allContacts = await contacts.getAllContacts();
      return console.log(allContacts);
    case "getById":
      const contact = await contacts.getById(id);
      return console.log(contact);
    default:
      return console.log(`not found such command ${action}`);
  }
};

// invokeAction({ action: "read" });
invokeAction({ action: "getById", id: "qdggE76Jtbfd9eWJHrssH" });
