"use client";

import Link from "next/link";
import { styled } from "styled-components";
import { ImHome } from "react-icons/im";
import { BsFillPencilFill } from "react-icons/bs";

const NavBarComponent = styled.nav`
  width: 100%;
  height: 70px;
  background-color: #4d8eff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkList = styled.ul`
  display: flex;
  gap: 30px;
`;

export default function NavBar() {
  return (
    <NavBarComponent>
      <LinkList>
        <li>
          <Link href="/">
            <ImHome size={30} color='#fff'/>
          </Link>
        </li>
        <li>
          <Link href="/write">
            <BsFillPencilFill size={30} color='#fff'/>
          </Link>
        </li>
      </LinkList>
    </NavBarComponent>
  );
}
