import { JSX } from "react";

interface ListProps<T> {
    items: T[];
    onSelect: (item: T) => void;
    onDelete: (id: number) => void;
    renderItem: (item: T) => JSX.Element;  // Burada, her bir öğenin nasıl render edileceğini belirlemek için bir fonksiyon ekliyoruz.
}

export default function List<T extends { id: number }>({
    items,
    onSelect,
    onDelete,
    renderItem,  // Her öğenin render edilme biçimi bu props ile sağlanacak.
}: ListProps<T>) {
    return (
        <ul className="text-black bg-white shadow-lg rounded-lg border border-gray-200">
            {items.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b p-4 hover:bg-gray-100 transition">
                    <div onClick={() => onSelect(item)} className="cursor-pointer">
                        {renderItem(item)}
                    </div>
                    <button onClick={() => onDelete(item.id)} className="text-red-500 hover:text-red-700 transition">
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}
