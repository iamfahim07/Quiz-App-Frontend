export function HomeSkeleton() {
  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center gap-4 animate-pulse my-3 px-10">
      <div className="w-full flex flex-col justify-center items-start gap-4">
        <div className="w-[35%] h-[8vh] bg-slate-200 rounded "></div>
        <div className="w-[80%] h-[10vh] bg-slate-200 rounded "></div>
        <div className="w-[20%] h-[7vh] bg-slate-200 rounded "></div>
      </div>

      <div className="w-full flex flex-col  justify-center items-end gap-4">
        <div className="w-[90%] h-[50vh] bg-slate-200 rounded "></div>
      </div>
    </div>
  );
}

export function CommonSkeletonOne() {
  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center gap-4 animate-pulse my-3 px-10">
      <div className="w-full flex flex-col justify-center items-start gap-4">
        <div className="w-[35%] h-[20px] bg-slate-200 rounded "></div>
        <div className="w-[80%] h-[20px] bg-slate-200 rounded "></div>
        <div className="w-[20%] h-[20px] bg-slate-200 rounded "></div>
        <div className="w-[60%] h-[20px] bg-slate-200 rounded "></div>
        <div className="w-[90%] h-[20px] bg-slate-200 rounded "></div>
        <div className="w-[70%] h-[20px] bg-slate-200 rounded "></div>
        <div className="w-[50%] h-[20px] bg-slate-200 rounded "></div>
      </div>

      <div className="w-full flex flex-col  justify-center items-end gap-4">
        <div className="w-[90%] h-[50vh] bg-slate-200 rounded "></div>
      </div>
    </div>
  );
}

export function CommonSkeletonTwo() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col md:flex-row justify-center items-center animate-pulse my-3 px-10">
      <div className="w-full md:w-1/3 min-h-[80vh] bg-slate-300 flex flex-col gap-6 px-3 py-5">
        <div className="w-full bg-slate-300 flex flex-col gap-3">
          <div className="w-[35%] h-4 bg-slate-200 rounded"></div>
          <div className="w-[80%] h-4 bg-slate-200 rounded"></div>
          <div className="w-[20%] h-4 bg-slate-200 rounded"></div>
          <div className="w-[70%] h-4 bg-slate-200 rounded"></div>
          <div className="w-[65%] h-4 bg-slate-200 rounded"></div>
          <div className="w-[45%] h-4 bg-slate-200 rounded"></div>
          <div className="w-[75%] h-4 bg-slate-200 rounded"></div>
        </div>

        <div className="w-full bg-slate-300 flex flex-col gap-3">
          <div className="w-[80%] h-4 bg-slate-200 rounded"></div>
          <div className="w-[20%] h-4 bg-slate-200 rounded"></div>
          <div className="w-[35%] h-4 bg-slate-200 rounded"></div>
          <div className="w-[70%] h-4 bg-slate-200 rounded"></div>
          <div className="w-[75%] h-4 bg-slate-200 rounded"></div>
          <div className="w-[45%] h-4 bg-slate-200 rounded"></div>
          <div className="w-[65%] h-4 bg-slate-200 rounded"></div>
        </div>
      </div>

      <div className="w-full md:w-2/3 min-h-[80vh] bg-slate-200 flex flex-col gap-3 px-3 py-5"></div>
    </div>
  );
}

export function DummyLineSkeleton() {
  return (
    <div className="w-[80%] min-h-[40vh] flex flex-col md:flex-row justify-center items-center animate-pulse my-3 px-10">
      <div className="flex w-full min-h-[50vh] flex-col gap-6">
        <div className="w-1/2 h-8 rounded bg-slate-300"></div>

        <div className="w-full flex flex-col gap-3">
          <div className="w-full h-4 rounded bg-slate-300"></div>
          <div className="w-full h-4 rounded bg-slate-300"></div>
          <div className="w-full h-4 rounded bg-slate-300"></div>
          <div className="w-full h-4 rounded bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
}
