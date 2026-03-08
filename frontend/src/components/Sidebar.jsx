export default function Sidebar() {

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">

      <h1 className="text-xl font-bold mb-10">
        Member Analytics
      </h1>

      <nav className="flex flex-col gap-4">

        <button className="text-left hover:text-blue-400">
          Dashboard
        </button>

        <button className="text-left hover:text-blue-400">
          Students
        </button>

        <button className="text-left hover:text-blue-400">
          Analytics
        </button>

        <button className="text-left hover:text-blue-400">
          Upload Data
        </button>

      </nav>

    </div>
  )

}