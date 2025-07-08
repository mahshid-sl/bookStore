import GridContent from "./GridContent";

function GridLayout({ baseUrl }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <GridContent baseUrl={baseUrl} />
    </div>
  );
}

export default GridLayout;
