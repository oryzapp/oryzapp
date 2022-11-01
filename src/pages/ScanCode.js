export default function ScanCode() {
  return (
    <>
      {/* Header */}
      <header className=" flex items-center">
        <h1 className="text-3xl font-bold text-sprBlack opacity-80">
          Scan Code
        </h1>
      </header>

      {/* Main */}
      <section className=" w-full flex-auto overflow-auto rounded-sm scrollbar"></section>
    </>
  );
}
