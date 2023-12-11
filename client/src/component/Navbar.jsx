import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Section>
      <Container>
        <Links>
          <Logo src="../img/logo.png" alt="logo" />
          <List>
            <StyledLink to="/"><ListItem>Home</ListItem></StyledLink>
            <StyledLink to="/login"><ListItem>Login</ListItem></StyledLink>
            <StyledLink to="/signup"><ListItem>Signup</ListItem></StyledLink>
          </List>
        </Links>
        <Icons>
     
          {/* Hamburger menu icon */}
          <HamburgerIcon onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerIcon>
        </Icons>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <MobileMenu>
            <StyledLink to="/" onClick={toggleMenu}><ListItem>Home</ListItem></StyledLink>
            <StyledLink to="/login" onClick={toggleMenu}><ListItem>Login</ListItem></StyledLink>
            <StyledLink to="/signup" onClick={toggleMenu}><ListItem>Signup</ListItem></StyledLink>
          </MobileMenu>
        )}
      </Container>
    </Section>
  );
}

export default Navbar;

// Styled components (assuming you already have styles for these components)
const Section = styled.section`
  /* your styles */
`;
const Container = styled.div`
  /* your styles */
`;
const Links = styled.div`
  /* your styles */
`;
const Logo = styled.img`
  /* your styles */
`;
const List = styled.ul`
  /* your styles */
`;
const StyledLink = styled(Link)`
  /* your styles */
`;
const ListItem = styled.li`
  /* your styles */
`;
const Icons = styled.div`
  /* your styles */
`;
const HamburgerIcon = styled.div`
  /* your styles */
`;
const MobileMenu = styled.div`
  /* your styles */
`;
