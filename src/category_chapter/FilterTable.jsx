import "./FilterProduct.css";
import {MdOutlineCancelPresentation} from 'react-icons/md'
import * as InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import ReactLoading from "react-loading";
import { FaCheck } from "react-icons/fa";
import { useContext, useState } from "react";
import { ColorFilter, FilterLoaders, SizeFilter } from "../СategoryItems";
export default function FilterTable({
  price,
  setPrice,
  colors,
  minAndMax,
  sizes,
  setMobileFilter,
  mobileFilter,
}) {
  const { filterColor, setFilterColor } = useContext(ColorFilter);
  const { filterSize, setFilterSize } = useContext(SizeFilter);
  const { loaderInputRange, colorsLoader, sizesLoader } =
    useContext(FilterLoaders);
  const [showMore, setShowMore] = useState(false);

  const changeColors = (id) => {
    const instaed = filterColor.filter((colorId) => colorId !== id);
    const update = filterColor.filter((colorId) => colorId === id);
    if (update.length) {
      setFilterColor(instaed);
    } else {
      setFilterColor([...filterColor, id]);
    }
  };
  const changeSize = (id) => {
    const updateSizes = filterSize.filter((size) => size === id);
    const instaedSizes = filterSize.filter((size) => size !== id);
    if (updateSizes.length) {
      setFilterSize(instaedSizes);
    } else {
      setFilterSize([...filterSize, id]);
    }
  };
  return (
    <div className="update_category">
      <div className="text_filter">
        <h6>Filter</h6>
        <MdOutlineCancelPresentation
        className="cancel_icon"
          onClick={() => setMobileFilter(!mobileFilter)}
        />
      </div>
      <div className="price_filter">
        <h6 className="filter_name">Price</h6>
        {!loaderInputRange ? (
          <>
            <InputRange
              minValue={minAndMax.min}
              maxValue={minAndMax.max}
              value={price}
              onChange={(value) => setPrice(value)}
            />
            <div className="range_prices">
              <span className="min_price">{price.min} $</span>
              <span className="and"></span>
              <span className="max_price">{price.max} $</span>
            </div>
          </>
        ) : (
          <div className="loader_filter">
            <h6>Loading</h6>
            <ReactLoading
              className="loader_spin"
              type={"spinningBubbles"}
              color={"#245462"}
              height={"20px"}
              width={"30px"}
            />
          </div>
        )}
      </div>
      <div className="color_filter">
        <h6 className="filter_name">Colors</h6>
        {!colorsLoader ? (
          <ul className="category_colors">
            {colors.map((col) => {
              const check = filterColor.filter((colorId) => colorId === col.id);
              return (
                <li
                  key={col.id}
                  style={{
                    backgroundColor: col.hex_code,
                  }}
                >
                  <FaCheck
                    className={check.length ? "display_block" : "check_icon"}
                  />
                  <input
                    onChange={() => changeColors(col.id)}
                    backgroundColor={col.hex_code}
                    type="checkbox"
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="loader_filter">
            <h6>Loading</h6>
            <ReactLoading
              className="loader_spin"
              type={"spinningBubbles"}
              color={"#245462"}
              height={"20px"}
              width={"30px"}
            />
          </div>
        )}
      </div>
      <div className="size-filter">
        <h6 className="filter_name">Sizes</h6>
        {!sizesLoader ? (
          <>
            <ul className="category_sizes">
              {sizes.map((size) => {
                const check = filterSize.filter((id) => id === size.id);
                return (
                  <li
                    key={size.id}
                    className={showMore ? "li_display_block" : "none"}
                  >  
                    <FaCheck
                      className={check.length ? "display_block" : "check_icon"}
                    />
                    <input
                      onChange={() => changeSize(size.id)}
                      type="checkbox"
                      className="size_input"
                      id={size.id}
                    />
                    <label htmlFor={size.id}>
                      {size.height} sm × {size.width} sm × {size.length} sm
                    </label>
                  </li>
                );
              })}
            </ul>
            <p
              onClick={() => setShowMore(!showMore)}
              className={sizes.length > 6 ? "size_show_more" : "show_more_none"}
            >
              Show more...
            </p>
          </>
        ) : (
          <div className="loader_filter">
            <h6>Loading</h6>
            <ReactLoading
              className="loader_spin"
              type={"spinningBubbles"}
              color={"#245462"}
              height={"20px"}
              width={"30px"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
