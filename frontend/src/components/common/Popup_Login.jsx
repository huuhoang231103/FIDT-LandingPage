import React, { useState } from "react";

const Popup = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const res = await fetch("http://localhost:8000/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 👈 Thêm dòng này
        body: JSON.stringify({ username, password }),
        });


      const data = await res.json();

    if (data.success) {
    // Lưu trạng thái
    localStorage.setItem("token", "true"); // 👈 dùng đúng key mà App đang đọc
    onClose();
    setTimeout(() => {
        onLoginSuccess?.({ message: data.message || "Đăng nhập thành công" });
    }, 200);
    }
 else {
        setError(data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Lỗi kết nối đến server");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Đăng nhập</h2>

        {error && (
          <div className="bg-red-100 text-red-600 px-3 py-2 rounded mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
