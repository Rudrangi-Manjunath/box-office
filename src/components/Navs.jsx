import React,{memo} from "react";
import { useLocation } from "react-router";

import { NavList, LinkStyled } from "./show/Navs.styled";

const LINKS = [
  { to: "/", text: "Home" },
  { to: "/starred", text: "Starred" },
];
const Navs = () => {
  const location = useLocation();

  return (
    <div>
      <NavList>
        {LINKS.map((items) => (
          <li>
            <LinkStyled
              to={items.to}
              className={items.to === location.pathname ? "active" : ""}
            >
              {items.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default memo(Navs);
