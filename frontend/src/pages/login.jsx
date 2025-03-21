import React, { useState, useEffect } from "react";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [users, setUsers] = useState([]);
    const [isEdit, setIsEdit] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Server Response:", data);
            fetchUsers();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };



    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data)
            setUsers(data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const enableEdit = (user) => {
        setIsEdit(user);
    }
    const handleUpdatechange = (e) => {
        setIsEdit({ ...isEdit, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/users/${isEdit.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(isEdit),
            });
            setIsEdit(null)
            fetchUsers();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    const handledelete = async (id) => {
        await fetch(`http://localhost:5000/api/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        fetchUsers();
    }


    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-96 mb-6"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">Add Users</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Add
                </button>
            </form>

            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">User List</h2>
                <ul>
                    {users.map((user, index) => (
                        <div className="flex flex-row justify-center p-4">
                            {isEdit && isEdit.id == user.id ? (<>
                                <input
                                    value={isEdit?.username || ""}
                                    type="text"
                                    name="username"
                                    className="border border-1 p-2"
                                    onChange={handleUpdatechange}
                                />
                                <button onClick={handleUpdate} className="ml-10 bg-red-600 text-white hover:text-green-500 pl-3 pr-3 p-2 rounded-sm font-semibold">Save</button>
                                <button onClick={() => enableEdit(null)} className="ml-1 bg-red-600 text-white hover:text-green-500 pl-3 pr-3 p-2 rounded-sm font-semibold">Cancel</button>

                            </>) : <>
                                <li key={index} >{user?.username}</li>
                                <button onClick={() => enableEdit(user)} className="ml-10 bg-red-600 text-white hover:text-green-500 pl-3 pr-3 p-2 rounded-sm font-semibold">Edit</button>
                                <button onClick={() => handledelete(user.id)} className="ml-1 bg-red-600 text-white hover:text-green-500 pl-3 pr-3 p-2 rounded-sm font-semibold">Delete</button>
                            </>
                            }
                        </div>
                    ))}
                </ul >
            </div >
        </div >
    );
};

export default LoginForm;
