import { Link, Outlet } from "react-router-dom";
import ReproductiveStage from "./ReproductiveStage";
import GrainCharacteristics from "./GrainCharacteristics";
export default function RiceData() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="vegetative-stage">
              <h3>Vegetative Stage</h3>
            </Link>
          </li>
          <li>
            <Link to="reproductive-stage">
              <h3>Reproductive Stage</h3>
            </Link>
          </li>
          <li>
            <Link to="grain-characteristics">
              <h3>GrainCharacteristics</h3>
            </Link>
          </li>
          <li>
            <Link to="yield-components">
              <h3>Yield Components</h3>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
