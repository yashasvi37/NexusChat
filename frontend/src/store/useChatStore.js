import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    groups: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isGroupsLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getGroups: async () => {
        set({ isGroupsLoading: true });
        try {
            const res = await axiosInstance.get("/groups");
            set({ groups: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isGroupsLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            // Check if selectedUser (passed as userId here ideally, or used from state) is a group
            // But here we rely on the caller or state.
            const { selectedUser } = get();
            const isGroup = selectedUser?.members; // Simple check if it's a group object

            const res = await axiosInstance.get(isGroup ? `/messages/group/${userId}` : `/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const isGroup = selectedUser?.members;
            let res;

            if (isGroup) {
                res = await axiosInstance.post(`/messages/send-group`, {
                    ...messageData,
                    groupId: selectedUser._id
                });
            } else {
                res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            }

            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    createGroup: async (groupData) => {
        try {
            const res = await axiosInstance.post("/groups/create", groupData);
            set({ groups: [...get().groups, res.data] });
            toast.success("Group created successfully");
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
            return false;
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            // If it's a group message
            if (newMessage.groupId) {
                if (selectedUser._id === newMessage.groupId) {
                    set({ messages: [...get().messages, newMessage] });
                }
                return;
            }

            // DM logic
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
