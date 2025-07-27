"use client"

import { X, LogOut, AlertTriangle } from "lucide-react"

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm, isLoading = false }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-900">Confirm Logout</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-3">Are you sure you want to logout? This will:</p>
          <ul className="text-sm text-gray-500 space-y-1 ml-4">
            <li>• Clear your shopping cart</li>
            <li>• Clear your favorites list</li>
            <li>• End your current session</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>{isLoading ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
