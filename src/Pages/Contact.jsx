import React from 'react';

const ContactPage = () => {
  return (
    <section className="wrapper px-4 lg:px-0 font-outfit text-secondary-300">
      <h1 className="text-2xl md:text-[1.875rem] font-normal text-secondary-100 py-10 text-center">
        CONTACT <span className="font-semibold text-black">Us</span>
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Contact Image */}
        <div className="flex-shrink-0">
          <img 
            src="/images/contact_image.png" 
            alt="Contact Us Illustration" 
            className="w-full md:w-[400px] object-cover" 
          />
        </div>

        {/* Contact Details */}
        <article className="text-start">
          <h3 className="text-lg md:text-2xl font-semibold text-secondary-300 uppercase">
            Our Office
          </h3>
          <p className="text-lg py-5 max-w-[325px]">
            54709 Willms Station Suite 350, Washington, USA
          </p>
          <p className="text-lg">Tel: <a href="tel:+2347037361571" className="hover:underline">+234 703 736 1571</a></p>
          <p className="text-lg">Email: <a href="mailto:kolawolekehinde7033@gmail.com" className="hover:underline">kolawolekehinde7033@gmail.com</a></p>

          <h3 className="text-lg md:text-2xl  font-semibold uppercase mt-6">
            Careers at PRESCRIPTO
          </h3>
          <p className="text-lg py-4 max-w-[464px]">
            Learn more about our teams and job openings.
          </p>

          {/* Explore Jobs Button */}
          <button 
            className="px-8 py-3 mt-5 border text-base cursor-pointer rounded hover:bg-primary hover:text-white transition-all duration-300" 
            role="button"
          >
            Explore Jobs
          </button>
        </article>
      </div>
    </section>
  );
};

export default ContactPage;
