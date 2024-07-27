"use client"
const UnknownModal = ({ open, onClose, children }) => {
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-primary/50" : "invisible"}`}>
            <div
                className={`bg-white rounded-lg shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default UnknownModal