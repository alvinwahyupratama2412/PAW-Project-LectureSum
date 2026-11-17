require('dotenv').config();
const OpenAI = require("openai");

const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

async function summarizeDocument(text) {
    try {
        const systemInstruction = `Kamu adalah asisten akademik yang bertugas menyusun modul ringkasan kuliah yang rapi dan terstruktur dalam bahasa Indonesia.

ATURAN FORMAT WAJIB:
- DILARANG keras menggunakan format tabel Markdown (jangan gunakan karakter | atau ---).
- DILARANG menggunakan tag HTML seperti <br>.
- Gunakan heading (###) untuk memisahkan setiap bagian utama.
- Gunakan daftar poin (-) atau penomoran (1., 2.) dengan spasi baris kosong antar-poin agar mudah dibaca.
- Gunakan **teks tebal** untuk istilah atau konsep penting.

Gunakan struktur dokumen berikut:
### 1. Gambaran Umum Materi
(Paragraf singkat pengantar topik)

### 2. Poin-Poin Pembahasan Utama
(Jabarkan setiap konsep penting secara sistematis menggunakan daftar poin dan sub-poin)

### 3. Kesimpulan & Capaian Pembelajaran
(Intisari akhir yang harus dipahami mahasiswa)`;

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content: systemInstruction
                },
                {
                    role: "user",
                    content: `Ringkas materi perkuliahan berikut sesuai format aturan:\n\n${text}`
                }
            ]
        });

        return completion.choices[0].message.content;

    } catch (error) {
        console.error("Groq Summarize Error:", error.message);
        throw error;
    }
}

module.exports = {
    summarizeDocument
};