
import { Link } from "react-router-dom";

const categories = [
  { name: "Men", img: "https://i.pinimg.com/736x/f6/6d/4c/f66d4cad658cce795b94a34b33325204.jpg" },
  { name: "Women", img: "https://i.pinimg.com/736x/bc/16/9a/bc169a18ab7485df0464fb4ccd376eb2.jpg" },
  { name: "Running", img: "https://i.pinimg.com/1200x/ae/ff/ba/aeffba3219fcdfb434b97d2260701370.jpg" },
  { name: "Kids", img: "https://i.pinimg.com/736x/45/f4/88/45f4889fbdcf4dd192e60641276b70b4.jpg" },
];

const CategoryHome = () => {
  return (
    <div className="p-5 bg-gray-100">
  <div className="font-bold text-3xl text-zinc-700 p-4">Categories</div>

  {/* Removed 'overflow-auto' from this line */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-6">
    {categories.map((category, index) => (
      <div key={index} data-aos="flip-left">
        <Link to={``}>
          <div className="relative h-[300px] bg-white shadow-md rounded-lg overflow-hidden group">
            <img
              src={category.img}
              alt={category.name}
              className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Optional hover content here */}
            </div>
          </div>
          <div className="items-center justify-center group-hover:opacity-100 transition-opacity duration-300 mt-2">
            <button className="text-black bg-white p-3 rounded-md w-full">
              {category.name}
            </button>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>

  );
};

export default CategoryHome;
