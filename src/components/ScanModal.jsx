import React, { useEffect, useRef, useState } from 'react';
import { Camera, X, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ScanModal({ open, onClose }) {
  const videoRef = useRef(null);
  const [captured, setCaptured] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;

    let stream;
    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.warn('Camera access denied', err);
      }
    };
    start();

    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [open]);

  const capture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    setCaptured(dataUrl);
    setLoading(true);
    // Simulate OCR
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1600);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative h-full w-full flex flex-col">
        <div className="absolute top-4 left-4 z-10">
          <button onClick={onClose} className="h-10 w-10 grid place-items-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur">
            <X />
          </button>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <button className="h-10 px-3 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur">Switch</button>
        </div>

        <div className="flex-1 relative overflow-hidden">
          {!captured ? (
            <video ref={videoRef} className="object-cover h-full w-full" playsInline muted />
          ) : (
            <img src={captured} alt="Captured" className="object-contain h-full w-full" />
          )}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-72 h-44 md:w-[420px] md:h-[260px]">
              <div className="absolute inset-0 border-2 border-dashed border-white/80 rounded-xl" />
              {/* corner brackets */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-4 border-r-4 border-white rounded-br" />
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-sm opacity-90">Align the medicine label</p>
            </div>
          </div>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-1 bg-white/20 rounded overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-teal-300 to-blue-400 animate-[scan_1.2s_ease-in-out_infinite]" />
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-4">
          {!captured ? (
            <button onClick={capture} className="h-16 w-16 rounded-full bg-white text-slate-900 grid place-items-center shadow-xl active:scale-95 transition" aria-label="Tap to capture">
              <Camera />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              {!success ? (
                <button onClick={() => { setCaptured(null); setSuccess(false); }} className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/20">Retake</button>
              ) : (
                <button onClick={onClose} className="px-4 py-2 rounded-full bg-emerald-500 text-white shadow">Done</button>
              )}
              <button onClick={capture} className="px-4 py-2 rounded-full bg-white text-slate-900 shadow">Scan Again</button>
            </div>
          )}
        </div>
      </div>
      <style>
        {`@keyframes scan { 0%{ transform: translateX(-100%);} 50%{ transform: translateX(50%);} 100%{ transform: translateX(200%);} }`}
      </style>
    </div>
  );
}
