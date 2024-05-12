/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";

type Social = {
  id: number;
  name: string;
  link: string;
  icon: string;
}
function Footer() {


  const [socials, setSocials] = useState<Social[]>([]);
  const { adminToken } = JSON.parse(localStorage.getItem("adminData") as string);

  const iconObj: any = {
    'facebook': "/assets/social/facebook.png",
    'twitter': "/assets/social/twitter.png",
    'linkedin': "/assets/social/linkedin.png",
    'youtube': "/assets/social/youtube.png",
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/api/admin/social`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then(d => {
        setSocials(d.data.data);
      });
  }, []);


  return (
    <footer className="bg-mainLightBlack pt-10 pb-5 text-mainWhite ">
      <div className="hidden sm:flex w-full flex-col gap-y-3 sm:flex-row justify-between container border-b border-gray-700 pb-10">

        <div className="flex flex-col gap-3  ">
          <img className="w-[150px]" src="/assets/logo.png" alt="logo" />
          <p className="w-[340px] text-sm">Experience seamless access to leading entertainment platforms through our convenient gift card purchase portal.</p>
          <ul className="flex gap-2">
            <li><Link to="/"><img src="/assets/social/facebook.png" alt="facebook" /></Link></li>
            <li><Link to="/"><img src="/assets/social/youtube.png" alt="youtube" /></Link></li>
            <li><Link to="/"><img src="/assets/social/linkedin.png" alt="linkedin" /></Link></li>
          </ul>
        </div>
        <div className="flex flex-col uppercase">
          <ul className="text-mainWhite">
            <li className="text-main capitalize ">Company</li>
            <li ><Link to="/">Privact Policy</Link></li>
            <li ><Link to="/"></Link>Services</li>
            <li ><Link to="/">Term and Conditions</Link></li>
            <li ><Link to="/">About Us</Link></li>
            <li ><Link to="/">Contact</Link></li>
          </ul>
        </div>
        <div className="flex flex-col">
          <ul className="text-mainWhite">
            <li className="text-main capitalize ">Contact Us</li>
            <li className="text-main"><Link to="/">Based in IRAQ</Link></li>
            <li ><Link to="/"></Link>hello@yourdomain.com</li>
            <li ><Link to="/">(078) 12345 12112</Link></li>
          </ul>
        </div>
        <div className="flex flex-col">
          <ul className="text-mainWhite">
            <li className="text-main  capitalize">Subscribe</li>
            <li className="w-[340px]">Enter your email to get notified about iur news and offers</li>
          </ul>
        </div>

      </div>

      <div className="flex sm:hidden w-full flex-col gap-y-3  justify-between container">
        <div className="text-main font-semibold capitalize text-lg mb-5">Subscribe</div>
        <p className="font-light capitalize text-gray-400 text-base mb-2">Enter your email to get notified about your news and offers</p>
        <div className="relative rounded-md border-gray-500 border bg-transparent flex gap-x-2 items-center px-2 py-1">
          <FaEnvelope className="text-white" />
          <input type="email" className="p-1 outline-none  bg-transparent" placeholder="Email or phone number" />
        </div>
        <div className="flex flex-col uppercase">
          <ul className="text-mainWhite text-sm w-52 mx-auto gap-y-3 flex items-center justify-center flex-col text-center">
            <li className="flex justify-between gap-x-3 w-full"><Link to="/">Company</Link> <img className="w-4" src="/assets/slider/prev.png" alt="" /></li>
            <li className="flex justify-between gap-x-3 w-full" ><Link to="/">Categories </Link> <img className="w-4" src="/assets/slider/prev.png" alt="" /></li>
            <li className="flex justify-between gap-x-3 w-full" ><Link to="/">Contact us</Link> <img className="w-4" src="/assets/slider/prev.png" alt="" /></li>
            <li className="flex justify-between gap-x-3 w-full" ><Link to="/">About Us</Link> <img className="w-4" src="/assets/slider/prev.png" alt="" /></li>
            <li className="flex justify-between gap-x-3 w-full" ><Link to="/">Privacy Policy</Link> <img className="w-4" src="/assets/slider/prev.png" alt="" /></li>
            <li className="flex justify-between gap-x-3 w-full" ><Link to="/">Terms & Conditions</Link> <img className="w-4" src="/assets/slider/prev.png" alt="" /></li>
            <li className="flex justify-center gap-x-3 w-full capitalize mt-5 " >Follow us</li>
            <li className="flex gap-x-2 ">
              {socials.map((social) => <img className="size-10 mx-auto" src={iconObj[social.icon]} alt="" />)}
            </li>
          </ul>
            <p className="text-center normal-case text-sm mt-5 text-gray-400">
              Experience seamless access to leading entertainment platforms through our convenient gift card purchase portal.
            </p>

        </div>
            <hr />
      </div>


      <div className="flex flex-col gap-y-5 sm:flex-row justify-between  w-full container py-5 text-gray-500">
        <span>&copy; 2024 yelogift all rights reserved </span> <span>made by  <a className="inline-block mx-2" href="https://coding-site.com">coding site</a></span>
      </div>
    </footer>
  );
}

export default Footer;
