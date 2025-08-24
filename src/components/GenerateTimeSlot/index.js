// --- Helpers ---
// "09:30" -> 570
const timeToMinutes = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

// 570 -> "09:30" (24h)
const minutesToHHMM = (mins) => {
  const h = String(Math.floor(mins / 60)).padStart(2, '0');
  const m = String(mins % 60).padStart(2, '0');
  return `${h}:${m}`;
};

// 570 -> "9:30 AM" (12h)
const minutesTo12h = (mins) => {
  let h = Math.floor(mins / 60);
  const m = String(mins % 60).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
};

/**
 * Sinh các slot giờ trong ngày.
 * @param {Object} cfg
 * @param {string} cfg.start - "HH:MM"
 * @param {string} cfg.end   - "HH:MM"
 * @param {number} cfg.step  - bước phút (vd 30)
 * @param {('12'|'24')} cfg.format - nhãn hiển thị
 * @returns {Array<{value:string,label:string}>}
 */
export const generateTimeSlots = ({ start = '09:00', end = '23:00', step = 30, format = '12' } = {}) => {
  const slots = [];
  for (let t = timeToMinutes(start); t <= timeToMinutes(end); t += step) {
    const value = minutesToHHMM(t); // dùng cho value (ổn định)
    const label = format === '12' ? minutesTo12h(t) : value; // hiển thị
    slots.push({ value, label });
  }
  return slots;
};

/**
 * Trả về các giờ HỢP LỆ không conflict theo movie+cinema+room+date.
 * @param {Object} args
 * @param {Object} args.formData - { movie, cinema, room, date }
 * @param {Array} args.baseSlots - generateTimeSlots(...)
 * @param {Array} args.recentFilms - để lấy runtime từ movieID
 * @param {Array} args.showtimesData - showtime đã có trong DB
 *   kỳ vọng mỗi item có: { cinemaID, roomID, date, startTime:'HH:MM', runtime:number, buffer?:number }
 * @param {number} args.defaultBuffer - phút nghỉ nếu DB không có buffer
 */
export const getAvailableTimeOptions = ({ formData, baseSlots, recentFilms, showtimesData, defaultBuffer = 30 }) => {
  const { movie, cinema, room, date } = formData;

  // Thiếu thông tin -> trả về toàn bộ slot
  if (!movie || !cinema || !room || !date) return baseSlots;

  const runtime = recentFilms.find((m) => m.movieID === movie)?.runtime || 0;

  // Showtimes đã tồn tại cùng cinema + room + date
  const existing = showtimesData.filter((s) => s.cinemaID === cinema && s.roomID === room && s.date === date);

  // Hàm check overlap [start, end)
  const overlaps = (aStart, aEnd, bStart, bEnd) => !(aEnd <= bStart || aStart >= bEnd);

  return baseSlots.filter((slot) => {
    const start = timeToMinutes(slot.value);
    const end = start + runtime + defaultBuffer;

    const conflicted = existing.some((s) => {
      const sStart = timeToMinutes(s.startTime);
      const sEnd = sStart + (s.runtime || 0) + (s.buffer ?? defaultBuffer);
      return overlaps(start, end, sStart, sEnd);
    });

    return !conflicted;
  });
};
