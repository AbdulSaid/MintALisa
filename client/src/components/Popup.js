import PopupContent from "./PopupContent";

export default function Popup(props) {
  
  return (props.trigger) ? (
    <div className="glass-overlay">
      <PopupContent
        trigger={props.trigger}
        setTrigger={props.setTrigger}
        content={props.content}
        msg={props.msg}
      />
    </div>
  ) : "";
}
