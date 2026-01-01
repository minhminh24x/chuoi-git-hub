/**
 * GitHub Contribution Art Generator
 * Tạo pattern "2026" trên contribution graph
 * 
 * Năm 2026 bắt đầu từ Thứ 5 (Thursday) = row 4 (0-indexed)
 * Grid: 7 hàng (Sun=0 đến Sat=6), 52 tuần
 */

// Pixel font 5x7 cho các ký tự (1 = filled, 0 = empty)
const FONT = {
  '2': [
    [1,1,1,1,1],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1]
  ],
  '0': [
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1]
  ],
  '6': [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1]
  ]
};

// Text muốn vẽ
const TEXT = "2026";

// Offset để căn vị trí bắt đầu (số tuần từ đầu năm)
// Năm 2026: Tuần 1 bắt đầu từ Thu(1/1), nhưng để căn giữa năm, offset khoảng 15 tuần
const WEEK_OFFSET = 2; // Bắt đầu từ tuần thứ 3

// Số commits cho mỗi mức
const COMMITS_FILLED = 12;  // Màu đậm nhất
const COMMITS_EMPTY = 1;    // Màu nhạt (vẫn có để giữ streak)

// Tạo grid 7x52 (7 hàng, 52 tuần)
const grid = Array(7).fill(null).map(() => Array(53).fill(COMMITS_EMPTY));

// Vẽ text lên grid
let currentCol = WEEK_OFFSET;
for (const char of TEXT) {
  const charPattern = FONT[char];
  if (charPattern) {
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        if (charPattern[row][col] === 1) {
          grid[row][currentCol + col] = COMMITS_FILLED;
        }
      }
    }
    currentCol += 6; // 5 cột cho ký tự + 1 khoảng cách
  }
}

// Chuyển grid thành danh sách ngày với số commits
function getDateFromDayOfYear(year, dayOfYear) {
  const date = new Date(year, 0, dayOfYear);
  return date.toISOString().split('T')[0];
}

function getDayInfo(year, dayOfYear) {
  const date = new Date(year, 0, dayOfYear);
  const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon,..., 6=Sat
  
  // Tính tuần trong năm
  const firstDay = new Date(year, 0, 1);
  const firstDayOfWeek = firstDay.getDay();
  const weekNumber = Math.floor((dayOfYear - 1 + firstDayOfWeek) / 7);
  
  return { dayOfWeek, weekNumber, dateStr: date.toISOString().split('T')[0] };
}

// Tạo pattern cho cả năm 2026
const pattern = {};
const year = 2026;

for (let day = 1; day <= 365; day++) {
  const { dayOfWeek, weekNumber, dateStr } = getDayInfo(year, day);
  
  // Lấy số commits từ grid
  if (weekNumber < 53 && dayOfWeek < 7) {
    pattern[dateStr] = grid[dayOfWeek][weekNumber];
  } else {
    pattern[dateStr] = COMMITS_EMPTY;
  }
}

// Xuất ra JSON
const fs = require('fs');
const outputPath = './commit-pattern.json';

fs.writeFileSync(outputPath, JSON.stringify(pattern, null, 2));
console.log(`✅ Đã tạo ${outputPath} với ${Object.keys(pattern).length} ngày`);

// Hiển thị preview
console.log('\n📊 Preview grid (X = filled, . = empty):');
for (let row = 0; row < 7; row++) {
  const rowStr = grid[row].slice(0, 30).map(v => v > 1 ? '█' : '·').join('');
  console.log(`Row ${row}: ${rowStr}`);
}
