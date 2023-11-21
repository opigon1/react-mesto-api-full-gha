function InfoTooltip({ onClose, message }) {
  return (
    <div
      className={
        `popup popup_type_infoTooltip` + (message ? " popup_opened" : "")
      }
    >
      <div className={`popup__container popup__container_type_infoTooltip`}>
        <p
          className={
            `popup__login-message ` +
            (message &&
              (message.isSuccess
                ? "popup__login-message_type_complete"
                : "popup__login-message_type_error"))
          }
        >
          {message && message.text}
        </p>
        <button
          className="popup__closed"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export { InfoTooltip };
