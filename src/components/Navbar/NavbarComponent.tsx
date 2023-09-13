
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { ImYoutube2 } from 'react-icons/im';

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeBackgroundColor = () => {
    if (window.scrollY > 5 || isMenuOpen) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    changeBackgroundColor();
    window.addEventListener('scroll', changeBackgroundColor);
    return () => {
      window.removeEventListener('scroll', changeBackgroundColor);
    };
  }, [isMenuOpen]);

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={changeColor ? 'color-active' : ''}
        expanded={isMenuOpen}
        fixed='top'
      >
        <Container>
          <Link href="/" passHref className="text-decoration-none">
            <span className="fw-bold fs-4 text-black">ahmadzidni.site</span>
          </Link>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleMenuToggle}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto text-center">
              <div className="nav-link">
                <Link href="/" passHref>
                  Home
                </Link>
              </div>
              <div className="nav-link">
                <a href="/Alquran/list-surah">
                  Alquran
                </a>
              </div>
              <div className="nav-link">
                <Link href="/Jadwalsholat/listkota" passHref>
                  Jadwal Sholat
                </Link>
              </div>
              <div className="nav-link">
                <Link href="/Asmaulhusna" passHref>
                  Asmaul Husna
                </Link>
              </div>
            </Nav>
            <div className="text-center fs-2">
              <a className="text-black" target='_blank' href="https://www.youtube.com/@madzchannel3399">
                <ImYoutube2/>
              </a>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
