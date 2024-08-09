

const LanguageCheckBox = ({
  selectedLang,
  onCheckboxChange,
}: {
  selectedLang: string;
  onCheckboxChange: (language: "english" | "spanish") => void;
}) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedLang === "spanish" ? "selected" : ""
          }`}
        >
          <span className="label-text text-white">Spanish</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedLang === "spanish"}
            onChange={() => onCheckboxChange("spanish")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedLang === "english" ? "selected" : ""
          }`}
        >
          <span className="label-text text-white">English</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedLang === "english"}
            onChange={() => onCheckboxChange("english")}
          />
        </label>
      </div>
    </div>
  );
};


export default LanguageCheckBox;