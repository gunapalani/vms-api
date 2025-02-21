import { model, Schema, Document } from 'mongoose';
const priceSchema: Schema = new Schema(
  {
    minNumber: { type: Number },
    maxNumber: { type: Number },
    currencyCode: { type: String },
  },
  { _id: false },
);

const productSchema: Schema = new Schema(
  {
    name: { type: String },
    price: { type: priceSchema },
    description: { type: String },
    images: { type: String },
    SKU: { type: Number },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'client',
    },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { collection: 'products', timestamps: true },
);

const productEntity = model<Document>('Product', productSchema);

export default productEntity;
