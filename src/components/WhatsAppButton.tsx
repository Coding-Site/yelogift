import { useEffect, useState } from 'react';
import instance from '../axios';

const WhatsAppButton = () => {
    const [whatsData, setWhatsData] = useState('');

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const response = await instance.get('/api/contact');
                const contactData = response.data.data[0];
                if (contactData && contactData.whatsapp) {
                    const formattedNumber = contactData.whatsapp.replace(
                        /[^0-9]/g,
                        ''
                    );
                    setWhatsData(formattedNumber);
                }
            } catch (error) {
                console.error('Failed to fetch contact data:', error);
            }
        };

        fetchContactData();
    }, []);

    if (!whatsData) return null;

    return (
        <a
            href={`https://wa.me/${whatsData}`}
            className="fixed w-16 h-16 bottom-10 right-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-10 h-10"
            />
        </a>
    );
};

export default WhatsAppButton;
