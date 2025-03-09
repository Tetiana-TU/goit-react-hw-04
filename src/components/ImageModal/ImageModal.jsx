
import Modal from 'react-modal';
import PropTypes from 'prop-types';

function ImageModal({ isOpen, onClose, image }) {
  if (!image) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div>
        <img src={image.urls.regular} alt={image.alt_description} />
        <p>{image.description}</p>
        <p>Likes: {image.likes}</p>
        <p>By: {image.user.name}</p>
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