import Navbar from "../navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <section className="px-4 mt-[32px]">
        <button
          type="button"
          className="font-inter text-base leading-6 text-main-blue rounded-lg
         shadow-custom-shadow py-[10px] px-[14px] w-full text-left"
        >
          <span className="text-2xl">+</span> Add a task
        </button>
      </section>
    </div>
  );
};

export default Home;
