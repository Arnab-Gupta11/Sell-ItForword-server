import { Contact } from './contact.model';
import { TContact } from './contact.interface';

// Create a contact inquiry
const createContact = async (payload: TContact) => {
  const result = await Contact.create(payload);
  return result;
};

// Get all contact inquiries
const getAllContacts = async () => {
  const result = await Contact.find().sort({ createdAt: -1 });
  return result;
};

// Get a single contact inquiry by ID
const getSingleContact = async (id: string) => {
  const result = await Contact.findById(id);
  return result;
};

export const ContactServices = {
  createContact,
  getAllContacts,
  getSingleContact,
};
