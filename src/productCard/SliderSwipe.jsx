import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { photoUrl } from "../helpers/photo_url_fixer";
import prevIcon from "../LoftMebelPhoto/Stroke 165.png";
import nextIcon from "../LoftMebelPhoto/Stroke 166.png";
import Fade from "react-reveal/Fade";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const PreviusBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img className="prev-Icon" src={prevIcon} alt="" />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img className="next-Icon" src={nextIcon} alt="" />
    </div>
  );
};

export default class SlideSwipe extends Component {
  render() {
    const { photos, id } = this.props.productCard;

    const settings = {
      dots: false,
      className: "center",
      centerPadding: "60px",
      slidesToShow: 4,
      infinite: false,
      swipeToSlide: true,
      prevArrow: <PreviusBtn />,
      nextArrow: <NextBtn />,
    };

    return (
      <div>
        <Slider {...settings} className="photo-slider">
          {photos.map((item) => {
            const { photo, id } = item;
            return (
              <Fade>
                <div
                  onClick={() => this.props.handelChangePhoto(photo)}
                  key={id}
                  className="slider-swipe"
                >
                  <img src={photoUrl(photo)} alt="" />
                </div>
              </Fade>
            );
          })}
        </Slider>
        <div className="mobile-photo-slider">
          {photos.map((item) => {
            const { photo, id } = item;
            return (
              <Fade>
                <div
                  onClick={() => this.props.handelChangePhoto(photo)}
                  key={id}
                  className="slider-swipe"
                >
                  <img src={photoUrl(photo)} alt="" />
                </div>
              </Fade>
            );
          })}
        </div>
      </div>
    );
  }
}
