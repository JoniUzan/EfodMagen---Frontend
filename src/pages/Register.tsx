import { useAuth } from "@/context/AuthProvider";
import React from "react";

function Register() {
  const { register } = useAuth();

  function registerHandler(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    // Extract the values from the form fields
    const formData = new FormData(ev.target as HTMLFormElement);

    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const address = formData.get("address") as string;
    let israeli_ID = formData.get("israeli-id") as string | number;

    israeli_ID = parseInt(israeli_ID as string);
    console.log({ firstName, lastName, email, password, israeli_ID, address });
    

    // Call the login function with the extracted values
    register({ firstName, lastName, email, password, israeli_ID, address });
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-red-600 to-black flex items-center justify-center">
      <div className="absolute p-8 bg-white shadow-lg rounded-lg border border-gray-300 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Register
        </h2>
        <form onSubmit={registerHandler} className="space-y-4">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              placeholder="Enter your first name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Enter your last name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="israeli-id"
              className="block text-sm font-medium text-gray-700"
            >
              Israeli ID
            </label>
            <input
              type="text"
              id="israeli-id"
              name="israeli-id"
              placeholder="Enter your Israeli ID"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/auth/login" className="text-red-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
