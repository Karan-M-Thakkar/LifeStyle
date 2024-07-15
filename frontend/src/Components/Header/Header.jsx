import { useCallback, useState } from "react";
import Button from "../UI/Button";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store";
import { IoIosMenu } from "react-icons/io";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import { AnimatePresence } from "framer-motion";
import Logo from "../UI/Logo";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(authActions.logout());
  };

  const handleCloseMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className="fixed w-full bg-white shadow-md z-10 ">
      <nav className="w-full max-w-screen-xl mx-auto flex justify-between items-center p-4 md:px-8 md:py-4">
        <div className="flex gap-4 items-center">
          <IoIosMenu
            className="text-lg md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          />
          <Logo />
        </div>
        <Menu className="hidden md:flex md:gap-12" />
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MenuMobile
              className="flex flex-col md:hidden fixed h-dvh top-0 inset-x-0 bg-[#00000045]"
              hideMenu={handleCloseMenu}
            />
          )}
        </AnimatePresence>
        {isAuthenticated && (
          <Button text onClick={handleLogout}>
            Logout
          </Button>
        )}
      </nav>
    </header>
  );
}
