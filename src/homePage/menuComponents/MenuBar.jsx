import MenuColumn1 from "./MenuColumn1";
import BarCategories from "./BarCategories";
import cancel from "../../LoftMebelPhoto/cancel.png";
import "../Home.css";

export default function MenuBar({ menuBar, setMenuBar, categories,getCategoryId}) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={menuBar ? "menuBar active-menuBar" : "menuBar"}
    >
      <div onClick={() => setMenuBar(false)} className="cancel-btn">
        <img src={cancel} alt="" />
      </div>
      <h6>Menu</h6>
      <MenuColumn1 />
      <h6>Categories</h6>
      <BarCategories categories={categories} getCategoryId={getCategoryId}/>
    </div>
  );
}
