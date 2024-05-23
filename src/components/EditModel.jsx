import closeImg from "../assets/close.png";
// eslint-disable-next-line react/prop-types
const EditModel = ({ editModel, setEditModel, data }) => {
  console.log(data);
  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-40 z-[2000] flex justify-center items-center">
      <div className=" relative  w-[500px] bg-white rounded-md p-5">
        <img
          onClick={() => setEditModel(false)}
          className="absolute left-4 top-4 cursor-pointer hover:scale-110 transition-all"
          src={closeImg}
          alt=""
        />
        <form action=""></form>
        <div className="w-full">
          <label className="block" htmlFor="registration_number">
            رقم الشاخص:
          </label>
          <input
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            type="text"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default EditModel;
