import QuizZenAnimation from "../components/home/QuizZenAnimation";
import QuizZenDescription from "../components/home/QuizZenDescription";

export default function Home() {
  return (
    <main className="flex flex-col-reverse md:flex-row justify-between items-center gap-0 md:gap-5 mb-16 md:mb-0">
      <QuizZenDescription />

      <QuizZenAnimation />
    </main>
  );
}
