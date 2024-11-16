import { Link } from "react-router-dom";
import backgroundsOne from "../assets/backgrounds/1.jpeg";
import backgroundsTwo from "../assets/backgrounds/2.jpg";
import backgroundsThree from "../assets/backgrounds/3.jpg";
import backgroundsFive from "../assets/backgrounds/5.jpg";
export default function Quiz() {
  return (
    <main className="bg-white p-6 rounded-md h-full">
      <section>
        <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href="./result.html"
            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer"
          >
            <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
              <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
                JavaScript Basic Quiz
              </h1>
              <p className="mt-2 text-lg">
                Test your knowledge of JavaScript basics with quizzes that cover
                essential concepts, syntax, and foundational programming skills
              </p>
            </div>
            <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
              <div>
                <h1 className="text-3xl font-bold">Already Participated</h1>
                <p className="text-center">Click to view your leaderboard</p>
              </div>
            </div>
            <img
              src={backgroundsTwo}
              alt="JavaScript Hoisting"
              className="w-full h-full object-cover rounded mb-4"
            />
          </a>

          <Link
            to={"/login"}
            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative"
          >
            <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
              <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
                JavaScript Basic Quiz
              </h1>
              <p className="mt-2 text-lg">
                Test your knowledge of JavaScript basics with quizzes that cover
                essential concepts, syntax, and foundational programming skills
              </p>
            </div>
            <img
              src={backgroundsThree}
              alt="JavaScript Hoisting"
              className="w-full h-full object-cover rounded mb-4 transition-all "
            />
          </Link>

          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative">
            <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
              <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
                JavaScript Basic Quiz
              </h1>
              <p className="mt-2 text-lg">
                Test your knowledge of JavaScript basics with quizzes that cover
                essential concepts, syntax, and foundational programming skills
              </p>
            </div>
            <img
              src={backgroundsFive}
              alt="JavaScript Hoisting"
              className="w-full h-full object-cover rounded mb-4 transition-all "
            />
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer ">
            <div className="absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
              <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
                JavaScript Basic Quiz
              </h1>
              <p className="mt-2 text-lg">
                Test your knowledge of JavaScript basics with quizzes that cover
                essential concepts, syntax, and foundational programming skills
              </p>
            </div>
            <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
              <div>
                <h1 className="text-3xl font-bold">Already Participated</h1>
                <p className="text-center">You got 20 out of 50</p>
              </div>
            </div>
            <img
              src={backgroundsOne}
              alt="JavaScript Hoisting"
              className="w-full h-full object-cover rounded mb-4 "
            />
          </div>
        </div>
      </section>
    </main>
  );
}
