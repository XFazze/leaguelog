export default function SuspenseFallback({ text, width }: { text: string; width: string }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${width}`}>
      <p>{text}</p>
    </div>
  );
}
