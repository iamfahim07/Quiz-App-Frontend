import { Suspense } from "react";
import GameplayInformation from "../components/gameplay/GameplayInformation";
import GameplayQuiz from "../components/gameplay/GameplayQuiz";
import BaseLayoutBox from "../components/shared-ui/user/BaseLayoutBox";

export default function Gameplay() {
  return (
    <BaseLayoutBox>
      <GameplayInformation />

      <Suspense fallback={<h1>Loading...</h1>}>
        <GameplayQuiz />
      </Suspense>
    </BaseLayoutBox>
  );
}
