import './Button.css'

function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`quiz-button ${className || ''}`}
    >
      {children}
    </button>
  )
}

export default Button
