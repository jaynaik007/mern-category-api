import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  parent?: mongoose.Types.ObjectId;
  status: 'active' | 'inactive';
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>('Category', categorySchema);
