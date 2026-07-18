'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Loader2, CheckCircle } from 'lucide-react';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/constants/api';
import toast from 'react-hot-toast';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password minimal 8 karakter'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Password tidak cocok',
  path: ['password_confirmation'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token || !email) {
      toast.error('Link reset password tidak valid');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.RESET_PASSWORD,
        {
          email,
          token,
          password: data.password,
          password_confirmation: data.password_confirmation,
        }
      );

      if (response.success) {
        setIsSuccess(true);
        toast.success('Password berhasil direset!');
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Gagal mereset password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-emerald-900 flex items-center justify-center p-4">
        <div className="glass-lg backdrop-blur-xl p-8 rounded-lg text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">Link Tidak Valid</h1>
          <p className="text-cyan-100 mb-6">Link reset password tidak valid atau telah kadaluarsa.</p>
          <a
            href="/auth/login"
            className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg hover:from-cyan-600 hover:to-emerald-600 transition"
          >
            Kembali ke Login
          </a>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-poppins font-bold text-white mb-2">
            Reset Password
          </h1>
          <p className="text-cyan-100 text-sm">
            Buat password baru yang kuat untuk akun Anda
          </p>
        </div>

        {/* Card */}
        <div className="glass-lg backdrop-blur-xl p-8 space-y-6">
          {!isSuccess ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password Baru
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
                  <input
                    {...register('password_confirmation')}
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  />
                </div>
                {errors.password_confirmation && (
                  <p className="text-red-400 text-sm mt-1">{errors.password_confirmation.message}</p>
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
                    Menyimpan...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          ) : (
            /* Success Message */
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Berhasil!</h3>
                <p className="text-cyan-100 text-sm">
                  Password Anda telah direset dengan sukses.<br />
                  Silakan login dengan password baru Anda.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
