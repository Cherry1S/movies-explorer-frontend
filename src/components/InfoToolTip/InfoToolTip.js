import tooltip_ok from '../../images/tooltip_ok.svg';
import tooltip_error from '../../images/tooltip_error.svg';

const InfoTooltip = ({ onClose, isOpen, isOk, tooltipTitle }) => {
  return (
    <div className={isOpen ? `popup popup_opened` : `popup`} onClick={onClose}>
      <div className="tooltip">
        <button type="button" className="tooltip__close" onClick={onClose} />
        <img src={isOk ? tooltip_ok : tooltip_error} alt="Успех" className="tooltip__image" />
        <h2 className={isOk ? `tooltip__title tooltip__title_ok` : "tooltip__title tooltip__title_error"}>{tooltipTitle}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
