
import ImageCard from '../ImageCard/ImageCard';
import PropTypes from 'prop-types';
const ImageGallery =({images, openModal})=>{
    return (
        <ul className='image-gallery'>
             {images.map((image) => (
	
	<li key={image.id}>
		
        <ImageCard image={image} openModal={openModal}/>
		
	</li>))}
</ul>

    );
}
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