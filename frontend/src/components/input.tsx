interface InputBoxProps {
  label?: string;
  placeholder: string;
  reference?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputBox({ label, placeholder, reference, onChange }: InputBoxProps) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        ref={reference}
        placeholder={placeholder}
        onChange={onChange} // ✅ forward the prop here
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
}
