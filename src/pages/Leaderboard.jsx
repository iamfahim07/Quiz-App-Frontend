import { Suspense } from "react";
import LeaderboardInformation from "../components/leaderboard/LeaderboardInformation";
import LeaderboardTopScorer from "../components/leaderboard/LeaderboardTopScorer";
import BaseLayoutBox from "../components/shared-ui/user/BaseLayoutBox";

export default function Leaderboard() {
  return (
    <BaseLayoutBox>
      <LeaderboardInformation />

      <Suspense fallback={<h1>Loading...</h1>}>
        <LeaderboardTopScorer />
      </Suspense>
    </BaseLayoutBox>
  );
}
