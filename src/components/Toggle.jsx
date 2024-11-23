import "../Toggle.css";

export const Toggle = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle-container">
      <label className="ui-switch">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={isChecked}
        />
        <div className="slider">
          <div className="circle"></div>
        </div>
      </label>
    </div>
  );
};
