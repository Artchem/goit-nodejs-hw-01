const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        return console.table(allContacts);

      case "get":
        const contact = await contacts.getContactById(id);
        return console.log(contact);

      case "add":
        const newContact = await contacts.addContact({ name, email, phone });
        return console.log(newContact);

      case "update":
        const remContact = await contacts.updateContact(id, {
          name,
          email,
          phone,
        });
        return console.log(remContact);

      case "delete":
        const delContact = await contacts.deleteContact(id);
        return console.log(delContact);

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error.message);
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
