import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  return (
    <div className="font-bold text-xl text-[#efefd1] hover:underline">
      <button className="hover:underline" onClick={() => navigate("/")}>
        prefire
      </button>
    </div>
  );
}

export default Logo;
