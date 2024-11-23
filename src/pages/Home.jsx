import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Heart, BookOpen, Droplets, HandHeart } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import { useNavigate } from 'react-router-dom';
import { Zoom } from "react-slideshow-image";
import axios from 'axios';
import image1 from "../components/images/blooddonation.jpg";
import image2 from "../components/images/slide_1.jpg";
import image3 from "../components/images/slide_2.jpg";
import image4 from "../components/images/slide_4.jpg";
import image5 from "../components/images/slide_3.jpg";
import "react-slideshow-image/dist/styles.css"; // Import styles for slideshow
import PaymentModal from '../components/PaymentModal'; 
import CampaignDetailModal from '../components/CampaignDetailModal';
import successStory1 from "../assets/floods.jpg";
import successStory2 from "../assets/blooddonation1.jpg";
import successStory3 from "../assets/plant.jpeg";
import ScrollText from "../components/ScrollText";
import "../slideshow.css"

const images = [image1, image2, image3, image4, image5];

const zoomOutProperties = {
  duration: 1000,
  transitionDuration: 300,
  infinite: true,
  indicators: true,
  scale: 1,
  arrows: true,
};

const Slideshow = () => (
  <div className="slide-container">
    <Zoom {...zoomOutProperties}>
      {images.map((each, index) => (
        <img 
          key={index} 
          style={{ width: "100%", height: "450px", objectFit: "cover" }} 
          src={each} 
          alt={`Slide ${index}`} 
          className="w-full"
        />
      ))}
    </Zoom>
  </div>
);



const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/campaigns')
      .then(response => setCampaigns(response.data))
      .catch(error => console.error("Error fetching campaigns:", error));
  }, []);

  
  const openModal = (campaign, type) => {
    setSelectedCampaign(campaign);
    type === 'donate' ? setIsModalOpen(true) : setIsLearnMoreOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsLearnMoreOpen(false);
    setSelectedCampaign(null);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-500 to-secondary-500 opacity-90">
          <img
            src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="NSS volunteers in action"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-white drop-shadow-lg"
          >
            National Service Scheme
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-white/90"
          >
            Vignan University's Gateway to Social Service
          </motion.p>
          <motion.button
            onClick={() => window.open('https://forms.gle/k5RPh5ozBFa5eM5J7', '_blank')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 hover:scale-105 transform transition duration-300 shadow-lg"
          >
            Join Our Mission
          </motion.button>
        </div>
      </section>

      <ScrollText />

      {/* Active Campaigns Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-primary-600 mb-7 text-center">Active Campaigns</h2>
        <p className="text-center text-lg italic text-gray-600 mb-10">
          "Together we can make a difference, one campaign at a time."
        </p>
        {campaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <div key={campaign._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-50 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{campaign.title}</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Description:</strong> {campaign.description.split('.')[0] + '...'}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Date:</strong> {new Date(campaign.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Location:</strong> {campaign.location}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Target Amount:</strong> {campaign.target}
                  </p>
                  <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-600">Progress</span>
                 
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    style={{ width: `${(campaign.raised / campaign.target) * 100}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-sm text-gray-500 text-right">
                {Math.floor((campaign.raised / campaign.target) * 100)}% of target reached
                </div>
              </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => openModal(campaign, 'donate')}
                      className="flex-1 bg-gradient-to-r from-primary-600 to-accent-500 text-white py-3 rounded-lg hover:shadow-lg transition duration-300"
                    >
                      Donate Now
                    </button>
                    <button
                      onClick={() => openModal(campaign, 'learnMore')}
                      className="flex-1 border border-primary-600 text-primary-600 py-3 rounded-lg hover:bg-primary-50 transition duration-300"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No active campaigns at the moment.</p>
        )}
      </section>

      {/* Payment and Learn More Modals */}
      <PaymentModal isOpen={isModalOpen} onClose={closeModal} campaign={selectedCampaign} />
      <CampaignDetailModal isOpen={isLearnMoreOpen} onClose={closeModal} campaign={selectedCampaign} />
   
     


      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-600 mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg">Making a difference through various social initiatives</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Droplets, title: 'Blood Donation', desc: 'Regular blood donation camps to save lives' },
            { icon: BookOpen, title: 'Book Donation', desc: 'Spreading knowledge through book distribution' },
            { icon: HandHeart, title: 'Community Service', desc: 'Various programs to help the community' }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary-100"
            >
              <service.icon className="h-16 w-16 text-primary-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-primary-700">{service.title}</h3>
              <p className="text-gray-600 text-lg">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Slider Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-primary-700 mb-4">Our Memories</h2>
          <p className="text-gray-600 text-lg">Snapshots from our memorable moments</p>
        </div>
        <div className="slider-wrapper mx-auto" style={{ maxWidth: '700px', minHeight: '300px', overflow: 'hidden', borderRadius: '1.2rem', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
          <Slideshow />
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="max-w-7xl mx-auto px-4 bg-gradient-to-br from-primary-50 to-accent-50 py-20 rounded-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-700 mb-4">Our Impact</h2>
          <p className="text-gray-600 text-lg">A glimpse of our past events and activities</p>
        </div>
        <ImageGallery />
      </section>

     {/* Success Stories Section */}
<section className="max-w-7xl mx-auto px-4 py-20">
  <div className="text-center mb-16">
    <h2 className="text-4xl font-bold text-primary-700 mb-4">Our Success Stories</h2>
    <p className="text-gray-600 text-lg">Real stories from lives we’ve impacted</p>
  </div>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        title: "Helping Flood Victims in Vijayawada",
        description: "Vignan University, through its National Service Scheme (NSS), extended critical relief to flood-affected communities in Vijayawada. Our volunteers distributed essential food, water, and hygiene supplies, provided medical assistance, and helped set up temporary shelters for displaced families. By supporting both the physical and emotional needs of flood victims, we aimed to bring immediate relief and comfort to those impacted, reflecting our commitment to community welfare and social responsibility.",
        image: successStory1, // Using imported image
      },
      {
        title: "Blood Donation Camp Success at Vignan University Making a Difference, One Drop at a Time",
        description: "Vignan University recently held a highly successful Blood Donation Camp, drawing over 200 participants, including students and faculty, who generously donated blood to support local hospitals and emergency centers. This impactful event not only provided life-saving resources but also raised awareness about the critical need for regular blood donations. With support from [Local Blood Bank/Medical Institution], we ensured safe and efficient handling of all donations, highlighting our community's compassion and commitment to social responsibility. Vignan University extends sincere gratitude to everyone involved for making a positive difference in the lives of those in need.",
        image: successStory2, // Using imported image
      },
      {
        title: "World Environment Day 2024 at VFSTR!",
        description: "Vignan University recently organized a successful Plant Donation Drive, where students, faculty, and staff came together to donate and plant over 500 saplings across the campus and surrounding communities. This green initiative aims to promote environmental sustainability, enhance local biodiversity, and create a cleaner, greener environment for future generations. Through this drive, Vignan University reaffirms its dedication to ecological responsibility and community welfare, fostering a culture of environmental stewardship. We thank everyone who contributed to making this event a meaningful step toward a sustainable future.",
        image: successStory3, // Using imported image
      },
    ].map((story, index) => {
      const [showFull, setShowFull] = React.useState(false);

      return (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-52 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-primary-700">{story.title}</h3>
            <p className="text-gray-700">
              {showFull ? story.description : `${story.description.slice(0, 100)}...`}
            </p>
            <button
              onClick={() => setShowFull(!showFull)}
              className="text-primary-700 font-semibold mt-2 underline"
            >
              {showFull ? 'Show less' : 'Read more'}
            </button>
          </div>
        </div>
      );
    })}
  </div>
</section>



      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-500 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-white text-center">
            {[
              { number: '1000+', label: 'Volunteers' },
              { number: '50+', label: 'Campaigns' },
              { number: '5000+', label: 'Lives Impacted' },
              { number: '10+', label: 'Years of Service' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition duration-300"
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


{/* <h1 className="text-3xl font-bold text-gray-800 mb-2">Request Help</h1>
          <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p> */}