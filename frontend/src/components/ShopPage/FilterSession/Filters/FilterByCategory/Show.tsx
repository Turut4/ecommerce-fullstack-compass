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
        max={32}
        min={1}
        value={pageSize}
        onChange={(e) =>
          e.target.value != ''
            ? onSetPageSize(parseInt(e.target.value))
            : onSetPageSize(1)
        }
      />
    </div>
  );
}
