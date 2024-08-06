

const LanguageCheckBox = ({
  selectedLang,
  onCheckboxChange,
}: {
  selectedLang: string;
  onCheckboxChange: (language: "EN" | "SP") => void;
}) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedLang === "SP" ? "selected" : ""
          }`}
        >
          <span className="label-text text-white">Spanish</span>
          <input
            data-test="cypress-userPreferSpan"

            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedLang === "SP"}
            onChange={() => onCheckboxChange("SP")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedLang === "EN" ? "selected" : ""
          }`}
        >
          <span className="label-text text-white">English</span>
          <input
            data-test="cypress-userPreferEng"

            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedLang === "EN"}
            onChange={() => onCheckboxChange("EN")}
          />
        </label>
      </div>
    </div>
  );
};


export default LanguageCheckBox;