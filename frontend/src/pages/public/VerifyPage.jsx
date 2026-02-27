import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import axios from 'axios';

function VerifyPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying');

    useEffect(() => {
        const verify = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify/${token}`);
                setStatus('success');
                setTimeout(() => navigate('/login'), 4000);
            } catch (error) {
                setStatus('error');
            }
        };
        verify();
    }, [token, navigate]);

    return (
        <div className="flex items-center justify-center px-4 w-full min-h-dvh">
            <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 text-center animate-in fade-in zoom-in duration-300">

                {/* Status Icon */}
                <div className="flex justify-center mb-6">
                    {status === 'verifying' && (
                        <div className="p-4 bg-indigo-50 rounded-full text-indigo-600 animate-spin">
                            <Loader2 size={40} />
                        </div>
                    )}
                    {status === 'success' && (
                        <div className="p-4 bg-emerald-50 rounded-full text-emerald-600">
                            <CheckCircle2 size={40} />
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="p-4 bg-red-50 rounded-full text-red-600">
                            <XCircle size={40} />
                        </div>
                    )}
                </div>

                {/* Status Messaging */}
                <div className="space-y-3">
                    {status === 'verifying' && (
                        <>
                            <h2 className="text-2xl font-extrabold text-slate-900">Verifying Email</h2>
                            <p className="text-slate-500">Please wait a moment.</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <h2 className="text-2xl font-extrabold text-slate-900">Account Verified!</h2>
                            <p className="text-slate-500">Redirecting you to the login page shortly...</p>
                            <div className="flex justify-center mt-6">
                                <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 animate-progress origin-left"></div>
                                </div>
                            </div>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <h2 className="text-2xl font-extrabold text-slate-900">Verification Failed</h2>
                            <p className="text-slate-500">The link is either invalid or has expired.</p>
                            <button
                                onClick={() => navigate('/register')}
                                className="mt-6 inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
                            >
                                Try registering again <ArrowRight size={16} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VerifyPage;