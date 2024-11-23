import LightGallery from 'lightgallery/react';
import '../Gallery.css';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';


// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay'
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';

const images = [
    { src: "src/public/g1.jpg", alt: "Flag of India" },
    { src: "src/public/g2.jpg", alt: "2" },
    { src: "src/public/g3.jpg", alt: "3" },
    { src: "src/public/g4.jpg", alt: "4", },
    { src: "src/public/g5.jpg", alt: "5", },
    { src: "src/public/g6.jpg", alt: "6", },
    { src: "src/public/g7.jpg", alt: "7", },
    { src: "src/public/g8.jpg", alt: "8", },
    { src: "src/public/g9.jpg", alt: "9", },
    { src: "src/public/g10.jpg", alt: "10", },
    { src: "src/public/g11.jpg", alt: "11", },
    { src: "src/public/g12.jpg", alt: "12", },
    { src: "src/public/g13.jpg", alt: "13", },
    { src: "src/public/g14.jpg", alt: "14", },
    { src: "src/public/g15.jpg", alt: "15", },
   
]

export default function Gallery() {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (
        <div className="App">
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare]}
            >

                {images.map((image, index) => {
                    return (
                        <a href={image.src} key={index}>
                            <img className="galleryImg" alt={image.alt} src={image.src} />
                        </a>
                    )
                })}


            </LightGallery>
        </div>
    );
}
