import PropTypes from "prop-types";
import css from "./ImageCard.module.css";
const ImageCard = ({ image, openModal }) => {
  return (
    <div className={css.card} onClick={() => openModal(image)}>
      <img
        className={css.galleryimg}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};
ImageCard.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};
export default ImageCard;
