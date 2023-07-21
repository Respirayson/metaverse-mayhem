import { motion } from 'framer-motion';
import { socials } from '../constants';

import { footerVariants } from '../utils/motion';
import Login from './Login/Login';

function Footer({ handleLogin, authenticated, handleLogout }) {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="sm:px-16 px-6 py-8 relative"
    >
      <div className="footer-gradient" />
      <div className="2xl:max-w-[1280px] w-full mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between flex-wrap gap-5">
          <h4 className="font-bold md:text-[64px] text-[44px] text-white">
            Enter the Battlegrounds
          </h4>
          {!authenticated && (
            <Login onLoggedIn={handleLogin} text="Enter Mayhem" />
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-[50px] h-[2px] bg-white opacity-10" />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <h4 className="font-extrabold text-[24px] text-white">
              METAVERSE MAYHEM
            </h4>
            <p className="font-normal text-[14px] text-white opacity-50">
              Copyright © 2023 Metaverse Mayhem. All rights reserved.
            </p>

            <div className="flex gap-4">
              {socials.map((social) => (
                <img
                  key={social.name}
                  src={social.url}
                  alt="social"
                  className="w-[24px] h-[24px] object-contain cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
