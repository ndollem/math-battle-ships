/* ============================================
   FOOD CHAIN QUESTIONS DATA - Perang Kapal Angka
   ============================================ */

   const FOOD_CHAIN_DATA = {
    "metadata": {
        "subject": "IPAS - Rantai Makanan",
        "grade_levels": {
            "1-2": "Pengenalan dasar produsen dan konsumen",
            "3-4": "Rantai makanan sederhana",
            "5-6": "Rantai makanan kompleks dan jaring-jaring makanan"
        },
        "total_questions": 65
    },
    "questions": {
        "level_1_2": [
            {
                "id": 1,
                "question": "Siapa yang membuat makanan sendiri dari sinar matahari?",
                "correct_answer": "Tumbuhan",
                "wrong_answers": ["Sapi", "Ayam", "Ular"],
                "explanation": "Tumbuhan adalah produsen yang membuat makanan sendiri melalui fotosintesis",
                "category": "produsen"
            },
            {
                "id": 2,
                "question": "Hewan yang memakan tumbuhan disebut?",
                "correct_answer": "Herbivora",
                "wrong_answers": ["Karnivora", "Omnivora", "Produsen"],
                "explanation": "Herbivora adalah hewan pemakan tumbuhan",
                "category": "konsumen"
            },
            {
                "id": 3,
                "question": "Kambing memakan apa?",
                "correct_answer": "Rumput",
                "wrong_answers": ["Daging", "Ikan", "Telur"],
                "explanation": "Kambing adalah herbivora yang memakan rumput",
                "category": "herbivora"
            },
            {
                "id": 4,
                "question": "Siapa yang memakan kelinci?",
                "correct_answer": "Elang",
                "wrong_answers": ["Rumput", "Jagung", "Padi"],
                "explanation": "Elang adalah predator yang memakan kelinci",
                "category": "karnivora"
            },
            {
                "id": 5,
                "question": "Apa yang dimakan sapi?",
                "correct_answer": "Rumput",
                "wrong_answers": ["Daging ayam", "Ikan", "Tikus"],
                "explanation": "Sapi adalah herbivora pemakan rumput",
                "category": "herbivora"
            },
            {
                "id": 6,
                "question": "Siapa yang disebut raja hutan?",
                "correct_answer": "Singa",
                "wrong_answers": ["Kambing", "Sapi", "Kelinci"],
                "explanation": "Singa adalah predator puncak di habitatnya",
                "category": "predator"
            },
            {
                "id": 7,
                "question": "Ulat memakan apa?",
                "correct_answer": "Daun",
                "wrong_answers": ["Daging", "Ikan", "Tikus"],
                "explanation": "Ulat adalah herbivora yang memakan daun",
                "category": "herbivora"
            },
            {
                "id": 8,
                "question": "Kucing suka memakan?",
                "correct_answer": "Ikan",
                "wrong_answers": ["Rumput", "Daun", "Bunga"],
                "explanation": "Kucing adalah karnivora yang memakan daging dan ikan",
                "category": "karnivora"
            },
            {
                "id": 9,
                "question": "Lebah mengambil apa dari bunga?",
                "correct_answer": "Madu",
                "wrong_answers": ["Air", "Tanah", "Batu"],
                "explanation": "Lebah mengambil nektar dari bunga untuk membuat madu",
                "category": "produsen"
            },
            {
                "id": 10,
                "question": "Burung pipit memakan?",
                "correct_answer": "Biji-bijian",
                "wrong_answers": ["Daging", "Ular", "Katak"],
                "explanation": "Burung pipit adalah herbivora pemakan biji-bijian",
                "category": "herbivora"
            },
            {
                "id": 11,
                "question": "Hewan pemakan daging disebut?",
                "correct_answer": "Karnivora",
                "wrong_answers": ["Herbivora", "Tumbuhan", "Produsen"],
                "explanation": "Karnivora adalah hewan pemakan daging",
                "category": "karnivora"
            },
            {
                "id": 12,
                "question": "Kelinci suka memakan?",
                "correct_answer": "Wortel",
                "wrong_answers": ["Ayam", "Ikan", "Daging"],
                "explanation": "Kelinci adalah herbivora yang memakan sayuran",
                "category": "herbivora"
            },
            {
                "id": 13,
                "question": "Hiu hidup di mana?",
                "correct_answer": "Laut",
                "wrong_answers": ["Hutan", "Sawah", "Gunung"],
                "explanation": "Hiu adalah predator laut",
                "category": "habitat"
            },
            {
                "id": 14,
                "question": "Apa makanan utama jerapah?",
                "correct_answer": "Daun pohon",
                "wrong_answers": ["Daging", "Ikan", "Serangga"],
                "explanation": "Jerapah memakan daun pohon yang tinggi",
                "category": "herbivora"
            },
            {
                "id": 15,
                "question": "Semut memakan apa?",
                "correct_answer": "Gula dan makanan kecil",
                "wrong_answers": ["Batu", "Kayu", "Tanah"],
                "explanation": "Semut adalah omnivora yang memakan berbagai makanan kecil",
                "category": "omnivora"
            }
        ],
        "level_3_4": [
            {
                "id": 21,
                "question": "Dalam rantai makanan: Padi → Tikus → ?. Siapa yang mengisi tanda tanya?",
                "correct_answer": "Ular",
                "wrong_answers": ["Sapi", "Kambing", "Kelinci"],
                "explanation": "Ular memakan tikus dalam rantai makanan",
                "category": "rantai_makanan"
            },
            {
                "id": 22,
                "question": "Rumput → Belalang → Katak → ?. Hewan apa yang melanjutkan rantai makanan ini?",
                "correct_answer": "Ular",
                "wrong_answers": ["Sapi", "Ayam", "Kambing"],
                "explanation": "Ular memakan katak dan merupakan predator tingkat lebih tinggi",
                "category": "rantai_makanan"
            },
            {
                "id": 23,
                "question": "Organisme yang mengurai sisa makhluk hidup disebut?",
                "correct_answer": "Pengurai",
                "wrong_answers": ["Produsen", "Konsumen", "Herbivora"],
                "explanation": "Pengurai seperti jamur dan bakteri menguraikan bangkai",
                "category": "pengurai"
            },
            {
                "id": 24,
                "question": "Ayam memakan biji-bijian dan serangga. Ayam termasuk?",
                "correct_answer": "Omnivora",
                "wrong_answers": ["Herbivora", "Karnivora", "Pengurai"],
                "explanation": "Omnivora memakan tumbuhan dan hewan",
                "category": "konsumen"
            },
            {
                "id": 25,
                "question": "Dalam rantai makanan, energi berasal dari?",
                "correct_answer": "Matahari",
                "wrong_answers": ["Air", "Tanah", "Angin"],
                "explanation": "Matahari adalah sumber energi utama dalam rantai makanan",
                "category": "energi"
            },
            {
                "id": 26,
                "question": "Hewan pemakan segala disebut?",
                "correct_answer": "Omnivora",
                "wrong_answers": ["Herbivora", "Karnivora", "Produsen"],
                "explanation": "Omnivora memakan tumbuhan dan hewan",
                "category": "konsumen"
            },
            {
                "id": 27,
                "question": "Burung hantu berburu kapan?",
                "correct_answer": "Malam hari",
                "wrong_answers": ["Pagi hari", "Siang hari", "Tidak berburu"],
                "explanation": "Burung hantu adalah predator nokturnal",
                "category": "predator"
            },
            {
                "id": 28,
                "question": "Siapa yang memakan serangga di sawah?",
                "correct_answer": "Katak",
                "wrong_answers": ["Sapi", "Kambing", "Kerbau"],
                "explanation": "Katak memakan serangga sebagai makanan utamanya",
                "category": "karnivora"
            },
            {
                "id": 29,
                "question": "Pohon mangga dalam rantai makanan berperan sebagai?",
                "correct_answer": "Produsen",
                "wrong_answers": ["Konsumen", "Pengurai", "Pemangsa"],
                "explanation": "Tumbuhan adalah produsen yang membuat makanan sendiri",
                "category": "produsen"
            },
            {
                "id": 30,
                "question": "Beruang makan madu dan ikan. Beruang termasuk?",
                "correct_answer": "Omnivora",
                "wrong_answers": ["Herbivora", "Karnivora", "Produsen"],
                "explanation": "Beruang memakan tumbuhan dan hewan",
                "category": "omnivora"
            },
            {
                "id": 31,
                "question": "Jamur berperan sebagai apa dalam ekosistem?",
                "correct_answer": "Pengurai",
                "wrong_answers": ["Produsen", "Herbivora", "Karnivora"],
                "explanation": "Jamur menguraikan sisa makhluk hidup",
                "category": "pengurai"
            },
            {
                "id": 32,
                "question": "Rantai makanan: Rumput → Kelinci → ?",
                "correct_answer": "Rubah",
                "wrong_answers": ["Rumput", "Wortel", "Daun"],
                "explanation": "Rubah memakan kelinci dalam rantai makanan",
                "category": "rantai_makanan"
            },
            {
                "id": 33,
                "question": "Cacing tanah membantu tanah menjadi?",
                "correct_answer": "Subur",
                "wrong_answers": ["Keras", "Kering", "Beracun"],
                "explanation": "Cacing tanah mengurai bahan organik dan menyuburkan tanah",
                "category": "pengurai"
            },
            {
                "id": 34,
                "question": "Konsumen pertama dalam rantai makanan adalah?",
                "correct_answer": "Herbivora",
                "wrong_answers": ["Karnivora", "Pengurai", "Tumbuhan"],
                "explanation": "Herbivora memakan produsen (tumbuhan) langsung",
                "category": "konsumen"
            },
            {
                "id": 35,
                "question": "Burung elang termasuk konsumen tingkat?",
                "correct_answer": "Tinggi",
                "wrong_answers": ["Rendah", "Produsen", "Pengurai"],
                "explanation": "Elang adalah predator puncak di rantai makanan",
                "category": "tingkat_trofik"
            },
            {
                "id": 36,
                "question": "Siapa yang memulai rantai makanan?",
                "correct_answer": "Tumbuhan hijau",
                "wrong_answers": ["Singa", "Ular", "Burung"],
                "explanation": "Tumbuhan hijau adalah produsen yang memulai rantai makanan",
                "category": "produsen"
            },
            {
                "id": 37,
                "question": "Belalang memakan daun padi. Belalang adalah?",
                "correct_answer": "Herbivora",
                "wrong_answers": ["Karnivora", "Omnivora", "Pengurai"],
                "explanation": "Belalang memakan tumbuhan",
                "category": "herbivora"
            },
            {
                "id": 38,
                "question": "Dalam rantai makanan: Plankton → Ikan kecil → ?",
                "correct_answer": "Ikan besar",
                "wrong_answers": ["Plankton", "Rumput", "Daun"],
                "explanation": "Ikan besar memakan ikan kecil di laut",
                "category": "rantai_makanan"
            },
            {
                "id": 39,
                "question": "Kerbau membantu petani dengan?",
                "correct_answer": "Membajak sawah",
                "wrong_answers": ["Berburu", "Memancing", "Terbang"],
                "explanation": "Kerbau adalah herbivora yang membantu petani",
                "category": "herbivora"
            },
            {
                "id": 40,
                "question": "Tikus sawah adalah hama karena memakan?",
                "correct_answer": "Padi",
                "wrong_answers": ["Ular", "Kucing", "Elang"],
                "explanation": "Tikus memakan hasil panen seperti padi",
                "category": "herbivora"
            }
        ],
        "level_5_6": [
            {
                "id": 51,
                "question": "Fitoplankton → Zooplankton → Ikan kecil → ?. Siapa yang melanjutkan?",
                "correct_answer": "Ikan besar",
                "wrong_answers": ["Rumput laut", "Batu karang", "Pasir"],
                "explanation": "Ikan besar memakan ikan kecil dalam ekosistem laut",
                "category": "rantai_makanan"
            },
            {
                "id": 52,
                "question": "Apa yang terjadi jika ular punah dalam rantai makanan?",
                "correct_answer": "Populasi tikus meningkat",
                "wrong_answers": ["Rumput bertambah", "Matahari lebih terang", "Air lebih banyak"],
                "explanation": "Tanpa predator, populasi tikus akan meledak",
                "category": "keseimbangan"
            },
            {
                "id": 53,
                "question": "Konsumen tingkat 3 dalam rantai makanan adalah?",
                "correct_answer": "Pemakan karnivora",
                "wrong_answers": ["Pemakan tumbuhan", "Produsen", "Pengurai"],
                "explanation": "Konsumen tingkat 3 memakan karnivora lain",
                "category": "tingkat_trofik"
            },
            {
                "id": 54,
                "question": "Jaring-jaring makanan lebih kompleks dari rantai makanan karena?",
                "correct_answer": "Satu hewan bisa memakan banyak jenis makanan",
                "wrong_answers": ["Hanya ada satu jenis makanan", "Tidak ada produsen", "Semua hewan sama"],
                "explanation": "Dalam jaring makanan, ada banyak jalur transfer energi",
                "category": "jaring_makanan"
            },
            {
                "id": 55,
                "question": "Piramida makanan menunjukkan?",
                "correct_answer": "Jumlah energi di setiap tingkat",
                "wrong_answers": ["Warna hewan", "Ukuran hewan", "Kecepatan lari"],
                "explanation": "Piramida makanan menggambarkan transfer energi antar tingkat trofik",
                "category": "piramida"
            },
            {
                "id": 56,
                "question": "Apa yang terjadi pada energi saat berpindah tingkat dalam rantai makanan?",
                "correct_answer": "Berkurang 90%",
                "wrong_answers": ["Bertambah 2x", "Tetap sama", "Hilang semua"],
                "explanation": "Hanya 10% energi berpindah ke tingkat berikutnya",
                "category": "energi"
            },
            {
                "id": 57,
                "question": "Predator puncak adalah hewan yang?",
                "correct_answer": "Tidak dimakan hewan lain",
                "wrong_answers": ["Paling kecil", "Paling lambat", "Tidak makan"],
                "explanation": "Predator puncak berada di puncak rantai makanan",
                "category": "predator"
            },
            {
                "id": 58,
                "question": "Apa peran bakteri dalam rantai makanan?",
                "correct_answer": "Mengurai bangkai",
                "wrong_answers": ["Membuat makanan", "Berburu", "Fotosintesis"],
                "explanation": "Bakteri adalah pengurai yang mendekomposisi organisme mati",
                "category": "pengurai"
            },
            {
                "id": 59,
                "question": "Dalam ekosistem hutan, jumlah produsen dibanding karnivora?",
                "correct_answer": "Lebih banyak",
                "wrong_answers": ["Lebih sedikit", "Sama", "Tidak ada"],
                "explanation": "Produsen paling banyak untuk mendukung rantai makanan",
                "category": "piramida"
            },
            {
                "id": 60,
                "question": "Simbiosis mutualisme terjadi saat?",
                "correct_answer": "Kedua pihak saling menguntungkan",
                "wrong_answers": ["Satu pihak dirugikan", "Tidak ada hubungan", "Saling memangsa"],
                "explanation": "Mutualisme adalah hubungan saling menguntungkan",
                "category": "simbiosis"
            },
            {
                "id": 61,
                "question": "Rantai makanan di laut dimulai dari?",
                "correct_answer": "Fitoplankton",
                "wrong_answers": ["Hiu", "Paus", "Lumba-lumba"],
                "explanation": "Fitoplankton adalah produsen utama di laut",
                "category": "produsen"
            },
            {
                "id": 62,
                "question": "Apa yang terjadi jika semua produsen hilang?",
                "correct_answer": "Semua makhluk hidup akan punah",
                "wrong_answers": ["Karnivora bertambah", "Tidak ada perubahan", "Hanya herbivora punah"],
                "explanation": "Produsen adalah dasar dari semua rantai makanan",
                "category": "keseimbangan"
            },
            {
                "id": 63,
                "question": "Burung pemakan bangkai disebut?",
                "correct_answer": "Scavenger",
                "wrong_answers": ["Produsen", "Herbivora", "Fotosintesis"],
                "explanation": "Scavenger membantu membersihkan bangkai",
                "category": "pengurai"
            },
            {
                "id": 64,
                "question": "Rantai makanan terestrial terjadi di?",
                "correct_answer": "Darat",
                "wrong_answers": ["Laut", "Udara saja", "Dalam tanah saja"],
                "explanation": "Terestrial berarti ekosistem darat",
                "category": "habitat"
            },
            {
                "id": 65,
                "question": "Herbivora berperan sebagai konsumen tingkat?",
                "correct_answer": "Pertama",
                "wrong_answers": ["Kedua", "Ketiga", "Puncak"],
                "explanation": "Herbivora langsung memakan produsen",
                "category": "tingkat_trofik"
            }
        ]
    }
};

// Export to global scope
window.FOOD_CHAIN_DATA = FOOD_CHAIN_DATA;

console.log('✅ Food chain data module loaded');