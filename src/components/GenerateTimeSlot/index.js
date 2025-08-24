// ================== time helpers ==================
const parseTimeToMinutes = (t) => {
  // hỗ trợ "18:00" hoặc "6:00 PM"
  if (!t) return 0;
  const s = String(t).trim().toUpperCase();
  if (s.includes('AM') || s.includes('PM')) {
    const [hm, ap] = s.split(' ');
    let [h, m] = hm.split(':').map(Number);
    if (ap === 'PM' && h !== 12) h += 12;
    if (ap === 'AM' && h === 12) h = 0;
    return h * 60 + (m || 0);
  }
  const [h, m] = s.split(':').map(Number);
  return h * 60 + (m || 0);
};

const minutesToHHMM = (mins) =>
  `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

const minutesTo12h = (mins) => {
  let h = Math.floor(mins / 60);
  const m = String(mins % 60).padStart(2, '0');
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ap}`;
};

// Tạo các slot giờ trong ngày
export const generateTimeSlots = ({ start = '09:00', end = '23:00', step = 30, label = '12h' } = {}) => {
  const slots = [];
  for (let t = parseTimeToMinutes(start); t <= parseTimeToMinutes(end); t += step) {
    const value = minutesToHHMM(t); // giá trị ổn định (24h)
    const display = label === '12h' ? minutesTo12h(t) : value;
    slots.push({ value, label: display });
  }
  return slots;
};

/**
 * Lọc ra các slot giờ không conflict theo movie + cinema + room + date
 *
 * @param {Object} args.formData  - { movie, cinema, room, date }  (hoặc cinemaID/layoutID)
 * @param {Array}  args.baseSlots - danh sách slot gốc [{value:'09:00',label:'9:00 AM'}, ...]
 * @param {Array}  args.recentFilms - để lấy runtime từ movieID ({movieID, runtime})
 * @param {Array}  args.showtimesData - showtime đã tồn tại
 *   Mỗi item nên có: { cinemaID|cinema, roomID|room|layoutID, date, startTime, runtime?, buffer? }
 * @param {number} args.defaultBuffer - phút nghỉ giữa 2 suất (mặc định 30)
 */
export const getAvailableTimeOptions = ({ formData, baseSlots, recentFilms, showtimesData, defaultBuffer = 30 }) => {
  const movieID = formData.movie;
  const cinemaSel = formData.cinema ?? formData.cinemaID;
  const roomSel = formData.room ?? formData.layoutID;

  if (!movieID || !cinemaSel || !roomSel) return baseSlots;

  const runtime = recentFilms.find((m) => String(m.movieID) === String(movieID))?.duration || 0;

  const overlaps = (aStart, aEnd, bStart, bEnd) => !(aEnd <= bStart || aStart >= bEnd);

  return baseSlots.filter((slot) => {
    const start = parseTimeToMinutes(slot.value);
    const end = start + runtime + defaultBuffer;

    // 1️⃣ check conflict với showtimes đã tồn tại trong DB
    const conflictDB = (showtimesData || []).some((s) => {
      if (String(s.cinemaID) !== String(cinemaSel)) return false;
      if (String(s.roomID) !== String(roomSel)) return false;

      const es = parseTimeToMinutes(s.startTime);
      const er = s.runtime ?? runtime;
      const eb = s.buffer ?? defaultBuffer;
      const ee = es + er + eb;

      return overlaps(start, end, es, ee);
    });

    if (conflictDB) return false;

    // 2️⃣ check conflict với các slot đã tick trong formData.timeSlots
    const conflictForm = (formData.timeSlots || []).some((t) => {
      if (t === slot.value) return false; // chính nó
      const ts = parseTimeToMinutes(t);
      const te = ts + runtime + defaultBuffer;
      return overlaps(start, end, ts, te);
    });

    if (conflictForm) return false;

    return true;
  });
};
