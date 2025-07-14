import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


const About = () => {
    useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false, //This makes it animate again when scrolling back up
  });
  AOS.refresh();
}, []);
  return (
      <div className="relative p-5 bg-gray-100 shadow-md rounded-lg overflow-hidden group md:grid md:grid-cols-2">
      <img 
        src="https://i.pinimg.com/736x/97/c5/dd/97c5dd04a115392c09df100c4cccd8e6.jpg" 
        alt="About" 
        data-aos="fade-right"
        data-aos-delay="100"
        data-aos-offset="200"
        className="w-full object-cover md:rounded-l-lg" 
      />
      
      <div 
        className="flex flex-col items-center justify-center bg-gray-100 p-6 md:p-10"
        data-aos="fade-left"
        data-aos-delay="200"
        data-aos-offset="200"
      >
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">About Us</h1>
          <p className="text-gray-600 mb-6">
            Selected materials designed for comfort and sustainability. Nullam auctor faucibus ridiculus dignissim sed et auctor sed eget auctor nec sed elit nunc, magna non urna amet ac neque ut quam enim pretium risus gravida ullamcorper adipiscing at ut magna.
          </p>
          <Link
            to="/more-info"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>

  );
};

export default About;