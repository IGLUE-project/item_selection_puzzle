import { useContext } from "react";
import { GlobalContext } from "./GlobalContext.jsx";

export default function MessageScreen({ sendSolution, resetPuzle, solved }) {
  const { appSettings, I18n } = useContext(GlobalContext);
  const message = solved ? appSettings.successMessage : appSettings.failureMessage;
  const buttonText = solved ? I18n.getTrans("i.continue") : I18n.getTrans("i.return");
  const buttonAction = solved ? sendSolution : resetPuzle;

  return (
    <div className="MessageScreen">
      <p>{message}</p>
      <div>
        <button onClick={() => buttonAction()}>{buttonText}</button>
      </div>
    </div>
  );
}