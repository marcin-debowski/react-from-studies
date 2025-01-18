import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <br></br>
      <nav>
        <ul>
          <li>
            <Link to="/">task</Link>
          </li>
          <li>
            <Link to="/post">post</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
