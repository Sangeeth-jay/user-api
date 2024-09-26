import { Request, Response } from "express";
import User from "../models/userModel";

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Get a single user by email
export const getUser = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: `User with email ${email} not found` });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

// Add a new user
export const addUser = async (req: Request, res: Response) => {
    const newUser = new User(req.body);

    if (!newUser.name || !newUser.email || !newUser.password) {
        return res.status(400).json({ message: 'All fields are required' });
    } else {
        try {
            await newUser.save();  
            res.status(201).json(`User ${req.body.name} created successfully`);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user' });
        }
    }
};

// Delete a user by email
export const deleteUser = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const result = await User.deleteOne({ email: email }); 
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `User with email ${email} not found` });
        }
        res.status(200).json({ message: `User with email ${email} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

// Update a user by email
export const updateUser = async (req: Request, res: Response) => {
    const { email } = req.params; 
    const updates = req.body;     

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: email },     
            updates,              
            { new: true }         
        );

        if (!updatedUser) {
            return res.status(404).json({ message: `User with email ${email} not found` });
        }

        res.status(200).json({ message: `User with email ${email} updated successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};
