export default function Learning() {
  return (
    <div className="p-8 text-[#efefd1]">
      <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
      <p className="mb-6">
        Explore our curated resources to enhance your understanding of
        defensible space and wildfire preparedness.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <a
            href="https://www.readyforwildfire.org/defensible-space/"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Defensible Space Guidelines - Ready for Wildfire
          </a>
        </li>
        <li>
          <a
            href="https://www.fire.ca.gov/media/11416/fire-safe-regulations.pdf"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            California Fire Safe Regulations (PDF)
          </a>
        </li>
        <li>
          <a
            href="https://www.nfpa.org/Public-Education/By-topic/Wildfire/Creating-defensible-space"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creating Defensible Space - NFPA
          </a>
        </li>
        <li>
          <a
            href="https://www.fs.usda.gov/managing-land/fire"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wildfire Management - U.S. Forest Service
          </a>
        </li>
      </ul>
    </div>
  );
}
