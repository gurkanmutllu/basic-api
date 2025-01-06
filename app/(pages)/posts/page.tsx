"use client";

import Form from "@/components/Form";
import List from "@/components/List";
import { Post } from "@/models/Post";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPost, setCurrentPost] = useState<Post | null>(null);
    const [form, setForm] = useState({ title: "", content: "" });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (data.success) setPosts(data.data);
    };

    const handleFormChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };

    const handleFormSubmit = async () => {
        const url = currentPost ? `/api/posts?id=${currentPost.id}` : "/api/posts";
        const method = currentPost ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success) {
            fetchPosts();
            setForm({ title: "", content: "" });
            setCurrentPost(null);
        }
    };

    const handleDelete = async (id: number) => {
        const res = await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) fetchPosts();
    };

    const handleSelect = (post: Post) => {
        setForm({ title: post.title, content: post.content });
        setCurrentPost(post);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-white">Manage Posts</h1>
            <Link href="/">
                <div className="text-blue-600 hover:underline mb-4 block">
                    Back to Home
                </div>
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Form
                    fields={[
                        { name: "title", value: form.title },
                        { name: "content", value: form.content, type: "textarea" },
                    ]}
                    onChange={handleFormChange}
                    onSubmit={handleFormSubmit}
                    submitText={currentPost ? "Update Post" : "Create Post"}
                />
                <List
                    items={posts}
                    onSelect={handleSelect}
                    onDelete={handleDelete}
                    renderItem={(post) => (
                        <>
                            <h3 className="text-lg font-bold">{post.title}</h3>
                            <p className="text-gray-600">{post.content}</p>
                        </>
                    )}
                />
            </div>
        </div>
    );
}
