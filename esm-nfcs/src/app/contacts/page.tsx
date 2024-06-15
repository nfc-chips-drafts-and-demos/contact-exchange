"use clint";
// @ts-ignore
import { Contact } from "./../InputForm"
import React from 'react';

const Contacts: React.FC = () => {
    const contacts: Contact[] = [
        { id: 1, name: 'Alice Johnson', telegram: 'alice@example.com', socialLayer: '123-456-7890' },
        { id: 2, name: 'Bob Smith', telegram: 'bob@example.com', socialLayer: '987-654-3210' },
        { id: 3, name: 'Charlie Brown', telegram: 'charlie@example.com', socialLayer: '555-555-5555' },
    ]
    return (
        <main>
            <div>
                <h1>Contact List</h1>
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact.id}>
                            <h2>{contact.name}</h2>
                            <p>Telegram: {contact.telegram}</p>
                            <p>Social Layer: {contact.socialLayer}</p>
                            <p>Profile Image: {contact.profileImage }</p>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default Contacts;