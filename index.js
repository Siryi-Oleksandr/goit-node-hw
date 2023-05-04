const argv = require("yargs").argv;
const contacts = require("./contacts");
require("colors");
const util = require("util");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.getListContacts();
      return console.table(allContacts);

    case "get":
      const contact = await contacts.getContactById(id);
      const contactString = util.inspect(contact, { colors: true });
      return console.log(contactString.bgCyan);

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      const newContactString = util.inspect(newContact, { colors: true });
      return console.log(newContactString.bgCyan);

    case "remove":
      const deletedContact = await contacts.removeContact(id);
      const deletedContactString = util.inspect(deletedContact, {
        colors: true,
      });
      return console.log(deletedContactString.bgYellow);

    case "update":
      const updatedContact = await contacts.updateContactById(
        id,
        name,
        email,
        phone
      );
      const updatedContactString = util.inspect(updatedContact, {
        colors: true,
      });
      return console.log(updatedContactString.bgCyan);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
