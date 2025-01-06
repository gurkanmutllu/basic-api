"use client";

import Form from "@/components/Form";
import List from "@/components/List";
import { User } from "@/models/User";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [form, setForm] = useState({ name: "", email: "" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.success) setUsers(data.data);
    };

    const handleFormChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };

    const handleFormSubmit = async () => {
        const url = currentUser ? `/api/users?id=${currentUser.id}` : "/api/users";
        const method = currentUser ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success) {
            fetchUsers();
            setForm({ name: "", email: "" });
            setCurrentUser(null);
        }
    };

    const handleDelete = async (id: number) => {
        const res = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) fetchUsers();
    };

    const handleSelect = (user: User) => {
        setForm({ name: user.name, email: user.email });
        setCurrentUser(user);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-white">Manage Users</h1>
            <Link href="/">
                <div className="text-blue-600 hover:underline mb-4 block">
                    Back to Home
                </div>
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Form
                    fields={[
                        { name: "name", value: form.name },
                        { name: "email", value: form.email },
                    ]}
                    onChange={handleFormChange}
                    onSubmit={handleFormSubmit}
                    submitText={currentUser ? "Update User" : "Create User"}
                />
                <List
                    items={users}
                    onSelect={handleSelect}
                    onDelete={handleDelete}
                    renderItem={(user) => (
                        <>
                            <h3 className="text-lg font-bold">{user.name}</h3>
                            <p className="text-gray-600">{user.email}</p>
                        </>
                    )}
                />
            </div>
        </div>
    );
}
