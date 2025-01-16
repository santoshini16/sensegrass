import Tick from "/tick.svg";
import { Link } from "react-router-dom";

const PriceCard = ({ heading, subHead, price, priceDesc, features, renewal,plans }) => {
  return (
    <div className="flex flex-col gap-4 p-2 md:p-4 rounded-xl bg-gray-800 text-white shadow-md border border-gray-700 hover:shadow-lg transition-shadow duration-300">
      {/* Heading Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
        <p className="text-base text-gray-400">{subHead}</p>
      </div>

      {/* Price Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold">
          ₹{price}
          <span className="text-base text-gray-400"> / month</span>
        </h2>
        <p className="text-sm text-gray-400">{priceDesc}</p>
      </div>

      {/* Button */}
      <button
       
        className="w-full py-2 text-center text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300"
      >
        Get Started
      </button>

      {/* Divider */}
      <hr className="w-full my-4 border-t border-gray-600" />

      {/* Features Section */}
      <div className="flex flex-col gap-3">
        {features.map((feat, id) => (
          <div className="flex items-center gap-2" key={id}>
            <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
              <img src={Tick} alt="tick mark" className="w-3 h-3" />
            </div>
            <p className="text-gray-300 hover:text-white cursor-pointer">
              {feat}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="w-full my-4 border-t border-gray-600" />

      {/* Renewal Info */}
      <p className="text-sm text-gray-400">{renewal}</p>
    </div>
  );
};


export default PriceCard;


