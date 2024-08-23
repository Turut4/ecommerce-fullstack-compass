interface ShowProps {
  onSetPageSize: (pageSize: number) => void;
  pageSize: number;
}

export default function Show({ onSetPageSize, pageSize }: ShowProps) {
  return (
    <div className="show">
      <label>Show</label>
      <input
        type="number"
        max={16}
        min={1}
        value={pageSize}
        onChange={(e) => onSetPageSize(parseInt(e.target.value))}
      />
    </div>
  );
}
