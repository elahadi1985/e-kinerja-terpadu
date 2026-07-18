'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Mail, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/constants/api';
import toast from 'react-hot-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email tidak valid'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const email = watch('email');

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        data
      );

      if (response.success) {
        setIsSubmitted(true);
        toast.success('Email reset password telah dikirim!');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Gagal mengirim email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-emerald-900 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Login
          </Link>
          <h1 className="text-3xl font-poppins font-bold text-white mb-2">
            Lupa Password?
          </h1>
          <p className="text-cyan-100 text-sm">
            Masukkan email Anda untuk menerima link reset password
          </p>
        </div>

        {/* Card */}
        <div className="glass-lg backdrop-blur-xl p-8 space-y-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Terdaftar
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="admin@instansi.gov.id"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  'Kirim Link Reset'
                )}
              </button>
            </form>
          ) : (
            /* Success Message */
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Email Terkirim!</h3>
                <p className="text-cyan-100 text-sm">
                  Kami telah mengirim link reset password ke <br />
                  <span className="font-medium text-white">{email}</span>
                </p>
              </div>
              <p className="text-cyan-100 text-xs pt-4">
                Periksa folder spam jika email tidak muncul dalam beberapa menit.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
