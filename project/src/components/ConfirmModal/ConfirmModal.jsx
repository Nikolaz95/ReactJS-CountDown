import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FiAlertTriangle } from 'react-icons/fi'
import useClickOutside from '../../hooks/useClickOutside'

//import css
import "./ConfirmModal.css"

// "Are you sure?" dialog. Closes on Cancel, click outside or Escape
const ConfirmModal = ({ isOpen, title, text, confirmLabel = 'Delete', onConfirm, onCancel }) => {
    const modalRef = useRef(null);
    const cancelRef = useRef(null);

    useClickOutside(modalRef, onCancel, isOpen);

    // Focus Cancel (the safe choice) and stop the page from scrolling behind the modal
    useEffect(() => {
        if (!isOpen) return;
        cancelRef.current?.focus();
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className='modal-backdrop'>
            <div className='modal' ref={modalRef} role="alertdialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-text">
                <span className='modal-icon'><FiAlertTriangle /></span>
                <h2 id="modal-title">{title}</h2>
                <p id="modal-text">{text}</p>
                <div className='modal-actions'>
                    <button ref={cancelRef} className='btn' onClick={onCancel}>Cancel</button>
                    <button className='btn btn-danger' onClick={onConfirm}>{confirmLabel}</button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default ConfirmModal
