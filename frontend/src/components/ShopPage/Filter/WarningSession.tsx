interface WarningSessionProps {
  message: string;
}
export default function WarningSession({ message }: WarningSessionProps) {
  return <div className="warning-session">{message}</div>;
}
