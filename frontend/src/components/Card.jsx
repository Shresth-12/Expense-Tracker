import piggy from "../assets/piggy.png";

export function Card({header,budget,svg}) {
  return (
    <div className="card bg-base-100 w-full max-w-sm md:max-w-md lg:max-w-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="card-body">
          <h1 className="text-base sm:text-lg">{header}</h1>
          <p className="text-xl sm:text-3xl font-bold text-blue-600">{budget}</p>
        </div>
        <div className="rounded-2xl h-12 flex items-center">
          <img src={svg} alt="" className="w-12 sm:w-14" />
        </div>
      </div>
    </div>
  );
}
