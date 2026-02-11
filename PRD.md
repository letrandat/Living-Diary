
# ARBORIA: THE LIVING DIARY - PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Version:** 1.1 (Mobile Transition Phase)
**Date:** 2024
**Type:** Hybrid Mobile Application (iOS/Android) & PWA

---

## 1. Executive Summary
**Arboria** là một ứng dụng nhật ký kết hợp gamification (trò chơi hóa) và AI, nơi sức khỏe tinh thần của người dùng được phản chiếu qua sự phát triển của một cái cây ảo. Người dùng viết nhật ký ("trồng" suy nghĩ) để nuôi dưỡng cây. Ứng dụng sử dụng **Google Gemini AI** để tạo ra các vật phẩm trang trí độc bản dựa trên cảm xúc của người dùng và cung cấp một người bạn tâm giao (AI Spirit) thấu hiểu nội tâm.

**Mục tiêu cốt lõi:** Biến việc viết nhật ký nhàm chán thành trải nghiệm nuôi dưỡng thú vị, trực quan và có tính chữa lành.

---

## 2. Target Audience (Khách hàng mục tiêu)
*   **Gen Z & Millennials:** Những người quan tâm đến Mindfulness, Self-care và thẩm mỹ.
*   **Gamer "Cozy":** Người thích các game nhẹ nhàng như Animal Crossing, Stardew Valley.
*   **Mobile Users:** Người dùng thích sự tiện lợi, viết nhật ký nhanh ngay trên điện thoại.

---

## 3. Tech Stack (Updated)

### Frontend Core
*   **Framework:** React 19
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (Utility-first), CSS Modules (Animations).
*   **Icons:** Lucide-react.

### Mobile Runtime (New)
*   **Engine:** **Capacitor 6** (Chuyển đổi Web thành Native App).
*   **Platforms:** Android (Play Store), iOS (App Store).
*   **Native Features:** 
    *   Safe Area Management (Xử lý tai thỏ/Dynamic Island).
    *   Status Bar styling.
    *   Disabling Webview behaviors (Zoom, Select Text, Pull-to-refresh).

### AI & Backend Services
*   **AI Engine:** Google Gemini API (`@google/genai`).
    *   *Gemini 3 Pro Preview:* Chatbot RAG (Spirit Guide) & Phân tích cảm xúc.
    *   *Gemini 3 Pro Image Preview:* Spirit Forge (Tạo vật phẩm 3D).
*   **Storage (MVP):** `localStorage` (Client-side).
*   **Deployment:** Vercel (Web version) + App Bundles (.aab/.ipa).

---

## 4. Feature Specifications (Tính năng chi tiết)

### 4.1. The Living Tree (Cây đại diện)
*   **Cơ chế:** Cây được vẽ bằng SVG Procedural. Cấu trúc cành/lá thay đổi theo `Level` (độ cao/độ phức tạp) và `Health` (màu sắc/độ tươi tốt).
*   **Mùa (Seasons):** Tự động thay đổi giao diện (Màu trời, màu lá) theo tháng thực tế.
*   **Mobile Layout:** 
    *   Action Hub (Ví tiền, Nước, Phân bón) được dời xuống để tránh thanh Status Bar.
    *   Cây nằm ở trung tâm, chừa khoảng trống cho Bottom Nav.

### 4.2. Journaling System (Daily Roots)
*   **Viết nhật ký:** Editor tối ưu cho màn hình cảm ứng.
*   **Phần thưởng:** Mỗi bài viết +20 Dewdrops.
*   **Calendar & Memory:** Xem lại lịch sử viết dạng lịch và thẻ bài.

### 4.3. AI Integration (Gemini Powered)
*   **Spirit Forge (Tạo vật phẩm):** Tạo Ornament 3D từ prompt cảm xúc.
*   **Arboria Guide (Chatbot):** AI đọc 3 bài nhật ký gần nhất để tư vấn tâm lý (RAG).

### 4.4. Economy (Kinh tế trong game)
*   **Dewdrops:** Tiền tệ ingame.
*   **Shop:** Mua vật phẩm hỗ trợ và Skin cây (Oak, Willow, Sakura).
*   **Vault:** Bộ sưu tập vật phẩm.

### 4.5. Social (Garden of Souls)
*   **Global Feed:** Đọc suy nghĩ ẩn danh.
*   **Anonymous Letters:** Gửi thư nặc danh (Mockup UI).

---

## 5. UI/UX Guidelines (Mobile First)
*   **Layout:** 
    *   `fixed inset-0`: Cố định khung hình, ngăn scroll cao su (rubber-banding).
    *   `viewport-fit=cover`: Tràn viền toàn bộ màn hình.
*   **Safe Areas:** Sử dụng `env(safe-area-inset-top)` và `env(safe-area-inset-bottom)` để tránh Tai thỏ và thanh Home ảo.
*   **Touch Interactions:**
    *   Vô hiệu hóa chọn văn bản (`user-select: none`) để tạo cảm giác Native App.
    *   Nút bấm có vùng chạm lớn (>44px).
*   **Phong cách:** Glassmorphism, Nature-inspired.

---

## 6. Roadmap (Lộ trình cập nhật)

### Phase 1: MVP & Mobile Foundation (Current Status: In Progress)
- [x] Hệ thống cây & Mùa.
- [x] Viết nhật ký & Local Storage.
- [x] AI Chat & AI Image Gen.
- [x] **Tối ưu UI Mobile (Notch, Safe Area).**
- [x] **Cấu hình Capacitor (Android/iOS).**
- [ ] Build & Publish lên Google Play Store (Internal Testing).

### Phase 2: Cloud & Social (Next Steps)
- [ ] Database Real-time (Supabase/Firebase) để sync dữ liệu khi đổi điện thoại.
- [ ] Đăng nhập Google/Apple.
- [ ] Push Notifications ("Cây của bạn đang khát!").

### Phase 3: Premium & Expansion
- [ ] Widget màn hình chính (Android/iOS Widgets).
- [ ] In-App Purchases (Mua Dewdrops).
- [ ] Chế độ thiền (Meditation Mode).
