'use client';

import Link from "next/link";
import { styled } from "styled-components";

const NavBarComponent = styled.nav`
  width: 100%;
  height: 150px;
  background-color: red;
  display: flex;
`

export default function NavBar() {
  return (
    <NavBarComponent>
      <ul>
        <li>
          <Link href='/write'>글쓰기</Link>
        </li>
      </ul>
    </NavBarComponent>
  )
}
