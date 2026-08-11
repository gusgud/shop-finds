/* ==========================================================
   PRODUCT DATA
   ----------------------------------------------------------
   Ini satu-satunya file yang perlu kamu edit untuk kelola produk.

   CARA MENAMBAH PRODUK:
   1. Copy salah satu object di bawah (dari { sampai },)
   2. Paste di akhir array, sebelum tanda ]
   3. Ganti semua nilainya
   4. Simpan file — selesai, tidak perlu edit HTML/CSS sama sekali

   CARA MENGHAPUS PRODUK:
   - Hapus seluruh object { ... } produk tersebut (dari { sampai },)

   PENJELASAN FIELD:
   - id            : nomor produk, angka biasa (20, bukan "020" atau "#020").
                     Website otomatis menampilkan sebagai #020 dan search
                     otomatis mengenali "20", "020", "#20", "#020".
   - name          : nama produk yang tampil di card & detail
   - category      : HARUS sama persis dengan salah satu nama di CATEGORIES
                     di bawah (case-sensitive)
   - keywords      : array kata kunci tambahan untuk search, isi bebas,
                     boleh bahasa Indonesia & Inggris dicampur
   - image         : URL gambar produk. Boleh dari mana saja asal bisa
                     diakses publik (imgur, ibb.co, cloudinary, dll)
   - price         : string harga, contoh "Rp 149.000". Boleh dikosongkan
                     jadi "" kalau tidak mau tampilkan harga
   - description   : deskripsi singkat 1-2 kalimat, tampil di halaman detail
   - shopee        : LINK AFFILIATE SHOPEE kamu. Jangan diubah formatnya,
                     tinggal paste link affiliate yang kamu dapat dari
                     Shopee Affiliate Program / Shopee Affiliate App
   ========================================================== */

const CATEGORIES = [
  "All",
  "Fashion",
  "Gadget",
  "Beauty",
  "Desk Setup",
  "Accessories",
  "Running",
  "Random Finds"
];

const products = [
  {
    id: 1,
    name: "Foldable Desk Lamp Mini",
    category: "Desk Setup",
    keywords: ["lampu", "meja", "desk", "lamp", "led"],
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=70&auto=format&fit=crop",
    price: "Rp 89.000",
    description: "Lampu meja lipat dengan 3 mode cahaya, ringan dibawa dan hemat tempat di meja kerja kecil.",
    shopee: "https://shopee.co.id/product/PASTE_AFFILIATE_LINK_1"
  },
  {
    id: 2,
    name: "Ceramic Pour-Over Mug",
    category: "Random Finds",
    keywords: ["mug", "keramik", "kopi", "coffee"],
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&q=70&auto=format&fit=crop",
    price: "Rp 65.000",
    description: "Mug keramik dengan pegangan tebal, terasa premium di tangan dan aman microwave.",
    shopee: "https://shopee.co.id/product/PASTE_AFFILIATE_LINK_2"
  },
  {
    id: 3,
    name: "Oversized Cotton Tee",
    category: "Fashion",
    keywords: ["kaos", "oversized", "tshirt", "baju"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=70&auto=format&fit=crop",
    price: "Rp 79.000",
    description: "Katun combed 24s, potongan oversized, adem dipakai harian dan gampang dipadu-padan.",
    shopee: "https://shopee.co.id/product/PASTE_AFFILIATE_LINK_3"
  },
  {
    id: 4,
    name: "Mini Tint Duo",
    category: "Beauty",
    keywords: ["lip", "tint", "makeup", "bibir"],
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=70&auto=format&fit=crop",
    price: "Rp 45.000",
    description: "Dua warna tint dalam satu tube, pigmentasi bagus dan tahan lama tanpa bikin kering.",
    shopee: "https://shopee.co.id/product/PASTE_AFFILIATE_LINK_4"
  },
  {
    id: 10,
    name: "USB-C Fast Charger 30W",
    category: "Gadget",
    keywords: ["charger", "carger", "cas", "fast charging", "usb c"],
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=70&auto=format&fit=crop",
    price: "Rp 119.000",
    description: "Charger 30W kompak, aman untuk HP flagship maupun laptop ringan. Sudah PD & QC.",
    shopee: "https://shopee.co.id/product/PASTE_AFFILIATE_LINK_10"
  },
  {
    id: 20,
    name: "Running Shoes XYZ",
    category: "Running",
    keywords: ["running", "shoes", "lari", "sepatu"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=70&auto=format&fit=crop",
    price: "Rp 349.000",
    description: "Sepatu lari ringan dengan sol responsif, cocok untuk lari harian 5-10K.",
    shopee: "https://shopee.co.id/product/PASTE_AFFILIATE_LINK_20"
  },
  {
    id: 25,
    name: "Braided Phone Strap",
    category: "Accessories",
    keywords: ["strap", "tali hp", "phone strap", "gantungan"],
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=70&auto=format&fit=crop",
    price: "Rp 35.000",
    description: "Tali HP anyaman yang kuat, bikin HP aman dipegang sambil tetap terlihat rapi.",
    shopee: "https://shopee.co.id/product/PASTE_AFFILIATE_LINK_25"
  },
  {
    id: 100,
    name: "Weighted Blanket 2kg",
    category: "Random Finds",
    keywords: ["selimut", "blanket", "tidur", "sleep"],
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=70&auto=format&fit=crop",
    price: "Rp 189.000",
    description: "Selimut weighted ringan yang bikin tidur lebih nyenyak, bahan lembut dan adem.",
    shopee: "https://shopee.co.id/product/PASTE_AFFILIATE_LINK_100"
  }
];
