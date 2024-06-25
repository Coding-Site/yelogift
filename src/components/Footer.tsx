import { Link } from 'react-router-dom';
import styles from '../utils/styles/footer.module.css';
import { useEffect, useState } from 'react';
import instance from '../axios';

function Footer() {
    const [socials, setSocials] = useState<any>([]);
    const [desc, setDesc] = useState<any>([]);
    const [contactData, setContactData] = useState<any>(null);

    const iconObj: any = {
        facebook: '/assets/social/facebook.png',
        twitter: '/assets/social/twitter.png',
        linkedin: '/assets/social/linkedin.png',
        youtube: '/assets/social/youtube.png',
    };

    useEffect(() => {
        instance.get(`/api/social`).then((d) => {
            setSocials(d.data.data);
        });
    }, []);
    useEffect(() => {
        instance.get(`/api/footer`).then((d) => {
            setDesc(d.data.data.description);
        });
    }, []);
    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const response = await instance.get('/api/contact ');
                const ContactData = response.data.data[0];
                setContactData(ContactData);
            } catch (error) {
                console.error('Failed to fetch Contact data:', error);
            }
        };
        fetchContactData();
    }, []);

    return (
        <footer
            className={`bg-mainLightBlack pt-10 pb-5 text-mainWhite ${styles.footer_sec} `}
            id="footer"
        >
            <div
                className={`${styles.footer_container} hidden sm:flex w-full flex-col gap-y-3 sm:flex-row justify-between container border-b border-gray-700 pb-10 `}
            >
                <div className="flex flex-col gap-3  ">
                    <img
                        className="w-[150px]"
                        src="/assets/Logo/Asset-1.png"
                        alt="logo"
                    />
                    <p className="w-[340px] text-sm break-words overflow-hidden">
                        {desc}
                    </p>
                    <ul className="flex gap-2">
                        {socials &&
                            socials.map((soc: any, idx: any) => (
                                <li key={idx}>
                                    <Link to={soc.url}>
                                        <img
                                            src={iconObj[soc.icon]}
                                            alt={soc.icon}
                                            className="social_icons_footer"
                                        />
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="flex flex-col uppercase  ">
                    <ul className="text-mainWhite">
                        <li className="text-main capitalize font-semibold text-xl mb-2">
                            About Us
                        </li>
                        <li>
                            <Link to="/privact-policy">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/term-and-conditions">
                                Term and Conditions
                            </Link>
                        </li>
                        <li>
                            <Link to="/about-us">About Us</Link>
                        </li>
                    </ul>
                </div>
                {contactData?.address ||
                contactData?.mail_1 ||
                contactData?.mail_2 ||
                contactData?.phone_1 ||
                contactData?.phone_2 ? (
                    <div className="flex flex-col">
                        <ul className="text-mainWhite">
                            <li className="text-main capitalize font-semibold text-xl mb-2">
                                Contact Us
                            </li>
                            <li className="text-main">
                                {contactData?.address}
                            </li>
                            <li>{contactData?.mail_1}</li>
                            <li>{contactData?.mail_2}</li>
                            <li>{contactData?.phone_1}</li>
                            <li>{contactData?.phone_2}</li>
                        </ul>
                    </div>
                ) : (
                    ''
                )}
            </div>
            {/* ________________________________________________mob__________________________________________________________________         */}
            <div className="flex sm:hidden w-full flex-col gap-y-3  justify-between container">
                <div className="flex flex-col uppercase">
                    <ul className="text-mainWhite text-sm w-52 mx-auto gap-y-3 flex items-center justify-center flex-col text-center">
                        <li className="flex justify-between gap-x-3 w-full">
                            <Link to="/">Categories </Link>
                            <img
                                className="w-4"
                                src="/assets/slider/prev.png"
                                alt=""
                            />
                        </li>
                        <li className="flex justify-between gap-x-3 w-full">
                            <Link to="#footer">Contact us</Link>
                            <img
                                className="w-4"
                                src="/assets/slider/prev.png"
                                alt=""
                            />
                        </li>
                        <li className="flex justify-between gap-x-3 w-full">
                            <Link to="/">About Us</Link>
                            <img
                                className="w-4"
                                src="/assets/slider/prev.png"
                                alt=""
                            />
                        </li>
                        <li className="flex justify-between gap-x-3 w-full">
                            <Link to="/">Privacy Policy</Link>
                            <img
                                className="w-4"
                                src="/assets/slider/prev.png"
                                alt=""
                            />
                        </li>
                        <li className="flex justify-between gap-x-3 w-full">
                            <Link to="/">Terms & Conditions</Link>
                            <img
                                className="w-4"
                                src="/assets/slider/prev.png"
                                alt=""
                            />
                        </li>
                        <li className="flex justify-center gap-x-3 w-full capitalize mt-5 ">
                            Follow us
                        </li>
                        <li className="flex gap-x-2 ">
                            {socials.map((social: any, idx: any) => (
                                <Link key={idx} to={social.url}>
                                    <img
                                        className="size-10 mx-auto"
                                        src={iconObj[social.icon]}
                                        alt={social.icon}
                                    />
                                </Link>
                            ))}
                        </li>
                    </ul>
                    <p className="text-center normal-case text-sm mt-5 text-gray-400">
                        {desc}
                    </p>
                </div>
                <hr />
            </div>

            <div className="flex flex-col gap-y-5 sm:flex-row justify-between  w-full container py-5 text-gray-500">
                <span>&copy; 2024 yelogift all rights reserved </span>{' '}
                <span>
                    made by
                    <a
                        className="inline-block mx-2"
                        href="https://coding-site.com"
                    >
                        coding site
                    </a>
                </span>
            </div>
        </footer>
    );
}

export default Footer;
