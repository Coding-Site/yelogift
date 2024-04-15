import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-mainLightBlack pt-10 pb-5 text-mainWhite ">
      <div className="flex w-full justify-between container border-b border-gray-700 pb-10">

        <div className="flex flex-col gap-3 ">
          <img className="w-[150px]" src="logo.png" alt="logo" />
          <p className="w-[340px] text-sm">Experience seamless access to leading entertainment platforms through our convenient gift card purchase portal.</p>
            <ul className="flex gap-2">
                <li><Link to="/"><img src="social/facebook.png" alt="facebook" /></Link></li>
                <li><Link to="/"><img src="social/youtube.png" alt="youtube" /></Link></li>
                <li><Link to="/"><img src="social/linkedin.png" alt="linkedin" /></Link></li>
            </ul>
        </div>
        <div className="flex flex-col uppercase">
            <ul className="text-mainWhite">
                <li className="text-main ">Company</li>
                <li ><Link to="/">Privact Policy</Link></li>
                <li ><Link to="/"></Link>Services</li>
                <li ><Link to="/">Term and Conditions</Link></li>
                <li ><Link to="/">About Us</Link></li>
                <li ><Link to="/">Contact</Link></li>
            </ul>
        </div>
        <div className="flex flex-col">
            <ul className="text-mainWhite">
                <li className="text-main ">Contact Us</li>
                <li className="text-main"><Link to="/">Based in IRAQ</Link></li>
                <li ><Link to="/"></Link>hello@yourdomain.com</li>
                <li ><Link to="/">(078) 12345 12112</Link></li>
            </ul>
        </div>
        <div className="flex flex-col">
            <ul className="text-mainWhite">
                <li className="text-main ">Subscribe</li>
                <li className="w-[340px]">Enter your email to get notified about iur news and offers</li>
            </ul>
        </div>
    
      </div>

      <div className="flex justify-end container py-5 text-gray-500">
        &copy; 2024 yelogift all rights reserved
      </div>
    </footer>
  );
}

export default Footer;
