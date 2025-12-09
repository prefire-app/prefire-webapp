import { useNavigate } from "react-router-dom";

function HomeCTA() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-md text-center lg:flex-auto lg:py-32 lg:text-center">
      <h1 className="text-3xl font-bold mb-4 text-[#efefd1] mt-6">
        A Wildfire Defense Tool for the People
      </h1>
      <p className="text-lg mb-8 text-pretty text-[#efefd1]">
        Providing a defensible space tool for all to save lives and property.
      </p>
      <div
        className="mt-10 flex items-center justify-center gap-x-6
        "
      >
        <button
          onClick={() => navigate("/map")}
          className="rounded-md bg-[#efefd1] px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/learning")}
          className="text-sm/6 font-semibold text-[#efefd1] hover:underline"
        >
          Learn More <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

export default HomeCTA;
