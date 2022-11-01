export default function Dashboard() {
  return (
    <>
      {/* Header */}
      <header className=" flex items-center">
        <h1 className="text-3xl font-bold text-sprBlack opacity-80">Dashboard</h1>
      </header>

      {/* Main */}
      <section className=" w-full flex-auto overflow-auto rounded-sm scrollbar">
        <div className="bg-blue">Row 1</div>
      </section>
    </>
  );
}
