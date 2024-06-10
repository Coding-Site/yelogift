import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import instance from '../axios';
export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [pageTitle, setPageTitle] = useState('About | Yelo-Gift');
    const [metaDesc, setMetaDesc] = useState(
        ' YELOGIFT is a project operated by individuals aimed at providing high-quality digital cards that meet all your needs. At YELOGIFT, we pride ourselves on being a trusted source for digital cards. We provide the easiest solution to purchase all digital cards. With YELOGIFT, you can search for the best products with ease, anytime and anywhere.'
    );
    const [metaKeyWord, setMetaKeyWord] = useState(
        'seo, search engine optimization'
    );

    useEffect(() => {
        instance.get(`/api/pages/2`).then((d) => {
            const prod = d.data.data;
            setPageTitle(`${prod.title} | Yelo-Gift`);
            setMetaDesc(prod.content);
            setMetaKeyWord(prod.tags);
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <link rel="canonical" href="/about-us" />
                <meta name="description" content={metaDesc} />
                <meta
                    name="keywords"
                    content={metaKeyWord.replace(/[\[\]]/g, '')}
                />
            </Helmet>
            <div className="flex flex-col items-center justify-center min-h-[40vh] bg-mainLightBlack p-6">
                <div className="bg-mainBlack shadow-md rounded-lg px-28 py-14 min-w-lg text-center max-w-[75%]">
                    <h1 className="text-3xl font-bold mb-4 text-mainLightColor">
                        Welcome to YELOGIFT!
                    </h1>
                    <hr />
                    <section className="text-mainWhite mb-4">
                        <h2 className="text-2xl font-semibold mb-2 text-mainLightColor">
                            Who We Are
                        </h2>
                        <p>
                            YELOGIFT is a project operated by individuals aimed
                            at providing high-quality digital cards that meet
                            all your needs. At YELOGIFT, we pride ourselves on
                            being a trusted source for digital cards.
                        </p>
                        <p>
                            We provide the easiest solution to purchase all
                            digital cards. With YELOGIFT, you can search for the
                            best products with ease, anytime and anywhere.
                        </p>
                    </section>
                    <section className="text-mainWhite mb-4">
                        <h2 className="text-2xl font-semibold mb-2 text-mainLightColor">
                            Our Mission
                        </h2>
                        <p>
                            Our mission at YELOGIFT is to make the process of
                            purchasing digital cards as easy as possible for our
                            customers. We aim to provide a convenient and
                            reliable shopping experience, ensuring you get the
                            best products in the shortest time possible.
                        </p>
                    </section>
                    <section className="text-mainWhite mb-4">
                        <h2 className="text-2xl font-semibold mb-2 text-mainLightColor">
                            Our Vision
                        </h2>
                        <p>
                            We aspire to be leaders in the digital card market,
                            focusing on innovation and quality to continuously
                            meet our customers' expectations. YELOGIFT is
                            committed to excellence and innovation.
                        </p>
                    </section>
                    <section className="text-mainWhite mb-4">
                        <h2 className="text-2xl font-semibold mb-2 text-mainLightColor">
                            Our Values
                        </h2>
                        <ul className="list-none list-inside ">
                            <li>
                                <span className="font-bold">Simplicity :</span>{' '}
                                Making the purchasing process smooth and
                                straightforward with YELOGIFT.
                            </li>
                            <li>
                                <span className="font-bold">Trust :</span>{' '}
                                Building strong relationships based on trust
                                with our customers at YELOGIFT.
                            </li>
                            <li>
                                <span className="font-bold">Quality :</span>{' '}
                                Providing high-quality products that exceed our
                                customers' expectations at YELOGIFT.
                            </li>
                        </ul>
                    </section>
                    <section className="text-mainWhite">
                        <h2 className="text-2xl font-semibold mb-2 text-mainLightColor">
                            Why Choose Us?
                        </h2>
                        <p>
                            YELOGIFT excels in offering quick and efficient
                            solutions for purchasing digital cards, allowing you
                            to access the best deals anytime and anywhere. Our
                            commitment to quality and trust makes YELOGIFT the
                            perfect choice to meet your digital needs.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
}
