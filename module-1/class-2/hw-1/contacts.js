import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("db");


export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const contactsList = JSON.parse(data);
  return contactsList;
}

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const requestedContact = contacts.find(({ id }) => id === contactId);
  // handle undef when not found
  return requestedContact;
}

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2), { encoding: "utf-8" });
}

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const lastId = Math.max(...contacts.map(c => parseInt(c.id, 10))) + 1;
  const newContact = { id: lastId.toString(), name, email, phone };
  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), { encoding: "utf-8" });
}

const main = async () => {

  console.log(await listContacts());

  console.log(await getContactById("2"));

  await removeContact("2");

  await addContact("Kuba", "mail@gmail.com", "321654987");

  console.log(await listContacts());
};

// main();