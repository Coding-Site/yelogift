import { useEffect, useState } from 'react';
import CallToAtion from '../../components/CallToAtion';
import Slider from '../../components/Slider/Slider';
import PopularCards from './components/PopularCards';
import Shuffle from './components/Shuffle';
import { Helmet } from 'react-helmet-async';
import instance from '../../axios';

function Home() {
    const [pageTitle, setPageTitle] = useState('Home | Yelo-Gift');
    const [metaDesc, setMetaDesc] = useState(
        'Experience seamless access to leading entertainment platforms through our convenient gift card purchase portal. facebook; linkedin; youtube; twitter.'
    );
    const [metaKeyWord, setMetaKeyWord] = useState(
        'seo, search engine optimization'
    );

    useEffect(() => {
        instance.get(`/api/pages/1`).then((d) => {
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
                <link rel="canonical" href="/" />
                <meta name="description" content={metaDesc} />
                <meta
                    name="keywords"
                    content={metaKeyWord.replace(/[\[\]]/g, '')}
                />
            </Helmet>
            <div className=" py-2 sm:py-10">
                <Slider />
                <PopularCards />
                <Shuffle />
                <CallToAtion />
            </div>
        </>
    );
}

export default Home;
