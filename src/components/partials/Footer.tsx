import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { MdMail } from "react-icons/md";

export const Footer = () => {
  return (
    <footer>
      <div className="h-full w-full bg-zinc-900 rounded-tl-[3rem] ">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-14 text-white overflow-hidden px-4 py-4 md:px-8 md:py-8">
          <div className="w-full md:w-1/2 space-y-4">
            <div className="relative w-[126px] h-[44px]">
              <Image
                src="/icons/nutribud-icon-white.png"
                fill
                alt="NutriBud Logo"
                className="cover"
              />
            </div>
            <div className="flex flex-row gap-4 py-4">
              <FaFacebook className="w-5 h-5" />
              <FaInstagram className="w-5 h-5" />
              <FaTiktok className="w-5 h-5" />
              <FaYoutube className="w-5 h-5" />
            </div>
            <p>
              NUTRIBUD is more than just a food app; it&apos;s also a fitness
              partner designed to help you eat healthier and feel better.
              Nutribud&apos;s user-friendly design and tips will make it easier
              to transition to a healthy lifestyle. Choosing healthier foods is
              now simple, thanks to a community that shares nutritional
              ingredients and inspires you to meet your nutritional objectives.
            </p>
            <p>&copy; 2024 NutriBud. All rights reserved</p>
          </div>
          <div className="w-full md:w-1/4 space-y-4">
            <p className="font-semibold pb-2">Contact</p>
            <span className="flex flex-row gap-4 py-2 border-b-[0.1rem] border-white w-fit pr-4 items-center">
              <FaPhone className="w-5 h-5" /> <p>+63 xxxx xxx xxxx</p>
            </span>
            <span className="flex flex-row gap-4 py-2 border-b-[0.1rem] border-white w-fit pr-4 items-center">
              <MdMail className="w-5 h-5" /> <p>nutribud@gmail.com</p>
            </span>
          </div>
          <div className="w-full md:w-1/4 space-y-4">
            <p className="font-semibold pb-2">Company</p>
            <span className="flex flex-row gap-4 py-2 border-b-[0.1rem] border-white w-fit pr-4 items-center">
              <p>About</p>
            </span>
            <span className="flex flex-row gap-4 py-2 border-b-[0.1rem] border-white w-fit pr-4 items-center">
              <p>Policy</p>
            </span>
            <span className="flex flex-row gap-4 py-2 border-b-[0.1rem] border-white w-fit pr-4 items-center">
              <p>Terms</p>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
