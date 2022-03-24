import MenuColumn1 from "./MenuColumn1";
import {MdOutlineCancelPresentation} from 'react-icons/md'
import BarCategories from "./BarCategories";
import "../Home.css";

export default function MenuBar({ menuBar, setMenuBar, categories,getCategoryId}) {
  return (
    <div
      className={menuBar ? "menuBar active-menuBar" : "menuBar"}
    >
      <div onClick={() => setMenuBar(false)} className="cancel-btn">
        <MdOutlineCancelPresentation className="cancel_icon"/>
      </div>
      <h6>Menu</h6>
      <MenuColumn1 />
      <h6>Categories</h6>
      <BarCategories categories={categories} getCategoryId={getCategoryId}/>
    </div>
  );
}
