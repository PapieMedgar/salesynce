
export default function PhotoUpload() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Upload Store Photos</h2>
      <label htmlFor="photo-upload" className="sr-only">Upload Store Photos</label>
      <input id="photo-upload" type="file" multiple className="mb-2" aria-label="Upload Store Photos" />
    </div>
  );
}
