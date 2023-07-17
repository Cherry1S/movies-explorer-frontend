const ShortsSwitch = ({ checkHandler, isChecked }) => {
  return (
    <div className="shorts-switch">
      <label className="shorts-switch__checkbox">
        <input type="checkbox" className="shorts-switch__input" checked={isChecked} onChange={checkHandler} />
        <span className="shorts-switch__slider" />
      </label>
      <span className="shorts-switch__title">Короткометражки</span>
    </div>
  );
};

export default ShortsSwitch;
