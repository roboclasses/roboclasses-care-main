import dynamic from "next/dynamic";
const DynamicCardDemo = dynamic(() => import("@/demo/dashboard/CardDemo"));

const Hero = () => {
  return (
    <div className="bg-custom-gradient p-20 min-h-screen w-screen relative">
      <div className="lg:flex hidden absolute top-0 left-0 w-40 h-40 bg-gray-200/20 rounded-br-full"></div>
      <div className="lg:flex hidden absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-l from-green-200/40 to-transparent rounded-tl-full"></div>
      <div className="flex flex-col items-center lg:gap-4 gap-5 lg:mt-20">
        <DynamicCardDemo />
        <div className="flex flex-col items-center gap-1">
          <p className="lg:text-5xl text-base font-extrabold flex gap-1 items-center text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
              We are
            </span>
            ROBOclasses
          </p>
          <p className="lg:text-xl text-xs text-center text-white">
            STEM Accredited robotics and coding courses
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
