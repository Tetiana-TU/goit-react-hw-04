import ImageCard from "../ImageCard/ImageCard";
import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";
import { nanoid } from "nanoid";
const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.listgallery}>
      {images.map((image) => (
        <li className={css.gallerycard} key={nanoid()}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      urls: PropTypes.shape({
        small: PropTypes.string.isRequired,
      }).isRequired,
      alt_description: PropTypes.string,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};
export default ImageGallery;
