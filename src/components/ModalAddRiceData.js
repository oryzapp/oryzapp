export default function ModalAddRiceData() {
  const addRiceData = (e) => {
    e.preventDefault();
    console.log("Gekko");
  };
  return (
    <section className=" addRiceModal flex flex-col p-3 bg-white w-3/6 h-4/6 absolute top-0 bottom-16 right-0 left-0 m-auto rounded-md">
      <button className="bg-blue-300 absolute right-3">X</button>
      <div className="flex-auto bg-red-300">
        <form
          className="flex h-full flex-col bg-green-800"
          onSubmit={addRiceData}
        >
          <h1>Add Rice Data</h1>
          <button type="submit">Save</button>
        </form>
      </div>
    </section>
  );
}
