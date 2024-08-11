
import { Link, Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      {/* <Link to={"/"}>
      
      </Link> */}
      <Outlet />
    </div>
  );
}

export default AuthLayout;