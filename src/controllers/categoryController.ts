import { Request, Response } from 'express';
import Category from '../models/Category';
import mongoose, {Types} from 'mongoose';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, parent, status } = req.body;

    const category = await Category.create({
      name,
      parent: parent || null,
      status: status || 'active'
    });

    return res.status(201).json(category);
  } catch (err) {
    console.log("err :",err)
    return res.status(500).json({ message: 'Failed to create category', error: err });
  }
};

export const getCategoryTree = async (_req: Request, res: Response) => {
    try {
      const categories = await Category.find().lean();
  
      const categoryMap: Record<string, any> = {};
      const tree: any[] = [];
  
      // Step 1: Initialize map
      categories.forEach((cat) => {
        categoryMap[cat._id.toString()] = { ...cat, children: [] };
      });
  
      // Step 2: Build tree
      categories.forEach((cat) => {
        if (cat.parent) {
          const parentId = cat.parent.toString();
          if (categoryMap[parentId]) {
            categoryMap[parentId].children.push(categoryMap[cat._id.toString()]);
          }
        } else {
          tree.push(categoryMap[cat._id.toString()]);
        }
      });
  
      return res.json(tree);
    } catch (err) {
      return res.status(500).json({ message: 'Failed to fetch categories', error: err });
    }
  };

  export const updateCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
      const { name, status } = req.body;
  
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      if (name) category.name = name;
      const statusChanged = status && category.status !== status;
      if (statusChanged) category.status = status;
  
      await category.save();
  
      // If status is changed to inactive, update children
      if (statusChanged && status === 'inactive') {
        await deactivateSubcategories(category._id as Types.ObjectId);
      }
  
      return res.json({ message: 'Category updated successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to update category', error: err });
    }
  };
  
  // Helper function to recursively deactivate children
  const deactivateSubcategories = async (parentId: mongoose.Types.ObjectId) => {
    const children = await Category.find({ parent: parentId });
    for (const child of children) {
      if (child.status !== 'inactive') {
        child.status = 'inactive';
        await child.save();
        await deactivateSubcategories(child._id as Types.ObjectId);
      }
    }
  };

  export const deleteCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.id;
  
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Step 1: Reassign children
      await Category.updateMany(
        { parent: category._id },
        { $set: { parent: category.parent || null } }
      );
  
      // Step 2: Delete the category
      await Category.findByIdAndDelete(categoryId);
  
      return res.json({ message: 'Category deleted and children reassigned' });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to delete category', error: err });
    }
  };
  
  
  
