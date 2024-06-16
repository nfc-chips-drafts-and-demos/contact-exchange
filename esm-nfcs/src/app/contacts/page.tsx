"use client";
// @ts-ignore
import { Contact } from "./../InputForm"
import React, {useState, useEffect} from 'react';


const Contacts: React.FC = () => {
    // // TODO: figure out how to get the contacts
    // try {
    //     const { profiles } = await sql`SELECT * FROM profiles`
    // } catch (err) {
        
    // }
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch contacts from the API
        const fetchContacts = async () => {
          try {
            const response = await fetch('/api/get-contacts');
            if (!response.ok) {
              throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setContacts(data);
            setLoading(false);
          } catch (err) {
            // setError(err);
            setLoading(false);
          }
        };
    
        fetchContacts();
      }, []);

    if (loading) {
    return <p>Loading contacts...</p>;
    }

    if (error) {
    return <p>Error: {error}</p>;
    }
    return (
        <main>
            <div>
                <h1>Contact List</h1>
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact.id}>
                            <h2>{contact.name}</h2>
                            {/* <p>Telegram: {contact.telegram}</p>
                            <p>Social Layer: {contact.socialLayer}</p>
                            <p>Profile Image: {contact.profileImage }</p> */}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default Contacts;