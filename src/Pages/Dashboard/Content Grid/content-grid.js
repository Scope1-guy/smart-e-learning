import ColMain from "./Col-main/col-main";
import ColSide from "./Col-Side/col-side";
import "./content-grid.css";

export default function ContentGrid() {
  return (
    <div className="content-grid">
      <ColMain />
      <ColSide />
    </div>
  );
}
