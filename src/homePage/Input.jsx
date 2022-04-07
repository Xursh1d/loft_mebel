import React, { useState } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../LoftMebelPhoto/search-icon.svg";
import { useHistory } from "react-router";
export default function Input({
  type,
  palceholder,
  style,
  setChangeSearch,
  search,
}) {
  const [target, setTarget] = useState();
  const history = useHistory();
  const keyPress = (e) => {
    setTarget(e.target.value);
    if (e.keyCode == 13) {
      history.push(`/search/${e.target.value}`);
    }
  };
  const handelChange = (e) => {
    setChangeSearch(e.target.value);
  };
  const handelSearch = () => {
    history.push(`/search/${target}`);
  };
  return (
    <div className="input_item">
      <img
        onClick={handelSearch}
        src={searchIcon}
        className={style === "inputStyle" ? "searchIcon" : "mobile_searchIcon"}
      />
      <input
        onKeyUp={keyPress}
        className={style}
        onChange={handelChange}
        placeholder={palceholder}
        type={type}
      />
      {search ? (
        <ul
          className={
            style === "mobile-input"
              ? "mobile_search_compate"
              : "search_complate term"
          }
        >
          {search.map((text) => {
            return (
              <Link to={`/product_card/${text.slug}`}>
                <li key={text.id}>{text.title}</li>
              </Link>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
