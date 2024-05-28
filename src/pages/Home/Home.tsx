import CallToAtion from '../../components/CallToAtion';
import Slider from '../../components/Slider/Slider';
import PopularCards from './components/PopularCards';
import Shuffle from './components/Shuffle';

function Home() {
    return (
        <div className="py-10">
            <Slider />
            <PopularCards />
            <Shuffle />
            <CallToAtion />
        </div>
    );
}

export default Home;
