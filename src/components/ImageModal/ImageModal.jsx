import Modal from "react-modal";
import PropTypes from "prop-types";
import css from "./ImageModal.module.css";

function ImageModal({ isOpen, onClose, image }) {
  if (!image) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className={css.reactmodalportal}>
        <img src={image.urls.regular} alt={image.alt_description} />
        <p className={css.gallerytitle}>{image.description}</p>
        <p className={css.gallerytitle}>Likes: {image.likes}</p>
        <p className={css.gallerytitle}>By: {image.user.name}</p>
      </div>
    </Modal>
  );
}
ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
    description: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ImageModal;
