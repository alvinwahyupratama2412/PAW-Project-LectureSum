// utils/helpers.js
const formatAiSummary = (text) => {
    if (!text) return '';
    
    let formatted = text
        // Hapus garis tabel markdown jika ada
        .replace(/\|/g, '')
        .replace(/---+/g, '')
        // Ubah format **Teks** menjadi <strong>Teks</strong>
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
        // Ubah format * Point menjadi bullet list HTML yang rapi
        .replace(/^\s*\*\s+(.*)$/gm, '<li class="ml-4 list-disc text-gray-700">$1</li>')
        // Ubah baris baru menjadi <br>
        .replace(/\n/g, '<br>');

    return formatted;
};

module.exports = { formatAiSummary };