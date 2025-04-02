import React from 'react';

const AboutPage = () => {
  return (
    <div className="wrapper font-outfit px-4">
      {/* About Us Heading */}
      <h1 className="text-3xl md:text-4xl text-secondary-300 text-center py-10 uppercase">
        About <span className="text-black">Us</span>
      </h1>

      {/* About Section */}
      <div className="flex flex-wrap items-center gap-10">
        <div className="w-full sm:w-[445px] flex justify-center">
          <img
            src="/images/about_image.png"
            alt="About Us"
            className="h-[350px] md:h-[445px] object-cover"
          />
        </div>
        <div className="w-full max-w-2xl text-lg text-secondary-300 capitalize">
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently
            and efficiently. At Prescripto, we understand the challenges individuals face when it
            comes to scheduling doctor appointments and managing their health records.
          </p>
          <p className="py-6 md:py-8">
            Prescripto is committed to excellence in healthcare technology. We continuously strive
            to enhance our platform, integrating the latest advancements to improve user experience
            and deliver superior service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <h4 className="font-bold mb-4 md:mb-8 text-xl">Our Vision</h4>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user.
            We aim to bridge the gap between patients and healthcare providers, making it easier
            for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <h2 className="mt-12 mb-6 text-2xl md:text-3xl text-secondary-300 uppercase ">
        Why <span className="text-black">Choose Us</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border">
        {[
          {
            title: 'Efficiency:',
            text: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
          },
          {
            title: 'Convenience:',
            text: 'Access to a network of trusted healthcare professionals in your area.',
          },
          {
            title: 'Personalization:',
            text: 'Tailored recommendations and reminders to help you stay on top of your health.',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border p-6 md:p-10 hover:bg-primary hover:text-white transition duration-300"
          >
            <h4 className="text-lg font-semibold uppercase">{item.title}</h4>
            <p className="mt-4 capitalize">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
