import React from "react";
import DashBoard from "../../assets/DashBoard.png";
import Button from "./Button.jsx";
import Login from "../../assets/login.png";
import Connection from "../../assets/Connection.png";
import Future from "../../assets/Future.png";
import World from "../../assets/World.png";
import { motion } from "framer-motion";

function Middle() {
  return (
    <div className="h-[3350px] w-full mb-8 bg-[#fbfafb]">
      <div className="flex justify-between mt-3 ">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "tween",
            duration: 0.5,
            ease: "easeIn",
          }}
          viewport={{ once: true, amount: 0.6 }}
          className="text-4xl font-inter m-32 italic "
        >
          <h1 className="text-yellow-500 mb-2">Want to Grow Faster ?</h1>
          <h1>Login and see</h1>
          <h1 className="ml-44 mt-2"> the Difference</h1>
          <Button className="mt-0 ml-[410px]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "tween",
            duration: 0.5,
            ease: "easeIn",
          }}
          viewport={{ once: true, amount: 0.6 }}
          className=" mr-56 mt-24 "
        >
          <img src={Login} height={1100} width={450} className="shadow-xl" />
        </motion.div>
      </div>
      <div>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 50 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 21,
              duration: 0.5,
            }}
             viewport={{ once: true, amount: 0.6 }}
            className="font-inter text-6xl items-center mt-7 ml-32 mb-24 "
          >
            <h1>Multiply Your Output With the Power of Collaboration </h1>
          </motion.div>
        </div>
        <div className="text-2xl ml-5 italic font-inter">
          <div className="flex justify-between">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: "easeIn",
              }}
              viewport={{ once: true, amount: 0.6 }}
            >
              <ul className="list-disc ml-44 marker:text-blue-600 w-[600px] text-3xl mt-0">
                <li className="mb-4">
                  Enable users to discover opportunities, build networks, and
                  boost productivity directly on your website with a seamless
                  experience
                </li>
                <li className="mb-4">
                  Take control of your professional growth while keeping all
                  your data secure and in your hands.
                </li>
                <li className="mb-4">
                  Customize your workflows, track progress, and unlock insights
                  that help you grow smarter and faster.
                </li>
                <li className="mb-4">
                  Engage with the right people, exchange skills, and achieve
                  more together than ever before.
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: "easeIn",
              }}
              viewport={{ once: true, amount: 0.6 }}
              className="mr-64 mt-4 ml-0"
            >
              <img
                src={DashBoard}
                height={1200}
                width={500}
                className="shadow-xl"
              />
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 50 }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 21,
                duration: 0.5,
              }}
               viewport={{ once: true, amount: 0.6 }}
              className="font-inter text-5xl items-center ml-[340px] mt-24"
            >
              <h1>The fastest Way to Grow your Connection </h1>
            </motion.div>
          </div>
          <div className="flex justify-between">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: "easeIn",
              }}
               viewport={{ once: true, amount: 0.6 }}
              className=" mr-16 ml-64 mt-32"
            >
              <img
                src={Connection}
                style={{ height: "400px", width: "500px" }}
                className="shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: "easeIn",
              }}
               viewport={{ once: true, amount: 0.6 }}
            >
              <ul className="list-disc mr-44 marker:text-blue-600 mt-32 w-[600px]  pl-0 text-3xl">
                <li className="mb-4">
                  Find like-minded people, mentors, and peers in just a few
                  clicks.
                </li>
                <li className="mb-4">
                  Use intelligent filters to connect with the right people who
                  align with your goals.
                </li>
                <li className="mb-4">
                  Keep track of all your connections in one place while staying
                  in full control of your data.
                </li>
                <li className="mb-4">
                  Easily start conversations, share ideas, and build projects
                  together.
                </li>
                <li className="mb-4">
                  Leverage insights and tools designed to 2x your productivity
                  through meaningful relationships.
                </li>
              </ul>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 50 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 21,
              duration: 0.5,
            }}
             viewport={{ once: true, amount: 0.6 }}
            className="font-inter text-5xl ml-[150px] mt-24"
          >
            <h1>Seamlessly expand your reach with continuous updates</h1>
            <h1 className="ml-[350px] mt-6">that drive efficiency. </h1>
          </motion.div>
        </div>
        <div className="flex justify-between">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: "easeIn",
            }}
             viewport={{ once: true, amount: 0.6 }}
            className=" mr-16  ml-72 mt-24"
          >
            <img src={Future} height={1300} width={600} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: "easeIn",
            }}
             viewport={{ once: true, amount: 0.6 }}
            className="text-2xl italic mt-56 mr-44 ml-0"
          >
            <h1 className="font-semibold :mb-7">
              Seamlessly expand your reach{" "}
            </h1>
            <h1>Unlock growth with continuous updates designed to</h1>
            <h1>maximize efficiency.</h1>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 50 }}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 21,
            duration: 0.5,
          }}
           viewport={{ once: true, amount: 0.6 }}
          className="font-inter text-6xl ml-[280px] mt-24  "
        >
          <h1>Scale faster with dedicated support</h1>
        </motion.div>
        <div className="flex justify-between">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: "easeIn",
            }}
             viewport={{ once: true, amount: 0.6 }}
            className="ml-72 mt-24 mr-16"
          >
            <img src={World} height={1000} width={450} className="shadow-xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: "easeIn",
            }}
             viewport={{ once: true, amount: 0.6 }}
            className=" text-2xl italic mr-44 "
          >
            <ul className="list-disc marker:text-blue-600 mt-44 w-[600px] ml-0">
              <li className="mb-4">
                Share feedback to shape updates that make your journey smoother.
              </li>
              <li className="mb-4">
                Invite others to share their insights and grow together as a
                community.
              </li>
              <li className="mb-4">
                Connect, share, and gain access to the best crowd to help you
                succeed.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Middle;
