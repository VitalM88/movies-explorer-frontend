import './EditProfileSuccesPopup.css';

function EditProfileSuccesPopup({
  isOpen,
  onClose,
}) {

  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup_body">
        <p className="popup__text">Данные изменены</p>
        <button className="popup__button" type="button" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );

}

export default EditProfileSuccesPopup;