import { useEffect, useRef } from "react";

const ConfirmModal = ({ open, title, message, onConfirm, onCancel, loading }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      el.showModal();
    } else {
      el.close();
    }
  }, [open]);

  return (
    <dialog ref={ref} id="confirm_modal" className="modal" onClose={onCancel}>
      <div className="modal-box">
        <div className="text-center">
          <div className="mx-auto size-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-18px text-[#0D1D2C] mb-2">{title || "تأكيد الحذف"}</h3>
          <p className="font-normal text-14px text-[#3E4946] mb-6">{message}</p>
          <div className="flex items-center gap-3">
            <button onClick={onCancel} className="btn btn-ghost grow h-12 font-normal text-14px text-[#3E4946] border border-[#BDC9C5]">
              إلغاء
            </button>
            <button onClick={onConfirm} disabled={loading} className="btn bg-error text-white border-none grow h-12 font-medium text-14px hover:bg-red-600">
              {loading ? <span className="loading loading-spinner"></span> : "حذف"}
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ConfirmModal;