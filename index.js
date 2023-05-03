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
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case "updateById":
      const updatedContact = await contacts.updateById(id, {
        name,
        email,
        phone,
      });
      return console.log(updatedContact);
    case "deleteById":
      const deletedContact = await contacts.deleteById(id);
      return console.log(deletedContact);
    default:
      return console.log(`not found such command ${action}`);
  }
};

// invokeAction({ action: "read" });
// invokeAction({ action: "getById", id: "qdggE76Jtbfd9eWJHrssH" });
// invokeAction({
//   action: "add",
//   name: "Rose Dowson",
//   email: "dowson@jack.com",
//   phone: "12-13",
// });
// invokeAction({
//   action: "updateById",
//   id: "wEi7mZwAZqAXFrIUFhJqI",
//   name: "Rose Dowson",
//   email: "dowson@rose.com",
//   phone: "(294) 987-654123",
// });
invokeAction({
  action: "deleteById",
  id: "gc0nWBPq1OovUJxlw3TX0",
});
