import Group from "../models/group.model.js";
import User from "../models/user.model.js";

export const createGroup = async (req, res) => {
    try {
        const { name, members } = req.body;
        const senderId = req.user._id;

        if (!name || !members || members.length === 0) {
            return res.status(400).json({ message: "Name and at least one member are required" });
        }

        // Add admin (creator) to members if not already included
        const memberIds = [...new Set([...members, senderId])];

        const newGroup = new Group({
            name,
            members: memberIds,
            admin: senderId,
        });

        await newGroup.save();

        res.status(201).json(newGroup);
    } catch (error) {
        console.log("Error in createGroup controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getGroups = async (req, res) => {
    try {
        const userId = req.user._id;

        const groups = await Group.find({ members: userId }).populate("members", "-password");

        res.status(200).json(groups);
    } catch (error) {
        console.log("Error in getGroups controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
