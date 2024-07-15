import Logo from "../UI/Logo";
import SubscribeNewsLetter from "../UI/SubscribeNewsLetter";
import FooterSection from "./FooterSection";
import { Link } from "react-router-dom";
import appQrCode from "../../assets/images/qrcode_localhost.png";
import playstore from "../../assets/images/GetItOnGooglePlay_Badge_Web_color_English.png";
import appStore from "../../assets/images/appStore.png";

const accountRelatedLinks = [
  {
    label: "My Account",
    path: "/account",
  },
  {
    label: "Login/ Signup",
    path: "/auth",
  },
  {
    label: "Cart",
    path: "/cart",
  },
  {
    label: "Wishlist",
    path: "/wishlist",
  },
  {
    label: "Shop",
    path: "/",
  },
];

const quickLinks = [
  {
    label: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    label: "Terms of Use",
    path: "/terms-of-use",
  },
  {
    label: "FAQ",
    path: "/account",
  },
  {
    label: "Contact",
    path: "/contact-us",
  },
];

export default function Footer() {
  return (
    <footer className="bg-fuchsia-100">
      <div className="max-w-screen-xl xl:mx-auto px-4 py-8 md:p-8 ">
        <Logo className="mb-6" />
        <div className="flex flex-wrap gap-12 mb-6">
          <FooterSection heading="Subscribe">
            <SubscribeNewsLetter />
          </FooterSection>

          <FooterSection heading="Support">
            <div className="flex flex-col gap-3">
              <p>
                Styles Services Abhilash Building, Plot No. 96 EP-IP Industrial
                Area, Whitefield Road, Bangalore, Bangalore - 560 066
              </p>
              <p>styles@customercare.com</p>
              <p>044 4561 4700</p>
            </div>
          </FooterSection>
          <FooterSection heading="Account">
            <div className="flex flex-col gap-4">
              {accountRelatedLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="underline-offset-8 decoration-fuchsia-600 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </FooterSection>
          <FooterSection heading="Quick Links">
            <div className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="underline-offset-8 decoration-fuchsia-600 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </FooterSection>
          <FooterSection heading="Download App">
            <div className="flex flex-col gap-4">
              <p className="font-medium mb-2">
                Get 300₹ off of your first order
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={appQrCode}
                  alt="Styles. app QR code"
                  className="w-32"
                />
                <div className="flex flex-col gap-4">
                  <img src={playstore} alt="get it on playstore image" />
                  <img src={appStore} alt="download on app store image" />
                </div>
              </div>
            </div>
          </FooterSection>
        </div>
        <hr className="my-4 border border-fuchsia-200" />
        <div className="flex flex-col gap-4 md:flex-row justify-between items-center text-sm text-fuchsia-800">
          <p>&copy; Copyright {new Date().getFullYear()} Styles Pvt. Ltd.</p>
          <p>
            Made with 🩷 and lots of effort by{" "}
            <a
              href="https://www.linkedin.com/in/karankumar-thakkar"
              target="_blank"
              className="text-base font-bold hover:underline"
            >
              Karan Thakkar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
