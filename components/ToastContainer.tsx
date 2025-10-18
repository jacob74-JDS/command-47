
import React from 'react';
import { useToast, ToastMessage } from '../contexts/ToastContext';

const Toast: React.FC<{ toast: ToastMessage; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const bgColor = toast.type === 'success' ? 'bg-success' : 'bg-error';

  return (
    <div className={`${bgColor} text-white p-4 rounded-lg shadow-lg flex items-center justify-between animate-slide-in-right`}>
      <p>{toast.message}</p>
      <button onClick={() => onRemove(toast.id)} className="ml-4 text-xl font-bold">&times;</button>
    </div>
  );
};


const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed bottom-5 right-5 z-50 space-y-3">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
        </div>
    );
};


export default ToastContainer;
