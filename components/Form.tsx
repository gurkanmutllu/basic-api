import React from "react";

interface FormProps {
    fields: { name: string; value: string; type?: string }[];
    onChange: (name: string, value: string) => void;
    onSubmit: () => void;
    submitText: string;
}

export default function Form({ fields, onChange, onSubmit, submitText }: FormProps) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            {fields.map((field, index) => (
                <div key={index} className="mb-4">
                    <label className="block text-black text-sm font-bold mb-2">
                        {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                    </label>
                    <input
                        type={field.type || "text"}
                        placeholder={field.name}
                        value={field.value}
                        onChange={(e) => onChange(field.name, e.target.value)}
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            ))}
            <button
                onClick={onSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
                {submitText}
            </button>
        </div>
    );
}
