import { Schema, model } from 'mongoose';
import { IListing } from './listing.interface';

// Define the Listing schema
const listingSchema = new Schema<IListing>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    condition: { type: String, enum: ['new', 'used'], required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['available', 'sold'], default: 'available' },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true },
);

const Listing = model<IListing>('Listing', listingSchema);
export default Listing;
