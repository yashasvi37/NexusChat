import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

const Sidebar = () => {
    const {
        getUsers,
        users,
        selectedUser,
        setSelectedUser,
        isUsersLoading,
        groups,
        getGroups,
        isGroupsLoading,
        createGroup
    } = useChatStore();

    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [activeTab, setActiveTab] = useState("contacts"); // "contacts" or "groups"
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);

    useEffect(() => {
        getUsers();
        getGroups();
    }, [getUsers, getGroups]);

    const filteredUsers = showOnlineOnly
        ? users.filter((user) => onlineUsers.includes(user._id))
        : users;

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        if (!newGroupName.trim()) return toast.error("Group name is required");
        if (selectedMembers.length === 0) return toast.error("Select at least one member");

        const success = await createGroup({
            name: newGroupName,
            members: selectedMembers
        });

        if (success) {
            setShowCreateGroup(false);
            setNewGroupName("");
            setSelectedMembers([]);
            setActiveTab("groups");
        }
    };

    const toggleMemberSelection = (userId) => {
        if (selectedMembers.includes(userId)) {
            setSelectedMembers(selectedMembers.filter(id => id !== userId));
        } else {
            setSelectedMembers([...selectedMembers, userId]);
        }
    };

    if (isUsersLoading || isGroupsLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">NexusChat</span>
                </div>

                {/* Tabs */}
                <div className="hidden lg:flex gap-2 mb-4 bg-base-200 p-1 rounded-lg">
                    <button
                        className={`flex-1 py-1 text-sm rounded-md transition-colors ${activeTab === "contacts" ? "bg-primary text-primary-content" : "hover:bg-base-300"}`}
                        onClick={() => setActiveTab("contacts")}
                    >
                        Contacts
                    </button>
                    <button
                        className={`flex-1 py-1 text-sm rounded-md transition-colors ${activeTab === "groups" ? "bg-primary text-primary-content" : "hover:bg-base-300"}`}
                        onClick={() => setActiveTab("groups")}
                    >
                        Groups
                    </button>
                </div>

                {/* Create Group Button (only visible in Groups tab) */}
                {activeTab === "groups" && (
                    <button
                        onClick={() => setShowCreateGroup(true)}
                        className="hidden lg:flex items-center gap-2 w-full btn btn-sm btn-outline mb-4"
                    >
                        <Plus className="size-4" /> New Group
                    </button>
                )}

                {/* Online Filter (only for Contacts) */}
                {activeTab === "contacts" && (
                    <div className="mt-3 hidden lg:flex items-center gap-2">
                        <label className="cursor-pointer flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={showOnlineOnly}
                                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                                className="checkbox checkbox-sm"
                            />
                            <span className="text-sm">Show online only</span>
                        </label>
                        <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
                    </div>
                )}
            </div>

            <div className="overflow-y-auto w-full py-3">
                {activeTab === "contacts" ? (
                    filteredUsers.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`
                                w-full p-3 flex items-center gap-3
                                hover:bg-base-300 transition-colors
                                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                            `}
                        >
                            <div className="relative mx-auto lg:mx-0">
                                <img
                                    src={user.profilePic || "/avatar.png"}
                                    alt={user.fullName}
                                    className="size-12 object-cover rounded-full"
                                />
                                {onlineUsers.includes(user._id) && (
                                    <span
                                        className="absolute bottom-0 right-0 size-3 bg-green-500 
                                        rounded-full ring-2 ring-zinc-900"
                                    />
                                )}
                            </div>

                            <div className="hidden lg:block text-left min-w-0">
                                <div className="font-medium truncate">{user.fullName}</div>
                                <div className="text-sm text-zinc-400">
                                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                                </div>
                            </div>
                        </button>
                    ))
                ) : (
                    groups.map((group) => (
                        <button
                            key={group._id}
                            onClick={() => setSelectedUser(group)} // Using setSelectedUser for groups too
                            className={`
                                w-full p-3 flex items-center gap-3
                                hover:bg-base-300 transition-colors
                                ${selectedUser?._id === group._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                            `}
                        >
                            <div className="relative mx-auto lg:mx-0">
                                {/* Group Icon/Avatar */}
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                    {group.name[0].toUpperCase()}
                                </div>
                            </div>

                            <div className="hidden lg:block text-left min-w-0">
                                <div className="font-medium truncate">{group.name}</div>
                                <div className="text-sm text-zinc-400">
                                    {group.members.length} members
                                </div>
                            </div>
                        </button>
                    ))
                )}

                {activeTab === "groups" && groups.length === 0 && (
                    <div className="text-center text-zinc-500 py-4 hidden lg:block">
                        No groups yet
                    </div>
                )}

                {activeTab === "contacts" && filteredUsers.length === 0 && (
                    <div className="text-center text-zinc-500 py-4 hidden lg:block">No online users</div>
                )}
            </div>

            {/* Create Group Modal */}
            {showCreateGroup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-base-100 rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Create New Group</h3>
                            <button onClick={() => setShowCreateGroup(false)}><X className="size-5" /></button>
                        </div>

                        <form onSubmit={handleCreateGroup}>
                            <div className="mb-4">
                                <label className="label">
                                    <span className="label-text">Group Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    placeholder="Enter group name"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="label">
                                    <span className="label-text">Select Members</span>
                                </label>
                                <div className="max-h-48 overflow-y-auto border rounded-lg p-2">
                                    {users.map(user => (
                                        <label key={user._id} className="flex items-center gap-2 p-2 hover:bg-base-200 rounded cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-sm"
                                                checked={selectedMembers.includes(user._id)}
                                                onChange={() => toggleMemberSelection(user._id)}
                                            />
                                            <div className="flex items-center gap-2">
                                                <img src={user.profilePic || "/avatar.png"} className="size-8 rounded-full" alt="" />
                                                <span>{user.fullName}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-full">Create Group</button>
                        </form>
                    </div>
                </div>
            )}
        </aside>
    );
};
export default Sidebar;
