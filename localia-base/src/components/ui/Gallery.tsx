import { galleryImages } from "../../mockData/galleryData";

function ImageGallery() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {galleryImages.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={`Gallery image ${index + 1}`}
          className={image.className}
        />
      ))}
    </div>
  );
}

export default ImageGallery;