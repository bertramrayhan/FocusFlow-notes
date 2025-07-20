export function getIndonesianDateTime(timestamp) {
    const date = new Date(timestamp);
    const bulanIndo = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const jam = date.getHours().toString().padStart(2, '0');
    const menit = date.getMinutes().toString().padStart(2, '0');
    const tanggal = date.getDate().toString().padStart(2, '0');
    const bulan = bulanIndo[date.getMonth()];
    const tahun = date.getFullYear();
    
    return `${jam}:${menit} ${tanggal} ${bulan} ${tahun}`;
}