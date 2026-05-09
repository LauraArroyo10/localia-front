import { NavbarMenu } from "../mockData/data";

export interface NavBarProps{

}


function NavBar() {
  return (
    <h1>
      <nav className="container ">
        <a className="navbar-brand" href="#">
          <img
            src="src/assets/brand/logo.svg"
            width="150"
            height="150"
            className="d-inline-block align-top"
            alt="localia logo"
          />
        </a>

        
      </nav>

    </h1>
  );
}

export default NavBar;




