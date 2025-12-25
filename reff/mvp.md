# **MVP Web Game Design Document**

## *Perang Kapal Angka – Internal Edukasi SD*

---

## 1. Tujuan Dokumen Ini

* Menjadi **blueprint pembangunan web aplikasi**
* Menyamakan pemahaman:

  * Product owner
  * Developer
  * Designer
* Mencegah scope creep di awal

> Fokus: **MVP playable, stabil, dan edukatif**

---

## 2. Definisi MVP

### MVP berarti:

* Game **sudah bisa dimainkan dari awal sampai menang/kalah**
* Mendukung **Single Player & PvP**
* Bisa dipakai **anak SD tanpa pendamping teknis**

### Yang BUKAN MVP:

* Monetisasi
* Analytics kompleks
* Dashboard guru
* Akun login kompleks

---

## 3. Core Feature MVP (WAJIB ADA)

### 3.1 Gameplay Core

* Soal perkalian dinamis
* Sistem kecepatan & akurasi
* Animasi serangan kapal
* Sistem menang / kalah

### 3.2 Mode Permainan

* ✅ Single Player vs AI
* ✅ PvP (Realtime / turn-based sederhana)

### 3.3 UX Dasar

* UI ramah anak
* Feedback visual instan
* Tidak perlu tutorial panjang

---

## 4. Non-Goal (Disengaja Ditunda)

| Fitur              | Alasan            |
| ------------------ | ----------------- |
| Sistem akun        | Internal edukasi  |
| Leaderboard global | Tidak krusial     |
| Chat PvP           | Risiko & kompleks |
| Pembagian kelas    | Fase berikutnya   |

---

## 5. High-Level Game Flow

```text
Landing Page
   ↓
Pilih Mode
   ↓
Pilih Level (SD)
   ↓
Match Start
   ↓
Loop Soal & Serangan
   ↓
End Match
   ↓
Result & Feedback
```

---

## 6. Detail Game Flow Per Mode

### 6.1 Single Player Flow

1. Pemain pilih level (SD 1–6)
2. Sistem set:

   * Range perkalian
   * Kecepatan AI
3. Match dimulai
4. Soal muncul berulang
5. Salah / lambat → AI menyerang
6. HP salah satu habis → match selesai

---

### 6.2 PvP Flow

**Opsi MVP paling aman:**

* PvP **realtime soal yang sama**
* Tidak perlu kompleks turn system

Flow:

1. Player A & B join room
2. Soal sama muncul
3. Siapa cepat & benar → serang
4. Repeat sampai menang

---

## 7. State Management (Konseptual)

### State Utama Game

| State        | Deskripsi        |
| ------------ | ---------------- |
| INIT         | Persiapan match  |
| QUESTION     | Menampilkan soal |
| ANSWER_CHECK | Validasi         |
| ATTACK       | Animasi serangan |
| RESULT       | Menang / kalah   |

> Developer bisa pakai finite state machine sederhana

---

## 8. Sistem Soal (MVP Rule)

### Input:

* Level SD (1–6)

### Output:

* Soal perkalian acak

### Constraint:

* Tidak boleh muncul soal yang sama berturut-turut
* Range angka:

  * SD 1–2: 1–5
  * SD 3–4: 1–10
  * SD 5–6: 1–12

---

## 9. Battle Logic (MVP)

### Penentuan Serangan

| Kondisi         | Damage          |
| --------------- | --------------- |
| Benar < 3 detik | Damage besar    |
| Benar 3–6 detik | Damage normal   |
| Salah / timeout | Tidak menyerang |

---

## 10. UI Structure (Halaman Web)

### 10.1 Landing Page

* Judul game
* Tombol:

  * Main Sendiri
  * Lawan Teman

---

### 10.2 Mode Select

* Pilih:

  * Single Player
  * PvP
* Pilih level SD

---

### 10.3 Game Screen

**Komponen utama:**

* Area soal (atas)
* Dua kapal (kiri & kanan)
* Input jawaban (besar)
* HP bar

---

### 10.4 Result Screen

* Menang / kalah
* Statistik singkat:

  * Benar
  * Salah
  * Waktu rata-rata
* Tombol main lagi

---

## 11. Visual & Audio Direction (MVP)

### Visual

* Kartunis
* Warna cerah
* Animasi lebay (ledakan lucu)

### Audio

* SFX tembakan
* Suara benar / salah
* Musik loop pendek

---

## 12. Backlog MVP (Prioritas)

### P0 – Harus Jadi

* Engine soal
* Game loop
* Single player
* PvP basic
* UI dasar

### P1 – Nice to Have

* Variasi kapal
* Arena berbeda
* Badge sederhana

### P2 – Future

* Progress save
* Statistik historis
* Mode turnamen

---

## 13. Risiko Utama & Mitigasi

| Risiko             | Solusi        |
| ------------------ | ------------- |
| Anak bingung UI    | Testing cepat |
| PvP lag            | Limit fitur   |
| Soal terlalu sulit | Adaptive rule |

---