# Konsep Game Web

## **Perang Kapal Angka (Math Battle Ships)**

### Ringkasan Singkat

Game edukasi berbasis web untuk anak SD, menggunakan mekanik **adu cepat & tepat menjawab soal matematika (terutama perkalian)**. Setiap jawaban benar memungkinkan pemain **menyerang kapal lawan**. Pemain yang **lebih konsisten menjawab benar dan cepat** akan memenangkan pertempuran laut.

---

## 1. Tujuan Edukasi

### Target Utama

* Melatih **kecepatan berhitung**
* Meningkatkan **akurasi perkalian**
* Membentuk **refleks numerik** (number sense)

### Target Pengguna

* **SD kelas 2–6**
* Bisa disesuaikan per level:

  * Kelas 2–3: perkalian 1–5
  * Kelas 4: perkalian 1–10
  * Kelas 5–6: kombinasi perkalian + pembagian ringan

---

## 2. Konsep Inti Gameplay

### Inti Permainan

* Dua kapal (pemain vs lawan)
* Soal matematika muncul **bersamaan**
* Pemain yang **menjawab benar lebih cepat** mendapat giliran menyerang
* Jawaban salah → kesempatan hilang

### Filosofi Desain

> **Belajar terasa seperti bertarung, bukan mengerjakan soal**

---

## 3. Mode Permainan

### 3.1 Mode Utama (Wajib)

**Player vs Computer (PvE)**

* Lawan adalah AI dengan tingkat kesulitan berbeda
* Cocok untuk belajar mandiri

### 3.2 Mode Tambahan (Opsional di fase berikutnya)

**Player vs Player (PvP)**

* Online realtime atau satu perangkat (hot-seat)
* Fokus kompetisi

---

## 4. Mekanik Game Detail

### 4.1 Alur Satu Ronde

1. Soal muncul di layar
2. Timer mulai berjalan
3. Pemain menjawab
4. Sistem mengecek:

   * Benar / salah
   * Kecepatan
5. Aksi kapal terjadi (menyerang / gagal)

---

### 4.2 Sistem Soal

#### Jenis Soal

* Perkalian tunggal
  Contoh: `7 × 6 = ?`
* (Opsional nanti) perkalian cerita singkat

#### Aturan Soal

* Soal **selalu baru**, tidak diulang dalam satu match
* Tingkat kesulitan mengikuti:

  * Level pemain
  * Progress match (makin lama → makin sulit)

---

### 4.3 Sistem Kecepatan & Akurasi

| Kondisi                   | Efek            |
| ------------------------- | --------------- |
| Jawaban benar + tercepat  | Serangan kuat   |
| Jawaban benar tapi lambat | Serangan lemah  |
| Jawaban salah             | Tidak menyerang |
| Tidak menjawab            | Tidak menyerang |

---

## 5. Sistem Pertempuran Kapal

### 5.1 Atribut Kapal

| Atribut            | Deskripsi                   |
| ------------------ | --------------------------- |
| HP (Health)        | Nyawa kapal                 |
| Attack Power       | Besar damage                |
| Defense (opsional) | Mengurangi damage           |
| Speed (visual)     | Efek animasi, bukan mekanik |

---

### 5.2 Jenis Serangan (Konseptual)

* **Tembakan Meriam** → serangan standar
* **Serangan Kritikal** → jika sangat cepat
* **Serangan Gagal** → animasi tembakan meleset

---

## 6. Sistem Progress & Level

### Level Pemain

* XP didapat dari:

  * Jawaban benar
  * Menang battle
* Level membuka:

  * Kapal baru (visual)
  * Arena baru
  * Variasi soal

---

### Level Kesulitan AI

| Level AI | Karakteristik        |
| -------- | -------------------- |
| Mudah    | Lambat, sering salah |
| Normal   | Kecepatan sedang     |
| Sulit    | Cepat & jarang salah |

---

## 7. Sistem Reward (Non-Kompleks)

### Reward Non-Moneter

* Badge (contoh: *Master Perkalian 7*)
* Skin kapal (warna, bendera)
* Background laut

> Tidak perlu sistem ekonomi berat di tahap awal

---

## 8. UI / UX Konsep

### Tampilan Utama

* Latar: laut biru cerah
* Dua kapal saling berhadapan
* Area soal di tengah atas
* Input jawaban besar & jelas

### Prinsip UI Anak SD

* Kontras tinggi
* Font besar
* Animasi ekspresif (ledakan, ombak)
* Feedback instan (✔️ / ❌)

---

## 9. Feedback Edukatif

Setelah soal:

* Jika salah → tampilkan **jawaban benar**
* Jika benar tapi lambat → beri pesan motivasi
* Setelah match → ringkasan:

  * Akurasi
  * Rata-rata waktu jawab
  * Perkalian yang sering salah

---

## 10. Durasi Ideal Permainan

* 1 match: **2–4 menit**
* Cocok untuk:

  * Sesi belajar singkat
  * Digunakan di sekolah
  * Dimainkan berulang tanpa bosan

---

## 11. Potensi Pengembangan Lanjutan (Belum Dikerjakan)

* Mode turnamen kelas
* Dashboard guru/orang tua
* Adaptive difficulty otomatis
* Soal custom oleh guru

---

## 12. Nilai Unik Game Ini

* Kompetitif tapi edukatif
* Tidak terasa seperti ujian
* Cocok untuk web (ringan, cepat)
* Bisa dikembangkan bertahap