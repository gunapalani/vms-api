import { model, Schema, Document } from 'mongoose';

const redeemSchema: Schema = new Schema(
  {
    userName: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'client',
    },
    SKU: { type: String, required: true },
    couponCode: { type: String, required: true },
    createdBy: { type: String },
    updatedBy: { type: String },
    orderStatus: { type: String },
    price: { type: Number },
  },
  { collection: 'redeems', timestamps: true },
);

const redeemEntity = model<Document>('Redeem', redeemSchema);

export default redeemEntity;
