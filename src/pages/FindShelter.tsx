import { useState } from 'react';
import axios from 'axios';
import Map from '../components/googleMaps/Map.tsx';
import SheltersMap from '@/components/googleMaps/SheltersMap.tsx';

function FindShelter() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/shelters', {
        name,
        address,
        description,
      });

      // Handle success (e.g., show a success message, reset form)
      console.log('Shelter created:', response.data);
      setName('');
      setAddress('');
      setDescription('');
      setError('');
    } catch (err) {
      // Handle error (e.g., show an error message)
      console.error('Error creating shelter:', err);
      setError('Failed to create shelter. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[50vh] sm:h-[60vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
      >
        <div className="bg-red-700 p-6 sm:p-8 rounded-lg text-center max-w-[90%] sm:max-w-[750px] mt-32 mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Find a Shelter
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            Locate the nearest shelters for safety and assistance in just a few clicks.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-red-800 mb-6 sm:mb-8 text-center">
          Nearby Shelters
        </h2>
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] rounded-lg shadow-2xl overflow-hidden">
          <Map />
        </div>
      </section>

      {/* Create Shelter Form */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-red-800 mb-6 sm:mb-8 text-center">
          Add a New Shelter
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Shelter Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Add Shelter
          </button>
        </form>
      </section>
      <SheltersMap/>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-4 sm:py-6">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-semibold">Emergency Contact</h4>
            <a href="tel:0545908686">0545908686 Omri Nelken</a>
          </div>
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 rounded-full text-base sm:text-lg font-semibold transition duration-300">
            Get Help Now
          </button>
        </div>
      </footer>
    </div>
  );
}



export default FindShelter;
