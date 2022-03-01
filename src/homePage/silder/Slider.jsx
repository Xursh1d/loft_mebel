import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Home.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";

export default function Slider({ slider, activeSlide, setActiveSlide }) {
  const length = slider.length;
  const nextSlide = () => {
    setActiveSlide(activeSlide === length - 1 ? 0 : activeSlide + 1);
  };
  const lastSlide = () => {
    setActiveSlide(activeSlide === 0 ? length - 1 : activeSlide - 1);
  };
  useEffect(() => {
    let slider = setInterval(() => {
      setActiveSlide(activeSlide === length - 1 ? 0 : activeSlide + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  });
  return (
    <div className="sliders">
      {slider.map((sliderItem, index) => {
        const { id, photo, heading, subheading, url, button } = sliderItem;
        let position = "next-slide";
        if (index === activeSlide) {
          position = "active-slide";
        }
        if (
          index === activeSlide - 1 ||
          (activeSlide === 0 && index === slider.length - 1)
        ) {
          position = "last-slide";
        }
        return (
          <div key={id} className={position}>
            <img src={photo} alt="" />
            <div className="slider-items">
              <Slide top>
                <h1>{heading}</h1>
              </Slide>
              <Fade>
                <p>{subheading}</p>
              </Fade>
              <Slide bottom>
                <Link to={url}>
                  <button>{button}</button>
                </Link>
              </Slide>
            </div>
          </div>
        );
      })}
      <button onClick={lastSlide} className="arrow-back">
        <IoIosArrowBack className="back-icon" />
      </button>
      <button onClick={nextSlide} className="arrow-forward">
        <IoIosArrowForward className="forward-icon" />
      </button>
    </div>
  );
}
