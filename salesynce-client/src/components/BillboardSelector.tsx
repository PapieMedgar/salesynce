
const companies = ["Pepsi", "Coke", "Redbull", "Play"];

export default function BillboardSelector() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Billboard Selection</h2>
      <label htmlFor="billboard-select" className="sr-only">Select Billboards</label>
      <select id="billboard-select" multiple className="w-full border rounded p-2" aria-label="Select Billboards">
        {companies.map((company) => (
          <option key={company} value={company}>{company}</option>
        ))}
      </select>
    </div>
  );
}
