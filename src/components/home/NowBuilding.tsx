const FOCUS = [
  { label: "Currently", value: "Rosta Live" },
  { label: "Status", value: "Building" },
  { label: "Focus", value: "Realtime collaboration" },
];

export function NowBuilding() {
  return (
    <div className="now-building" aria-label="Currently building">
      {FOCUS.map((field) => (
        <div key={field.label} className="info-field">
          <p className="info-field-label">{field.label}</p>
          <p className="info-field-value">{field.value}</p>
        </div>
      ))}
    </div>
  );
}
