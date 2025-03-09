

import PropTypes from 'prop-types';
const ImageCard =({image, openModal})=> {
    return (
<div className='image-card' onClick={()=>openModal(image)}>
  <img src={image.urls.small} alt={image.alt_description} />
</div>
    );
}
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