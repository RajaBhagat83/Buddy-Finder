
import demovideo from "../../assets/demovideo.mp4";
import { motion } from "framer-motion";

function Video() {
  return (
    <motion.div
      initial ={{opacity:1}}
      animate={{opacity:0}}
      transition={{
        delay:11,
        ease:"circOut"
            }}
      className="h-[600] w-[600px]  rounded-2xl"
    >
      <motion.video
      initial={{opacity:1,y:1}}
      animate={{opacity:1,y:-600}}
      transition={{
        delay:2,
        duration:1,
        ease:"easeOut"
      }}
        className="flex justify-center items-center h-[470px] ml-[550px] mt-28 w-[700px] "
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={demovideo} type="video/mp4" />
   
      </motion.video>
      <motion.div 
       initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{
        delay:3
       }}
      className="absolute bottom-16 right-60 text-white text-2xl pr-[420px] font-inter">
        <span className="text-yellow-500 ">Search People</span><span> with Similar Interest </span><h1 className="pl-24"> and connect easily</h1>
      </motion.div>
    
    </motion.div>
  );
}

export default Video;
