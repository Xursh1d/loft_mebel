import FilterTable from "../category_chapter/FilterTable";
import "../category_chapter/FilterProduct.css";
import "../homePage/Home.css";
import ReactLoading from "react-loading";

import { useParams } from "react-router";
import CategoryProducts from "./CategoryProducts";

export default function TopCategories({
  categoryIteam,
  filterLoading,
  minAndMax,
  categories,
  price,
  setPrice,
  colors,
  sizes
}) {
  const { slug } = useParams();
  let filterCategories = "";
  categories.forEach((element) => {
    if (element.children) {
      element.children.forEach((child) => {
        if (child.slug === slug) {
          return (filterCategories = `${element.slug} / ${child.slug}`);
        }
      });
    }
    if (element.slug === slug) {
      return (filterCategories = `${slug}`);
    }
    if (slug === "discount") {
      return (filterCategories = "discount");
    }
  });
  return (
    <>
      <h5 className="title_category">Home / {filterCategories}</h5>
      <div className="best-sellers category_products">
        <div
          className={
            slug === "discount" ? "filter_table_disabled" : "fiter_category"
          }
        >
          <FilterTable
            colors={colors}
            price={price}
            sizes={sizes}
            setPrice={setPrice}
            minAndMax={minAndMax}
          />
        </div>
        {filterLoading ? (
    <div className="loader_category_items">
    <h6>Loading</h6>
    <ReactLoading
      className="filter_loading"
      type={"spinningBubbles"}
      color={"#245462"}
      height={"40px"}
      width={"40px"}
    />
  </div>
        ) : ( 
          <CategoryProducts categoryIteam={categoryIteam} slug={slug} />
        )}
      </div>
    </>
  );
}
