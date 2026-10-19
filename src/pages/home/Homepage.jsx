import {
//   Navbar,
  Hero,
  NewArrivals,
  Collections,
  OurStory,
  AriaStandard,
  Testimonials,
  InstagramFeed,
  Newsletter,
  
//   Footer,
} from "../../components/index.jsx";

const Homepage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
    
      <NewArrivals />
      <Collections />
      <OurStory />
      <AriaStandard />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    
      {/* <Footer /> */}
    </>
  );
};

export default Homepage;
