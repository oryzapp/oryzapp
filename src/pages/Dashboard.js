export default function Dashboard() {
  return (
    <>
      {/* Header */}
      <header className=" flex items-center">
        <h1 className="text-3xl font-bold text-sprBlack opacity-80">Dashboard</h1>
      </header>

      {/* Main */}
      <section className=" flex w-full flex-auto overflow-auto rounded-sm scrollbar flex-col  sm:flex-row">
        <div className="bg-blue-300 flex flex-col h-1/4 sm:h-full sm:w-3/4 ">
          <div className="bg-red-700 h-1/4 flex  p-2 pb-1 gap-2">
            <div className="flex-auto rounded-lg bg-yellow-400">b</div>
            <div className="flex-auto rounded-lg bg-yellow-400">b</div>
            <div className="flex-auto rounded-lg bg-yellow-400">b</div>
          </div>
          <div className="bg-red-700 h-3/4 p-2 pt-1 ">
            <div className="bg-green-400 rounded-lg h-full">b</div>
          </div>
          <div></div>
        </div>
        <div className="bg-blue-300 sm:w-1/4 p-2">
          <div className="bg-yellow-300 h-full rounded-lg">b</div>
        </div>
      </section>
    </>
  );
}
