import Image from 'next/image';
import Link from 'next/link';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
};

// Function to get a random product image
const getRandomProductImage = () => {
  const productImages = [
    '/images/products/caroline-attwood-E1rH__X9SA0-unsplash.jpg',
    '/images/products/charlesdeluvio-3IMl0kCxpHQ-unsplash.jpg',
    '/images/products/daniel-korpai-wW7XbWYoqK8-unsplash.jpg',
    '/images/products/galina-n-miziNqvJx5M-unsplash.jpg',
    '/images/products/imani-bahati-LxVxPA1LOVM-unsplash.jpg',
    '/images/products/irene-kredenets-KStSiM1UvPw-unsplash.jpg',
    '/images/products/jakob-owens-O_bhy3TnSYU-unsplash.jpg',
    '/images/products/kiran-ck-LSNJ-pltdu8-unsplash.jpg',
    '/images/products/lumin-1mp7rF7_j2I-unsplash.jpg',
    '/images/products/mitzie-organics-dnstpPqCBbw-unsplash.jpg',
    '/images/products/mohammad-metri-E-0ON3VGrBc-unsplash.jpg',
    '/images/products/nataliya-melnychuk-PdzMmdHqN2c-unsplash.jpg',
    '/images/products/oscar-ivan-esquivel-arteaga-ZtxED1cpB1E-unsplash.jpg',
    '/images/products/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg',
    '/images/products/ruslan-bardash-4kTbAMRAHtQ-unsplash.jpg',
    '/images/products/taras-chernus-eSIlQfibAo8-unsplash.jpg',
    '/images/products/varun-gaba-dcgB3CgidlU-unsplash.jpg'
  ];
  
  const randomIndex = Math.floor(Math.random() * productImages.length);
  return productImages[randomIndex];
};

const teamMembers: TeamMember[] = [
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Customer Success',
    image: '/images/assets/profile4.jpg',
    bio: 'Dedicated to ensuring your shopping experience is exceptional.'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Head of Design',
    image: '/images/assets/profile2.jpg',
    bio: 'Creative mind behind our brand identity and user experience.'
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Lead Developer',
    image: '/images/assets/profile3.jpg',
    bio: 'Tech enthusiast building seamless shopping experiences.'
  },
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    image: '/images/assets/profile1.jpg',
    bio: 'Visionary leader with 10+ years of experience in e-commerce.'
  }
];

export default function AboutPage() {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative h-96 w-full">
        <div className="absolute inset-0">
          <Image
            src="/images/assets/aboutus.png"
            alt="Our team working together"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">About Us</h1>
              <p className="text-xl md:text-2xl max-w-2xl text-white">
                Empowering your shopping experience with quality products and exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
        <div className="prose prose-lg text-gray-700">
          <p>
            Our journey is built on empowering both sellers and buyers to experience fairness, trust, and convenience in every transaction. 
            We've created a platform where anyone can confidently buy or sell their properties at fair market prices—all from the comfort of their own room.
          </p>
          <p className="mt-4">
            Founded in 2023, our journey began with a simple idea: to create an e-commerce platform that combines quality products with an exceptional shopping experience. 
            What started as a small online store has grown into a trusted destination for customers who value both style and substance.
          </p>
          <p className="mt-4">
            We believe in building lasting relationships with our customers through transparency, integrity, and a relentless focus on quality. 
            Every product in our collection is carefully curated to ensure it meets our high standards.
          </p>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Mission & Values</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Fair Market Value</h3>
                  <p className="text-gray-700">Ensuring every property transaction reflects its true market worth, benefiting both buyers and sellers.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Secure Transactions</h3>
                  <p className="text-gray-700">Your property transactions are protected with bank-level security and escrow services.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Community Trust</h3>
                  <p className="text-gray-700">Building a trusted platform where both buyers and sellers can connect with confidence.</p>
                </div>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={getRandomProductImage()}
                alt="Featured product"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={member.id <= 4}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-blue-700 mb-2">{member.role}</p>
                <p className="text-gray-700 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FairBid Logo */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="my-12">
          <div className="relative h-32 w-full">
            <Image
              src="/images/assets/Asset 10FAIRBID.png"
              alt="FairBid Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Experience the Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
            Join thousands of satisfied customers who trust us for their shopping needs.
          </p>
          <Link 
            href="/shop" 
            className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
